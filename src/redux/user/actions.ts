import { createAsyncThunk } from "@reduxjs/toolkit";

import { getFreshTokens } from "@/api";
import {
    getRefreshTokenFromStorage,
    removeRefreshTokenFromStorage,
    setRefreshTokenInStorage
} from "@/lib";

export const clearUser = createAsyncThunk("user/cleanUser", async (_, { rejectWithValue }) => {
    try {
        await removeRefreshTokenFromStorage();
    } catch (error) {
        throw rejectWithValue({
            status: 500,
            message: "Token Error"
        });
    }
});

export const initializeUser = createAsyncThunk(
    "user/initializeUser",
    async (_, { rejectWithValue }) => {
        try {
            const refreshToken = await getRefreshTokenFromStorage();

            if (refreshToken) {
                const tokens = await getFreshTokens(refreshToken);

                await setRefreshTokenInStorage(tokens.refreshToken);

                return tokens.accessToken;
            } else {
                return null;
            }
        } catch (error) {
            throw rejectWithValue({
                status: 500,
                message: "Token Error"
            });
        }
    }
);

export const setUserTokens = createAsyncThunk(
    "user/setTokens",
    async (tokens: { accessToken: string; refreshToken: string }, { rejectWithValue }) => {
        try {
            const { accessToken, refreshToken } = tokens;

            await setRefreshTokenInStorage(refreshToken);

            return accessToken;
        } catch (error) {
            throw rejectWithValue({
                status: 500,
                message: "Token Error"
            });
        }
    }
);
