import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeScreen } from "../screens";
import { AuthorizedStackParams } from "./types";
import { AUTHORIZED_SCREEN_NAMES } from "../constants";

const Tab = createBottomTabNavigator<AuthorizedStackParams>();

export const AuthorizedNavController = () => (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
            name={AUTHORIZED_SCREEN_NAMES.HOME}
            component={HomeScreen}
            options={{ tabBarStyle: { display: "none" } }}
        />
    </Tab.Navigator>
);
