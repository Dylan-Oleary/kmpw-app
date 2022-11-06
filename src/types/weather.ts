import { ImageSourcePropType } from "react-native";

export type Weather = {
    alert: WeatherAlert;
    current: {
        condition: WeatherCondition;
        feelslike_c: number;
        feelslike_f: number;
        is_day: number;
        temp_c: number;
        temp_f: number;
    };
    location: {
        name: string;
        region: string;
    };
};

export type WeatherAlert = {
    condition: WeatherCondition;
    message?: string;
    recommendedSafetyLevel: number;
    type: WeatherAlertType;
};

export enum WeatherAlertType {
    MODERATE = "MODERATE",
    SEVERE = "SEVERE"
}

export type WeatherCondition = {
    code: number;
    text: string;
};

export type WeatherIconMap = {
    [key in WeatherIconTimePeriod]: { [key: string]: ImageSourcePropType };
};

export type WeatherIconTimePeriod = "day" | "night";
