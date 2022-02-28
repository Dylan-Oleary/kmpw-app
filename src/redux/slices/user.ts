import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getRefreshTokenFromStorage, setRefreshTokenInStorage } from "../../lib/session";

interface IUserState {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    accessToken: string;
    isAuthenticated: boolean;
}

const initialState: IUserState = {} as IUserState;

export const initializeUser = createAsyncThunk("user/initializeUser", async () => {
    const refreshToken = await getRefreshTokenFromStorage();

    if (refreshToken) {
        return null;
    } else {
        return null;
    }
});

export const setUserTokens = createAsyncThunk(
    "user/setTokens",
    async (tokens: { accessToken: string; refreshToken: string }) => {
        const { accessToken, refreshToken } = tokens;

        await setRefreshTokenInStorage(refreshToken);

        return accessToken;
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(initializeUser.fulfilled, () => {
            console.log("User Initialization Complete");
        });
        builder.addCase(setUserTokens.fulfilled, (state, action) => {
            const accessToken = action?.payload;

            state.accessToken = accessToken;
        });
    }
});

export const {} = userSlice.actions;
export const userReducer = userSlice.reducer;
export default userSlice;
