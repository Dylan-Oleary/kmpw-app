import React, { FC } from "react";
import { StatusBar as RNStatusBar, StatusBarProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Container } from "@/components";
import { theme } from "@/constants";

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
