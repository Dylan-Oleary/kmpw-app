import { GeoCoordinates } from "react-native-geolocation-service";

export interface IApplicationError {
    status: number;
    message: number;
    details?: { message: string; field?: string }[];
    theme: string;
}

export interface IApplicationState {
    isLoading: boolean;
    errors: IApplicationError[];
}

export interface ILocationState {
    errors: IApplicationError[];
    location: GeoCoordinates | null;
    permissionGranted: boolean;
    permissionRequested: boolean;
    requestTimestamp: number | null;
}

export interface IUserState {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    accessToken: string;
}
