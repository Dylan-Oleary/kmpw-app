import { createSlice } from "@reduxjs/toolkit";

import { useAppSelector } from "@/hooks";
import { clearUser, initializeUser, setUserTokens, IUserState } from "@/redux";

export const userSlice = createSlice({
    name: "user",
    initialState: {} as IUserState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(initializeUser.fulfilled, (state, action) => {
                const accessToken = action?.payload;

                if (accessToken) state.accessToken = accessToken;
            })
            .addCase(setUserTokens.fulfilled, (state, action) => {
                const accessToken = action?.payload;

                state.accessToken = accessToken;
            })
            .addCase(clearUser.fulfilled, () => ({} as IUserState));
    }
});

export const { reducer: userReducer } = userSlice;

export const useUserSelector = () => useAppSelector(({ user }) => user);
