import React, { FC } from "react";
import { View, ViewProps } from "react-native";

import ExclamationTriangleIcon from "@/assets/svg/exclamation-triangle.svg";
import { Alert, Text } from "@/components";
import { globalStyles } from "@/styles";

import { styles } from "./styles";

export const WarmWeatherAlert: FC<ViewProps> = ({ style, ...props }) => (
    <Alert
        theme="error"
        body={
            <View style={[globalStyles.flexRow, globalStyles.alignItemsCenter]}>
                <ExclamationTriangleIcon {...styles.icon} />
                <Text size="xs" style={styles.text}>
                    It's hot out there! Please use caution before walking your pups & watch out for
                    signs of dehydration.
                </Text>
            </View>
        }
        style={[styles.container, style]}
        {...props}
    />
);
