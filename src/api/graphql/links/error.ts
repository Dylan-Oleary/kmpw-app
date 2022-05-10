import { Observable } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

import { getFreshTokens } from "@/api";
import { getRefreshTokenFromStorage, withAsyncRetry } from "@/lib";
import { addApplicationError, clearUser, setUserTokens, store } from "@/redux";

export const errorLink = onError(({ forward, graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
        for (const error of graphQLErrors) {
            const { extensions } = error;

            switch (extensions?.code) {
                case "UNAUTHENTICATED":
                    //@ts-ignore
                    return new Observable(async () => {
                        const refreshToken = await getRefreshTokenFromStorage().catch(
                            async (error) => {
                                await store.dispatch(clearUser());
                                store.dispatch(
                                    addApplicationError({
                                        message:
                                            error?.message ||
                                            "Failed to fetch refresh token from storage",
                                        theme: "error"
                                    })
                                );

                                return null;
                            }
                        );

                        if (refreshToken) {
                            return await withAsyncRetry<{
                                accessToken: string;
                                refreshToken: string;
                            }>(() => getFreshTokens(refreshToken), {
                                exitErrorCodes: [401],
                                numberOfRetries: 3
                            })
                                .then(async (tokens) => {
                                    await store.dispatch(setUserTokens(tokens));

                                    return forward(operation);
                                })
                                .catch(async (error) => {
                                    const { response } = error;
                                    const { data, status = 500 } = response;

                                    if (status === 401) {
                                        return await store.dispatch(clearUser());
                                    }

                                    //TODO: Log any error that is not a 401 here
                                    return store.dispatch(
                                        addApplicationError({
                                            details: data?.details || [],
                                            message: data?.message,
                                            status,
                                            theme: "error"
                                        })
                                    );
                                });
                        }
                    });
                default:
                    //TODO: Log Default Error case
                    return;
            }
        }
    }

    if (networkError) console.log(`[Network error]: ${networkError}`);

    return;
});
