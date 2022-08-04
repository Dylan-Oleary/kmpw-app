import React, { FC } from "react";
import { View, ViewProps } from "react-native";
import dayjs from "dayjs";

import CloudIcon from "@/assets/svg/cloud.svg";
import { HeaderText, Text } from "@/components";
import { DATE_FORMATS } from "@/constants";
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
    <View style={[styles.container, style]} {...props}>
        <View style={styles.infoContainer}>
            <View>
                <HeaderText size="xl" style={styles.textColor}>
                    {dayjs().format(DATE_FORMATS.FULL_MONTH_WITH_DAY)}
                </HeaderText>
                <Text size="xs" style={styles.textColor}>
                    updated at {dayjs(lastUpdatedTimestamp).format(DATE_FORMATS.TIME)}
                </Text>
            </View>
            <View style={styles.temperatureContainer}>
                <HeaderText size="xl" style={styles.textColor}>
                    {Math.round(weather!.current?.temp_c)}&#176;
                </HeaderText>
                <Text size="xs" style={styles.textColor}>
                    Feels like {Math.round(weather!.current?.feelslike_c)}&#176;
                </Text>
            </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.iconContainer}>
            <CloudIcon color={styles.textColor.color} />
            <Text size="xxs" style={styles.textColor}>
                {weather?.current?.condition?.text}
            </Text>
        </View>
    </View>
);
