import { AxiosError, AxiosResponse } from "axios";
import { isValueOfType } from "@theonlydevsever/utilities";

import { getFreshTokens, is5xxError } from "@/api";
import { buildAuthenticationHeader, getRefreshTokenFromStorage } from "@/lib";
import { addApplicationError, clearUser, setUserTokens, store } from "@/redux";

export const retryOn5xxError: (error: AxiosError) => boolean = (error) => {
    const response = error?.response;

    // If no error information exists, kill the request
    if (isValueOfType(response, "undefined")) {
        return false;
    }

    const { status = 0 } = response as AxiosResponse;

    return is5xxError(status);
};

export const retryOn401Error: (error: AxiosError) => Promise<boolean> = async (error) => {
    // Always retry on 5xx errors
    if (retryOn5xxError(error)) {
        return true;
    }

    const response = error?.response;
    const { config, status } = response as AxiosResponse;

    if (status === 401) {
        const refreshToken = await getRefreshTokenFromStorage().catch(async () => {
            await store.dispatch(clearUser());

            return null;
        });

        if (!refreshToken) {
            return false;
        }

        const tokens = await getFreshTokens(refreshToken)
            .then(async (tokens) => {
                await store.dispatch(setUserTokens(tokens));

                return tokens;
            })
            .catch(async (error) => {
                const { response } = error;
                const { data, status = 500 } = response;

                if (status === 401) {
                    //TODO: Dispatch message that it's been too long so we logged the user out
                    await store.dispatch(clearUser());
                }

                //TODO: Log any error that is not a 401 here and update UI
                store.dispatch(
                    addApplicationError({
                        details: data?.details || [],
                        message: data?.message,
                        status,
                        theme: "error"
                    })
                );
            });

        // If new tokens were returned, retry the request
        if (tokens) {
            config!.headers!.Authorization = buildAuthenticationHeader(tokens?.accessToken);

            return true;
        }
    }

    return false;
};
