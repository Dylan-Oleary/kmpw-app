import React, { FC } from "react";
import { Text as RNText, TextProps } from "react-native";

import { FontSize } from "@/types";

import { styles } from "./styles";

interface ITextProps extends TextProps {
    size?: FontSize;
}

export const Text: FC<ITextProps> = ({ children, size = "base", style = {}, ...props }) => (
    <RNText {...props} style={[styles.font, styles[size], style]}>
        {children}
    </RNText>
);
