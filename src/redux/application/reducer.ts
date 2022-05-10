import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { useAppSelector } from "@/hooks";
import { IApplicationError, IApplicationState, initializeUser, setUserTokens } from "@/redux";

export const applicationSlice = createSlice({
    name: "application",
    initialState: { errors: [], isLoading: true } as IApplicationState,
    reducers: {
        addApplicationError: (state, action: PayloadAction<IApplicationError>) => {
            state.errors = [...state.errors, action.payload];
        },
        clearApplicationErrors: (state) => {
            state.errors = [];
        },
        initializeApplication: (state) => {
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(setUserTokens.rejected, (state, action) => {
                const error = action.payload;

                //@ts-ignore
                state.errors.push(error);
            })
            .addCase(initializeUser.rejected, (state, action) => {
                const error = action.payload;

                //@ts-ignore
                state.errors.push(error);
            });
    }
});

export const { addApplicationError, clearApplicationErrors, initializeApplication } =
    applicationSlice.actions;
export const { reducer: applicationReducer } = applicationSlice;

export const useApplicationSelector = () => useAppSelector(({ application }) => application);
