import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { UNAUTHORIZED_SCREEN_NAMES } from "@/constants";
import { commonScreenOptions, getActiveNavigationHeaderOptions } from "@/navigation";
import { LoginScreen, RegisterScreen } from "@/screens";

import { UnauthorizedStackParams } from "./types";

const Stack = createNativeStackNavigator<UnauthorizedStackParams>();

export const UnauthorizedNavController = () => (
    <Stack.Navigator screenOptions={{ headerShown: false, ...commonScreenOptions }}>
        <Stack.Screen component={LoginScreen} name={UNAUTHORIZED_SCREEN_NAMES.LOGIN} />
        <Stack.Screen
            component={RegisterScreen}
            name={UNAUTHORIZED_SCREEN_NAMES.REGISTER}
            options={getActiveNavigationHeaderOptions()}
        />
    </Stack.Navigator>
);
