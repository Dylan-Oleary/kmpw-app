import { GeoCoordinates } from "react-native-geolocation-service";

import { IApplicationError } from "@/redux";

export interface ILocationState {
    errors: IApplicationError[];
    location: GeoCoordinates | null;
    permissionGranted: boolean;
    permissionRequested: boolean;
    requestTimestamp: number | null;
}
