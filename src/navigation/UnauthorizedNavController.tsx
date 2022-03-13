import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { UNAUTHORIZED_SCREEN_NAMES } from "../constants";
import { LoginScreen, RegisterScreen } from "../screens";
import { UnauthorizedStackParams } from "./types";

const Stack = createNativeStackNavigator<UnauthorizedStackParams>();

export const UnauthorizedNavController = () => (
    <Stack.Navigator screenOptions={{ animation: "slide_from_right", headerShown: false }}>
        <Stack.Screen component={LoginScreen} name={UNAUTHORIZED_SCREEN_NAMES.LOGIN} />
        <Stack.Screen component={RegisterScreen} name={UNAUTHORIZED_SCREEN_NAMES.REGISTER} />
    </Stack.Navigator>
);
