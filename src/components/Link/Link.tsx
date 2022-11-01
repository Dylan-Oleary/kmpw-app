import React, { FC, useCallback } from "react";
import { Linking, StyleProp, TextStyle } from "react-native";

import { Text, TextProps } from "@/components";

import { styles } from "./styles";

export interface ILinkProps extends TextProps {
    link: string;
    label: string;
    labelStyle?: StyleProp<TextStyle>;
}

export const Link: FC<ILinkProps> = ({ label = "", labelStyle, link = "", size = "base" }) => {
    const handlePress = useCallback(async () => {
        const isSupported = await Linking.canOpenURL(link);

        if (isSupported) {
            await Linking.openURL(link);
        }
    }, [link]);

    return (
        <Text
            onPress={handlePress}
            size={size}
            style={[styles.text, labelStyle]}
            suppressHighlighting
        >
            {label}
        </Text>
    );
};
