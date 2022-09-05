import { Observable } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

import { getFreshTokens } from "@/api";
import { getRefreshTokenFromStorage } from "@/lib";
import { addApplicationError, clearUser, setUserTokens, store } from "@/redux";

export const errorLink = onError(({ forward, graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
        for (const error of graphQLErrors) {
            const { extensions } = error;

            switch (extensions?.code) {
                case "UNAUTHENTICATED":
                    return new Observable((observer) => {
                        getRefreshTokenFromStorage()
                            .then((refreshToken) => {
                                getFreshTokens(refreshToken as string)
                                    .then(async (tokens) => {
                                        await store.dispatch(setUserTokens(tokens));

                                        return forward(operation).subscribe({
                                            next: observer.next.bind(observer),
                                            error: observer.error.bind(observer),
                                            complete: observer.complete.bind(observer)
                                        });
                                    })
                                    .catch(async (error) => {
                                        const { response } = error;
                                        const { data, status = 500 } = response;

                                        observer.error(error);

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
                            })
                            .catch(async (error) => {
                                await store.dispatch(clearUser());

                                store.dispatch(
                                    addApplicationError({
                                        message:
                                            error?.message ||
                                            "Failed to fetch refresh token from storage",
                                        theme: "error"
                                    })
                                );
                                observer.error(error);

                                return null;
                            });
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
