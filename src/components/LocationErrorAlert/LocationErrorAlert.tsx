import React, { FC } from "react";
import { View, ViewProps } from "react-native";

import ExclamationTriangleIcon from "@/assets/svg/exclamation-triangle.svg";
import { Alert, Text } from "@/components";
import { globalStyles } from "@/styles";

import { styles } from "./styles";

export const LocationErrorAlert: FC<ViewProps> = ({ style, ...props }) => (
    <Alert
        theme="warning"
        body={
            <View style={[globalStyles.flexRow, globalStyles.alignItemsCenter]}>
                <ExclamationTriangleIcon {...styles.icon} />
                <Text size="xs" style={styles.text}>
                    We had some trouble fetching the weather in your area. As a result, some
                    information may be missing or unavailable.
                </Text>
            </View>
        }
        style={[styles.container, style]}
        {...props}
    />
);
