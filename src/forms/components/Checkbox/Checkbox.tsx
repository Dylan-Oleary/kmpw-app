import React, { FC, ReactElement } from "react";
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import BouncyCheckbox, { IBouncyCheckboxProps } from "react-native-bouncy-checkbox";
import { isValueOfType } from "@theonlydevsever/utilities";

import { Text } from "@/components";
import { theme } from "@/constants";
import { FontSize } from "@/types";

import { getCheckBoxStyleProps, styles } from "./styles";

export type ExcludedBouncyCheckboxProps =
    | "disableBuiltInState"
    | "disableText"
    | "text"
    | "textComponent";

export interface ICheckboxProps extends Omit<IBouncyCheckboxProps, ExcludedBouncyCheckboxProps> {
    containerStyle?: StyleProp<ViewStyle>;
    label?: string | JSX.Element | ReactElement;
    labelContainerStyle?: StyleProp<ViewStyle>;
    labelTextSize?: FontSize;
    labelTextStyle?: StyleProp<TextStyle>;
}

export const Checkbox: FC<ICheckboxProps> = ({
    containerStyle,
    isChecked = false,
    label,
    labelContainerStyle,
    labelTextSize = "sm",
    labelTextStyle,
    onPress,
    ...props
}) => {
    const handlePress = () => onPress?.(!isChecked);

    return (
        <TouchableOpacity
            activeOpacity={theme.ACTIVE_OPACITY}
            onPress={handlePress}
            style={[styles.container, containerStyle]}
        >
            <BouncyCheckbox
                disableBuiltInState
                disableText
                isChecked={isChecked}
                onPress={handlePress}
                {...getCheckBoxStyleProps(isChecked)}
                {...props}
            />
            {label ? (
                <View style={[styles.labelContainer, labelContainerStyle]}>
                    {isValueOfType(label, "string") ? (
                        <Text size={labelTextSize} style={labelTextStyle}>
                            {label}
                        </Text>
                    ) : (
                        label
                    )}
                </View>
            ) : null}
        </TouchableOpacity>
    );
};
