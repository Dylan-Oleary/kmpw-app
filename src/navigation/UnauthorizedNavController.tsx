import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";

import { UNAUTHORIZED_SCREEN_NAMES } from "@/constants";
import { commonScreenOptions } from "@/navigation";
import { LoginScreen, RegisterScreen } from "@/screens";

import { UnauthorizedStackParams } from "./types";

const Stack = createNativeStackNavigator<UnauthorizedStackParams>();

export const UnauthorizedNavController = () => (
    <Stack.Navigator screenOptions={{ headerShown: false, ...commonScreenOptions }}>
        <Stack.Screen component={LoginScreen} name={UNAUTHORIZED_SCREEN_NAMES.LOGIN} />
        <Stack.Screen
            component={RegisterScreen}
            name={UNAUTHORIZED_SCREEN_NAMES.REGISTER}
            options={{
                ...Platform.select({
                    ios: {
                        headerShadowVisible: false,
                        headerShown: true,
                        headerTitle: ""
                    }
                })
            }}
        />
    </Stack.Navigator>
);
