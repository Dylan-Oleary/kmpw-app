import { kmpwApi } from "..";
import { ILoginUserData, IRegisterUserData } from "../../types";

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
 *
 * /auth/register
 *
 * @param data The user's registratio data
 * @returns An object containing the user's access token and refresh token
 */
export const registerUser = (data: IRegisterUserData) =>
    kmpwApi
        .post<{ accessToken: string }>("/auth/register", { ...data, client: "native" })
        .then(({ data }) => data);
