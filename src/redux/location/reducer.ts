import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeoCoordinates } from "react-native-geolocation-service";

import { useAppSelector } from "@/hooks";
import { clearUser, IApplicationError, ILocationState } from "@/redux";

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

export const { setLocation, setLocationError } = locationSlice.actions;
export const { reducer: locationReducer } = locationSlice;

export const useLocationSelector = () => useAppSelector(({ location }) => location);
