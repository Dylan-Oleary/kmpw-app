import { PermissionsAndroid, Platform } from "react-native";
import Geolocation, { GeoCoordinates } from "react-native-geolocation-service";

export const getUserGeoLocation: () => Promise<{
    permissionGranted: boolean;
    location: GeoCoordinates | null;
    requestTimestamp: number;
}> = async () => {
    try {
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
                    (error) => reject(error),
                    { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
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

export const checkCurrentLocationPermission: () => Promise<boolean> = async () => {
    try {
        if (Platform.OS === "ios") {
            const permissionStatus = await Geolocation.requestAuthorization("whenInUse");

            return permissionStatus?.toLowerCase() === "granted" || false;
        }

        if (Platform.OS === "android") {
            return await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
        }

        throw new Error(`Unsupported OS: ${Platform.OS}`);
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
            const permissionStatus = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );

            return permissionStatus === PermissionsAndroid.RESULTS.GRANTED;
        }

        throw new Error(`Unsupported OS: ${Platform.OS}`);
    } catch (error) {
        throw error;
    }
};
