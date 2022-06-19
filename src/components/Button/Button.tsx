import React, { FC, ReactNode } from "react";
import {
    GestureResponderEvent,
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
    disabled?: boolean;
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
    disabled = false,
    icon,
    iconLeft = false,
    fullWidth = false,
    onPress,
    secondary = false,
    size = "md",
    style = {},
    text = "",
    textStyle = {},
    ...props
}) => {
    const backgroundColor = secondary ? theme.colors.brand2 : theme.colors.brand5;

    const handlePress: (event: GestureResponderEvent) => void = (event) => {
        if (!disabled) onPress?.(event);
    };

    return (
        <TouchableOpacity
            activeOpacity={disabled ? theme.DISABLED_OPACITY : theme.ACTIVE_OPACITY}
            onPress={handlePress}
            style={[
                styles.button,
                getButtonBoxStyles(size),
                { backgroundColor },
                !fullWidth ? { alignSelf: "flex-start" } : {},
                containerStyle,
                { opacity: disabled ? theme.DISABLED_OPACITY : 1 }
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
