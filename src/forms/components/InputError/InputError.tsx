import React, { FC } from "react";
import { StyleProp, TextStyle } from "react-native";

import { Text } from "@/components";

import { styles } from "./styles";

export interface InputErrorProps {
    error?: string;
    show: boolean;
}

export const getInputErrorStyles: (show: boolean) => StyleProp<TextStyle> = (show = false) => [
    styles.error,
    show ? undefined : styles.hidden
];

export const InputError: FC<InputErrorProps> = ({ error = "", show = false }) => (
    <Text style={getInputErrorStyles(show)}>{error}</Text>
);
