import React, { FC } from "react";
import { View, ViewProps } from "react-native";

import CloudIcon from "../../assets/svg/cloud.svg";
import { HeaderText } from "../HeaderText";
import { Text } from "../Text";
import { styles } from "./styles";

interface IWeatherBannerProps extends ViewProps {}

export const WeatherBanner: FC<IWeatherBannerProps> = ({ ...props }) => {
    return (
        <View style={styles.container} {...props}>
            <View style={styles.infoContainer}>
                <View>
                    <HeaderText size="xl" style={[styles.textColor]}>
                        December 21
                    </HeaderText>
                    <Text size="xs" style={[styles.textColor]}>
                        updated 2 minutes ago
                    </Text>
                </View>
                <View style={styles.temperatureContainer}>
                    <HeaderText size="xl" style={[styles.textColor]}>
                        32&#176;
                    </HeaderText>
                    <Text size="xs" style={[styles.textColor]}>
                        Feels like 27&#176;
                    </Text>
                </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.iconContainer}>
                <CloudIcon color={styles.textColor.color} />
                <Text size="xxs" style={styles.textColor}>
                    Partly Cloudy
                </Text>
            </View>
        </View>
    );
};
