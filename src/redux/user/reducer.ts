import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { useAppSelector } from "@/hooks";
import { clearUser, initializeUser, setUserTokens, IUserState } from "@/redux";

export const userSlice = createSlice({
    name: "user",
    initialState: { isInitialized: false } as IUserState,
    reducers: {
        setUserIdentifier: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(initializeUser.fulfilled, (state, action) => {
                const accessToken = action?.payload;

                if (accessToken) state.accessToken = accessToken;

                state.isInitialized = true;
            })
            .addCase(setUserTokens.fulfilled, (state, action) => {
                const accessToken = action?.payload;

                state.accessToken = accessToken;
            })
            .addCase(clearUser.fulfilled, () => ({} as IUserState));
    }
});

export const { setUserIdentifier } = userSlice.actions;
export const { reducer: userReducer } = userSlice;

export const useUserSelector = () => useAppSelector(({ user }) => user);
