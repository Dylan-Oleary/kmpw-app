import { createSlice } from "@reduxjs/toolkit";

interface IUserState {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    accessToken: string;
}

const initialState = {} as IUserState;

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: () => {
            console.log("WOOSH");
        }
    }
});

export const { login } = userSlice.actions;
export const userReducer = userSlice.reducer;
export default userSlice;
