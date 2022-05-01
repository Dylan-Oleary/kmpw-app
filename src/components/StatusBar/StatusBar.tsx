import React, { FC } from "react";
import { StatusBar as RNStatusBar, StatusBarProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { theme } from "../../constants/theme";
import { Container } from "../Container";

interface IStatusBarProps extends StatusBarProps {
    withBrand?: boolean;
}

export const StatusBar: FC<IStatusBarProps> = ({ withBrand = false, ...props }) => {
    const { top: height } = useSafeAreaInsets();
    const backgroundColor = withBrand ? theme.colors.brand5 : theme.colors.white;

    return (
        <Container style={{ backgroundColor, height }}>
            <RNStatusBar
                animated
                backgroundColor={backgroundColor}
                barStyle={withBrand ? "light-content" : "dark-content"}
                {...props}
            />
        </Container>
    );
};
