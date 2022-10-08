import React, { FC } from "react";
import { View, ViewProps } from "react-native";
import dayjs from "dayjs";

import { HeaderText, Text, WarmWeatherAlert, WeatherIcon } from "@/components";
import { DATE_FORMATS, WARM_WEATHER_ALERT_TEMP_F } from "@/constants";
import { Weather } from "@/types";

import { styles } from "./styles";

interface IWeatherBannerProps extends ViewProps {
    weather?: Weather;
    loading: boolean;
    lastUpdatedTimestamp: number | null;
}

export const WeatherBanner: FC<IWeatherBannerProps> = ({
    lastUpdatedTimestamp,
    loading = false,
    style,
    weather,
    ...props
}) => (
    <View>
        <View style={[styles.container, style]} {...props}>
            <View style={styles.infoContainer}>
                <View>
                    <HeaderText size="xl" style={styles.textColor}>
                        {dayjs().format(DATE_FORMATS.FULL_MONTH_WITH_DAY)}
                    </HeaderText>
                    <Text size="xs" style={styles.textColor}>
                        {loading
                            ? "updating..."
                            : `updated at ${dayjs(lastUpdatedTimestamp).format(DATE_FORMATS.TIME)}`}
                    </Text>
                </View>
                <View style={styles.temperatureContainer}>
                    {weather?.current?.temp_c && (
                        <HeaderText size="xl" style={styles.textColor}>
                            {Math.round(weather!.current?.temp_c)}&#176;
                        </HeaderText>
                    )}
                    {weather?.current?.feelslike_c && (
                        <Text size="xs" style={styles.textColor}>
                            Feels like {Math.round(weather!.current?.feelslike_c)}&#176;
                        </Text>
                    )}
                </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.iconContainer}>
                {weather?.current && (
                    <WeatherIcon
                        iconCode={weather?.current?.condition?.code}
                        isDay={Boolean(weather?.current?.is_day)}
                    />
                )}
            </View>
        </View>
        {weather?.current && weather.current.feelslike_c >= WARM_WEATHER_ALERT_TEMP_F && (
            <WarmWeatherAlert />
        )}
    </View>
);
