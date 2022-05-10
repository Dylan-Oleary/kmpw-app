import React, { FC } from "react";
import { View, ViewProps } from "react-native";

import CheckBundleIcon from "@/assets/svg/check-bundle.svg";
import CheckCircleIcon from "@/assets/svg/check-circle.svg";
import CheckShieldIcon from "@/assets/svg/check-shield.svg";
import CloseCircleIcon from "@/assets/svg/close-circle.svg";
import { HeaderText } from "@/components";
import { theme } from "@/constants";
import type { SafetyLevel as SafetyLevelType } from "@/types";

import { styles } from "./styles";

export type SafetyLevelProps = SafetyLevelType & ViewProps;

export const SafetyLevel: FC<SafetyLevelProps> = ({ level, message, ...rest }) => {
    const iconProps = { color: styles.text.color };

    let icon;
    let backgroundColor = theme.colors.brand5;

    switch (level) {
        case 1:
            backgroundColor = theme.colors.brand5;
            icon = <CheckCircleIcon {...iconProps} />;
            break;
        case 2:
            backgroundColor = theme.colors.brand4;
            icon = <CheckShieldIcon {...iconProps} />;
            break;
        case 3:
            backgroundColor = theme.colors.brand3;
            icon = <CheckBundleIcon {...iconProps} />;
            break;
        case 4:
            backgroundColor = theme.colors.brand2;
            icon = <CloseCircleIcon {...iconProps} />;
            break;
        case 5:
            backgroundColor = theme.colors.brand1;
            icon = <CloseCircleIcon {...iconProps} />;
            break;
        default:
            backgroundColor = theme.colors.brand5;
            icon = <CheckCircleIcon color={styles.text.color} />;
            break;
    }

    return (
        <View style={[styles.container, { backgroundColor }]} {...rest}>
            <HeaderText size="base" style={styles.text}>
                {message}
            </HeaderText>
            {icon}
        </View>
    );
};
