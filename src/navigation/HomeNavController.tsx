import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { commonScreenOptions, HomeStackParams } from "@/navigation";
import {
    AddOrEditDogScreen,
    ConfirmAddOrEditDogScreen,
    ConfirmRemoveDogScreen,
    HomeScreen
} from "@/screens";

const Stack = createNativeStackNavigator<HomeStackParams>();

export const HomeNavController: FC = () => {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
                name="AddOrEditDog"
                component={AddOrEditDogScreen}
                options={commonScreenOptions}
            />
            <Stack.Screen
                name="ConfirmAddOrEditDog"
                component={ConfirmAddOrEditDogScreen}
                options={commonScreenOptions}
            />
            <Stack.Screen
                name="ConfirmRemoveDog"
                component={ConfirmRemoveDogScreen}
                options={commonScreenOptions}
            />
        </Stack.Navigator>
    );
};
