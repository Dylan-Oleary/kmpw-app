import { kmpwApi, KMPW_API_NUM_OF_RETRIES, retryOn401Error } from "@/api";
import { ILoginUserData, IRegisterUserData } from "@/types";

/**
 * Fetches a new token set for the user
 *
 * /auth/refresh
 *
 * @param refreshToken A user refresh token
 * @returns An object containing a new access token and refresh token
 */
export const getFreshTokens = (refreshToken: string) =>
    kmpwApi
        .post<{ accessToken: string; refreshToken: string }>("/auth/refresh", {
            client: "native",
            refresh: refreshToken
        })
        .then(({ data }) => data);

/**
 * Logs a user into the system
 *
 * /auth/login
 *
 * @param data The user's email and password
 * @returns An object containing the user's access token and refresh token
 */
export const loginUser = (data: ILoginUserData) =>
    kmpwApi
        .post<{ accessToken: string; refreshToken: string }>("/auth/login", {
            ...data,
            client: "native"
        })
        .then(({ data }) => data);

/**
 * Logs a user out of the system
 *
 * /auth/logout
 *
 * @param accessToken The user's access token
 */
export const logoutUser = (accessToken: string) =>
    kmpwApi.post("/auth/logout", null, {
        headers: { Authorization: `Bearer ${accessToken}` },
        "axios-retry": {
            retries: KMPW_API_NUM_OF_RETRIES,
            retryCondition: retryOn401Error
        }
    });

/**
 * Registers a new user into the system
 *
 * /auth/register
 *
 * @param data The user's registration data
 * @returns An object containing the user's access token and refresh token
 */
export const registerUser = (data: IRegisterUserData) =>
    kmpwApi
        .post<{ accessToken: string; refreshToken: string }>("/auth/register", {
            ...data,
            client: "native"
        })
        .then(({ data }) => data);
