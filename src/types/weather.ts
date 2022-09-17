import { ImageSourcePropType } from "react-native";

export type Weather = {
    current: {
        condition: {
            code: number;
        };
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

export type WeatherIconMap = {
    [key in WeatherIconTimePeriod]: { [key: string]: ImageSourcePropType };
};

export type WeatherIconTimePeriod = "day" | "night";
