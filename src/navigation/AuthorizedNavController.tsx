import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";

const Tab = createBottomTabNavigator();

const AuthorizedNavController = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
};

export { AuthorizedNavController };
export default AuthorizedNavController;
