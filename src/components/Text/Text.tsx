import React, { FC } from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";

import { FontSize } from "@/types";

import { styles } from "./styles";

export interface TextProps extends RNTextProps {
    size?: FontSize;
}

export const Text: FC<TextProps> = ({ children, size = "base", style = {}, ...props }) => (
    <RNText {...props} style={[styles.font, styles[size], style]}>
        {children}
    </RNText>
);
