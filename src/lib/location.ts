import { PermissionsAndroid, PermissionStatus, Platform } from "react-native";
import Geolocation, { GeoCoordinates } from "react-native-geolocation-service";

import { setIsFetchingLocation, setLocationPermissions, store } from "@/redux";
import { Weather } from "@/types";

export const buildGeolocationString = (latitude?: number, longitude?: number) =>
    latitude && longitude ? `${latitude},${longitude}` : "";

export const checkCurrentLocationPermission: () => Promise<boolean> = async () => {
    try {
        if (Platform.OS === "ios") {
            const permissionStatus = await Geolocation.requestAuthorization("whenInUse");

            return permissionStatus?.toLowerCase() === "granted" || false;
        }

        if (Platform.OS === "android") {
            let permissionGranted = false;

            permissionGranted = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );

            if (!permissionGranted) {
                return await PermissionsAndroid.check(
                    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
                );
            }

            return permissionGranted;
        }

        throw new Error(`Unsupported OS: ${Platform.OS}`);
    } catch (error) {
        throw error;
    }
};

export const formatLocationName: (weather: Weather) => string = (weather) => {
    let locationName = "";
    const { location } = weather;

    if (location?.name) {
        locationName = location.name;

        if (location?.region) {
            locationName += `, ${location.region}`;
        }
    }

    return locationName;
};

export const getUserGeoLocation: () => Promise<{
    permissionGranted: boolean;
    location: GeoCoordinates | null;
    requestTimestamp: number;
}> = async () => {
    try {
        store.dispatch(setIsFetchingLocation(true));
        const isLocationPermitted = await requestLocationAccess();

        if (isLocationPermitted) {
            return new Promise((resolve, reject) => {
                Geolocation.getCurrentPosition(
                    (position) => {
                        const { coords, timestamp = Date.now() } = position;

                        resolve({
                            location: coords,
                            permissionGranted: isLocationPermitted,
                            requestTimestamp: timestamp
                        });
                    },
                    (error) => {
                        store.dispatch(
                            setLocationPermissions({
                                permissionGranted: true,
                                permissionRequested: true
                            })
                        );
                        reject(error);
                    },
                    { enableHighAccuracy: false, maximumAge: 0, timeout: 5000 }
                );
            });
        }

        return {
            location: null,
            permissionGranted: isLocationPermitted,
            requestTimestamp: Date.now()
        };
    } catch (error) {
        throw error;
    }
};

export const requestLocationAccess: () => Promise<boolean> = async () => {
    try {
        if (Platform.OS === "ios") {
            const permissionStatus = await Geolocation.requestAuthorization("whenInUse");

            return permissionStatus?.toLowerCase() === "granted" || false;
        }

        if (Platform.OS === "android") {
            let permissionStatus: PermissionStatus = "denied";

            permissionStatus = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );

            if (permissionStatus !== PermissionsAndroid.RESULTS.GRANTED) {
                permissionStatus = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
                );
            }

            return permissionStatus === PermissionsAndroid.RESULTS.GRANTED;
        }

        throw new Error(`Unsupported OS: ${Platform.OS}`);
    } catch (error) {
        throw error;
    }
};
