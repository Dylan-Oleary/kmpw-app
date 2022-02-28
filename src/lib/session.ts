import EncryptedStorage from "react-native-encrypted-storage";

import { REFRESH_TOKEN_KEY } from "../constants";

export const getRefreshTokenFromStorage = async () => {
    try {
        const refreshToken = await EncryptedStorage.getItem(REFRESH_TOKEN_KEY);

        return refreshToken;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
