import React, { FC } from "react";
import { View, ViewProps } from "react-native";

import { HeaderText } from "..";
import { styles } from "./styles";
import { ISafetyLevel } from "./types";
import { theme } from "../../constants";

import CheckBundleIcon from "../../assets/svg/check-bundle.svg";
import CheckCircleIcon from "../../assets/svg/check-circle.svg";
import CheckShieldIcon from "../../assets/svg/check-shield.svg";
import CloseCircleIcon from "../../assets/svg/close-circle.svg";

export interface ISafetyLevelProps extends ViewProps {
    safetyLevel: ISafetyLevel;
}

export const SafetyLevel: FC<ISafetyLevelProps> = ({ safetyLevel, ...rest }) => {
    const { message, level } = safetyLevel;
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
