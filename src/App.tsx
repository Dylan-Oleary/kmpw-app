import React, { useEffect } from "react";
import RNBootSplash from "react-native-bootsplash";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StatusBar } from "@/components";
import { useAppDispatch } from "@/hooks";
import { AppStackParams, AuthorizedNavController, UnauthorizedNavController } from "@/navigation";
import {
    finishInitialDataLoad,
    initializeUser,
    setIsNavigationReady,
    useApplicationSelector,
    useUserSelector
} from "@/redux";
import { globalStyles } from "@/styles";

const Stack = createNativeStackNavigator<AppStackParams>();

const App = () => {
    const dispatch = useAppDispatch();
    const { isLoadingInitialData, isNavigationReady } = useApplicationSelector();
    const { accessToken } = useUserSelector();

    useEffect(() => {
        dispatch(initializeUser()).then(() => {
            dispatch(finishInitialDataLoad());
        });
    }, []);

    useEffect(() => {
        if (!isLoadingInitialData && isNavigationReady) {
            RNBootSplash.hide({ fade: true });
        }
    }, [isLoadingInitialData, isNavigationReady]);

    return (
        <NavigationContainer onReady={() => dispatch(setIsNavigationReady(true))}>
            <SafeAreaProvider style={globalStyles.defaultFlex}>
                <StatusBar withBrand={accessToken ? true : false} />
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                        component={
                            accessToken ? AuthorizedNavController : UnauthorizedNavController
                        }
                        name={accessToken ? "AuthorizedNav" : "UnauthorizedNav"}
                    />
                </Stack.Navigator>
            </SafeAreaProvider>
        </NavigationContainer>
    );
};

export { App };
export default App;
