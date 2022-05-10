import React, { FC } from "react";
import { TextProps } from "react-native";

import { Text } from "@/components";
import { FontSize } from "@/types";

import { styles } from "./styles";

interface IHeaderTextProps extends TextProps {
    size?: FontSize;
}

export const HeaderText: FC<IHeaderTextProps> = ({
    children,
    size = "4xl",
    style = {},
    ...props
}) => (
    <Text {...props} size={size} style={[styles.font, style]}>
        {children}
    </Text>
);
