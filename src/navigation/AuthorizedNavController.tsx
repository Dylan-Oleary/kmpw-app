import React, { FC, useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StatusBar } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { checkCurrentLocationPermission, getUserGeoLocation } from "@/lib";
import { HomeNavController } from "@/navigation";
import { setLocation, setLocationError } from "@/redux";
import { LocationDisabledScreen } from "@/screens";

import { AuthorizedStackParams } from "./types";

const Stack = createNativeStackNavigator<AuthorizedStackParams>();
const Tab = createBottomTabNavigator<AuthorizedStackParams>();

export const AuthorizedNavController: FC = () => {
    const appState = useRef<AppStateStatus>(AppState.currentState);
    const dispatch = useAppDispatch();
    const locationState = useAppSelector(({ location }) => location);
    const { permissionGranted, permissionRequested } = locationState;

    const handleAppStateChange: (newAppState: AppStateStatus) => void = async (newAppState) => {
        if (
            AppState.isAvailable &&
            appState.current.match(/inactive|background/) &&
            newAppState === "active"
        ) {
            const isDeviceLocationPermitted = await checkCurrentLocationPermission();

            if (isDeviceLocationPermitted) {
                getUserGeoLocation()
                    .then((response) => dispatch(setLocation(response)))
                    .catch((error) => dispatch(setLocationError(error)));
            }
        }

        appState.current = newAppState;
    };

    useEffect(() => {
        getUserGeoLocation()
            .then((response) => dispatch(setLocation(response)))
            .catch((error) => dispatch(setLocationError(error)));
    }, []);

    useEffect(() => {
        const appStateListener = AppState.addEventListener("change", handleAppStateChange);

        return () => {
            appStateListener.remove();
        };
    }, [locationState]);

    return permissionRequested ? (
        permissionGranted ? (
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen
                    name="HomeStack"
                    component={HomeNavController}
                    options={{ tabBarStyle: { display: "none" } }}
                />
            </Tab.Navigator>
        ) : (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen component={LocationDisabledScreen} name="LocationDisabled" />
            </Stack.Navigator>
        )
    ) : (
        <StatusBar />
    );
};
