import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeoCoordinates } from "react-native-geolocation-service";

import { initializeUser, setUserTokens, clearUser } from "./thunks";
import { IApplicationState, ILocationState, IUserState } from "../types";
import { IApplicationError } from "../types/redux";

export const applicationSlice = createSlice({
    name: "application",
    initialState: { errors: [], isLoading: true } as IApplicationState,
    reducers: {
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

export const locationSlice = createSlice({
    name: "location",
    initialState: {
        errors: [],
        permissionGranted: false,
        permissionRequested: false,
        location: null,
        requestTimestamp: null
    } as ILocationState,
    reducers: {
        setLocation: (
            state,
            action: PayloadAction<{
                permissionGranted: boolean;
                location: GeoCoordinates | null;
                requestTimestamp: number;
            }>
        ) => {
            const {
                location = null,
                permissionGranted = false,
                requestTimestamp = Date.now()
            } = action.payload;

            state.permissionGranted = permissionGranted;
            state.permissionRequested = true;
            state.location = location;
            state.requestTimestamp = requestTimestamp;
        },
        setLocationError: (state, action: PayloadAction<IApplicationError>) => {
            state.errors.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(clearUser.fulfilled, (state) => ({
            errors: [],
            permissionGranted: state.permissionGranted,
            permissionRequested: state.permissionRequested,
            location: null,
            requestTimestamp: null
        }));
    }
});

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

export const { initializeApplication } = applicationSlice.actions;
export const { setLocation, setLocationError } = locationSlice.actions;
export default {
    application: applicationSlice.reducer,
    location: locationSlice.reducer,
    user: userSlice.reducer
};
