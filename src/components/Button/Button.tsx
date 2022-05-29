import React, { FC, ReactNode } from "react";
import {
    StyleProp,
    TextStyle,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
    ViewStyle
} from "react-native";

import { Text } from "@/components";
import { theme } from "@/constants";
import { ButtonSize } from "@/types";

import { buttonBoxStyles, styles } from "./styles";

interface IButtonProps extends TouchableOpacityProps {
    containerStyle?: StyleProp<ViewStyle>;
    fullWidth?: boolean;
    icon?: ReactNode | JSX.Element;
    iconLeft?: boolean;
    secondary?: boolean;
    size?: ButtonSize;
    text: string;
    textStyle?: StyleProp<TextStyle>;
}

export const getButtonBoxStyles = (size: ButtonSize = "md") => {
    switch (size) {
        case "xs":
            return buttonBoxStyles.boxXs;
        case "sm":
            return buttonBoxStyles.boxSm;
        case "lg":
            return buttonBoxStyles.boxLg;
        case "md":
        default:
            return buttonBoxStyles.boxMd;
    }
};

export const Button: FC<IButtonProps> = ({
    containerStyle = {},
    icon,
    iconLeft = false,
    fullWidth = false,
    secondary = false,
    size = "md",
    style = {},
    text = "",
    textStyle = {},
    ...props
}) => {
    const backgroundColor = secondary ? theme.colors.brand2 : theme.colors.brand5;

    return (
        <TouchableOpacity
            activeOpacity={theme.ACTIVE_OPACITY}
            style={[
                styles.button,
                getButtonBoxStyles(size),
                { backgroundColor },
                !fullWidth ? { alignSelf: "flex-start" } : {},
                containerStyle
            ]}
            {...props}
        >
            <View style={styles.content}>
                {iconLeft && icon ? <View style={styles.iconLeft}>{icon}</View> : null}
                <Text size="xs" style={[styles.text, textStyle]}>
                    {text}
                </Text>
                {!iconLeft && icon ? <View style={styles.iconRight}>{icon}</View> : null}
            </View>
        </TouchableOpacity>
    );
};
