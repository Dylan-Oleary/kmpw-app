import React from "react";
import { ViewStyle } from "react-native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { HeaderBackButtonProps } from "@react-navigation/native-stack/lib/typescript/src/types";

import { theme } from "@/constants";
import { NavigationBackButton, NavigationBackButtonProps } from "@/navigation";

export type NavigationHeaderOptionsArgs = {
    backButtonOpts?: Partial<NavigationBackButtonProps>;
    headerStyle?: ViewStyle;
};

export const commonScreenOptions: NativeStackNavigationOptions = {
    animation: "slide_from_right"
};

export const brandHeaderOptions: NavigationHeaderOptionsArgs = {
    backButtonOpts: {
        iconStyle: {
            color: theme.colors.white
        },
        textStyle: {
            color: theme.colors.white
        }
    },
    headerStyle: {
        backgroundColor: theme.colors.brand5
    }
};

export const getActiveNavigationHeaderOptions: (
    opts?: NavigationHeaderOptionsArgs
) => NativeStackNavigationOptions = (opts = {}) => {
    const { backButtonOpts = {}, headerStyle } = opts;

    return {
        headerShadowVisible: false,
        headerShown: true,
        headerStyle,
        headerTitle: "",
        headerBackTitleVisible: false,
        headerLeft: (props: HeaderBackButtonProps) => (
            <NavigationBackButton {...props} {...backButtonOpts} />
        )
    } as NativeStackNavigationOptions;
};
