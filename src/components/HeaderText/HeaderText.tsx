import React, { FC } from "react";

import { Text, TextProps } from "@/components";

import { styles } from "./styles";

export const HeaderText: FC<TextProps> = ({ children, size = "4xl", style = {}, ...props }) => (
    <Text {...props} size={size} style={[styles.font, style]}>
        {children}
    </Text>
);
