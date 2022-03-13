import React, { FC } from "react";
import { StatusBar as RNStatusBar, StatusBarProps } from "react-native";

import { theme } from "../../constants/theme";

interface IStatusBarProps extends StatusBarProps {
    withBrand?: boolean;
}

export const StatusBar: FC<IStatusBarProps> = ({ withBrand = false, ...props }) => (
    <RNStatusBar
        backgroundColor={withBrand ? theme.colors.brand5 : theme.colors.white}
        barStyle={withBrand ? "light-content" : "dark-content"}
        {...props}
    />
);
