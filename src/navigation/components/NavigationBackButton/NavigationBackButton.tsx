import React, { FC } from "react";
import { Pressable, TextStyle, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButtonProps } from "@react-navigation/native-stack/lib/typescript/src/types";

import ArrowLeftIcon from "@/assets/svg/arrow-left.svg";
import { Container, Text } from "@/components";

import { styles } from "./styles";

export interface NavigationBackButtonProps extends HeaderBackButtonProps {
    backButtonText?: string;
    containerStyle?: ViewStyle;
    iconStyle?: SvgProps;
    textStyle?: TextStyle;
}

export const NavigationBackButton: FC<NavigationBackButtonProps> = ({
    backButtonText = "Back",
    containerStyle,
    iconStyle = {},
    textStyle
}) => {
    const { goBack } = useNavigation();

    return (
        <Container style={[styles.container, containerStyle]}>
            <Pressable onPress={() => goBack()} style={styles.pressable}>
                <ArrowLeftIcon {...styles.icon} {...iconStyle} />
                <Text style={[styles.text, textStyle]}>{backButtonText}</Text>
            </Pressable>
        </Container>
    );
};
