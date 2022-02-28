import { createSlice } from "@reduxjs/toolkit";

interface IApplicationState {
    isLoading: boolean;
}

const initialState: IApplicationState = { isLoading: true };

export const applicationSlice = createSlice({
    name: "application",
    initialState,
    reducers: {
        initializeApplication: (state) => {
            state.isLoading = false;
        }
    }
});

export const { initializeApplication } = applicationSlice.actions;
export const appReducer = applicationSlice.reducer;
export default applicationSlice;
