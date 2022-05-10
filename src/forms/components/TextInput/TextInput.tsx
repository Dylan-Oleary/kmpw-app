import React, { FC } from "react";
import {
    StyleProp,
    TextInput as RNTextInput,
    TextInputProps,
    TextStyle,
    View,
    ViewStyle
} from "react-native";

import { theme } from "@/constants";

import { styles } from "./styles";

interface ITextInputProps extends TextInputProps {
    containerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
}

export const TextInput: FC<ITextInputProps> = ({
    containerStyle = {},
    inputStyle = {},
    placeholderTextColor = theme.colors.gray1,
    ...props
}) => {
    return (
        <View style={[containerStyle]}>
            <RNTextInput
                placeholderTextColor={placeholderTextColor}
                style={[styles.input, inputStyle]}
                {...props}
            />
        </View>
    );
};
