import React, { FC, memo } from "react";
import { View, ViewProps } from "react-native";
import dayjs from "dayjs";
import { isValueOfType } from "@theonlydevsever/utilities";

import NoSignalIcon from "@/assets/svg/no-signal.svg";
import { HeaderText, Text, WarmWeatherAlert, WeatherIcon } from "@/components";
import { DATE_FORMATS, WARM_WEATHER_ALERT_TEMP_F } from "@/constants";
import { Weather } from "@/types";

import { styles } from "./styles";

interface IWeatherBannerProps extends ViewProps {
    weather?: Weather;
    loading: boolean;
    lastUpdatedTimestamp: number | null;
}

export const WeatherBanner: FC<IWeatherBannerProps> = memo(
    ({ lastUpdatedTimestamp, loading = false, style, weather, ...props }) => (
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
                                : `updated at ${dayjs(lastUpdatedTimestamp || dayjs()).format(
                                      DATE_FORMATS.TIME
                                  )}`}
                        </Text>
                    </View>
                    <View style={styles.temperatureContainer}>
                        <HeaderText size="xl" style={styles.textColor}>
                            {isValueOfType(weather?.current?.temp_c, "number")
                                ? `${Math.round(weather!.current?.temp_c)}°`
                                : ""}
                        </HeaderText>
                        <Text size="xs" style={styles.textColor}>
                            {isValueOfType(weather?.current?.feelslike_c, "number")
                                ? `Feels like ${Math.round(weather!.current?.feelslike_c)}°`
                                : ""}
                        </Text>
                    </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.iconContainer}>
                    {Boolean(weather?.current) ? (
                        <WeatherIcon
                            iconCode={weather?.current?.condition?.code}
                            isDay={Boolean(weather?.current?.is_day)}
                        />
                    ) : (
                        <View style={styles.weatherIconPlaceholderContainer}>
                            <NoSignalIcon {...styles.weatherIconPlaceholder} />
                        </View>
                    )}
                </View>
            </View>
            {weather?.current && weather.current.feelslike_c >= WARM_WEATHER_ALERT_TEMP_F && (
                <WarmWeatherAlert />
            )}
        </View>
    )
);
