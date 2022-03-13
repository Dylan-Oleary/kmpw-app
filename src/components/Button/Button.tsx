import React, { FC, ReactNode } from "react";
import {
    StyleProp,
    TextStyle,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
    ViewStyle
} from "react-native";

import { Text } from "../../components";
import { theme } from "../../constants";
import { styles } from "./styles";

interface IButtonProps extends TouchableOpacityProps {
    containerStyle?: StyleProp<ViewStyle>;
    fullWidth?: boolean;
    icon?: ReactNode | JSX.Element;
    iconLeft?: boolean;
    secondary?: boolean;
    text: string;
    textStyle?: StyleProp<TextStyle>;
}

export const Button: FC<IButtonProps> = ({
    containerStyle = {},
    icon,
    iconLeft = false,
    fullWidth = false,
    secondary = false,
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
