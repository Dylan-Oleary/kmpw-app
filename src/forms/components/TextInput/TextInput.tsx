import React, { FC } from "react";
import {
    StyleProp,
    TextInput as RNTextInput,
    TextInputProps,
    TextStyle,
    View,
    ViewStyle
} from "react-native";

import { theme } from "../../../constants";
import { styles } from "./styles";

interface ITextInputProps extends TextInputProps {
    containerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    label?: string;
}

export const TextInput: FC<ITextInputProps> = ({
    containerStyle = {},
    inputStyle = {},
    label,
    onChangeText,
    placeholderTextColor = theme.colors.gray1,
    value = "",
    ...props
}) => {
    return (
        <View style={[containerStyle]}>
            <RNTextInput
                onChangeText={onChangeText}
                placeholderTextColor={placeholderTextColor}
                style={[styles.input, inputStyle]}
                {...props}
            />
        </View>
    );
};
