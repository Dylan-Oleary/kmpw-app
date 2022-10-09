import React, { FC } from "react";

import { IImageProps, Image } from "@/components";
import { weatherIconMap } from "@/constants";

interface WeatherIconProps extends Omit<IImageProps, "height" | "source" | "width"> {
    iconCode?: number | string;
    isDay?: boolean;
    size?: number;
}

export const WEATHER_ICON_DEFAULT_SIZE = 44;

export const WeatherIcon: FC<WeatherIconProps> = ({
    iconCode = "1000",
    isDay = true,
    size = WEATHER_ICON_DEFAULT_SIZE,
    ...rest
}) => (
    <Image
        aspectRatio={[1, 1]}
        height={size}
        width={size}
        source={weatherIconMap[isDay ? "day" : "night"][iconCode]}
        {...rest}
    />
);
