import React, { FC } from "react";
import { View, ViewProps } from "react-native";
import { isValueOfType } from "@theonlydevsever/utilities";

import ExclamationTriangleIcon from "@/assets/svg/exclamation-triangle.svg";
import { Alert, Text } from "@/components";
import { globalStyles } from "@/styles";
import { WeatherAlert as WeatherAlertType } from "@/types";

import { styles } from "./styles";

export type WeatherAlertProps = ViewProps & WeatherAlertType;

export const WeatherAlert: FC<WeatherAlertProps> = ({ condition, message, style, ...props }) => (
    <Alert
        theme="warning"
        body={
            <View style={[globalStyles.flexRow, globalStyles.alignItemsCenter]}>
                <ExclamationTriangleIcon {...styles.icon} />
                {isValueOfType(message, "string") && (
                    <Text size="xs" style={styles.text}>
                        {message}
                    </Text>
                )}
                {!isValueOfType(message, "string") && (
                    <Text size="xs" style={styles.text}>
                        The following weather conditions may be present in your area:{" "}
                        <Text size="xs" style={[styles.bold, styles.text]}>
                            {condition?.text}
                        </Text>
                        . Please exercise caution and use your best judgment when deciding if it is
                        safe for a walk.
                    </Text>
                )}
            </View>
        }
        style={[styles.container, style]}
        {...props}
    />
);
