import EncryptedStorage from "react-native-encrypted-storage";

import { REFRESH_TOKEN_KEY } from "@/constants";

export const buildAuthenticationHeader = (accessToken: string) => `Bearer ${accessToken}`;

export const getRefreshTokenFromStorage = async () => {
    try {
        const refreshToken = await EncryptedStorage.getItem(REFRESH_TOKEN_KEY);

        return refreshToken;
    } catch (error) {
        throw error;
    }
};

export const removeRefreshTokenFromStorage = async () => {
    try {
        await EncryptedStorage.removeItem(REFRESH_TOKEN_KEY);
    } catch (error) {
        throw error;
    }
};

export const setRefreshTokenInStorage = async (refreshToken: string) => {
    try {
        await EncryptedStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    } catch (error) {
        throw error;
    }
};
