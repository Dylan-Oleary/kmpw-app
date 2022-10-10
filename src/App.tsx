import React, { useEffect } from "react";
import RNBootSplash from "react-native-bootsplash";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { FullScreenLoader, OverlayLoader, StatusBar } from "@/components";
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
    const { isLoadingInitialData, isNavigationReady, showLoadingOverlay } =
        useApplicationSelector();
    const { accessToken, isInitialized: isUserInitialized } = useUserSelector();

    useEffect(() => {
        dispatch(initializeUser()).then(() => {
            dispatch(finishInitialDataLoad());
        });
    }, []);

    useEffect(() => {
        if (!isLoadingInitialData && isNavigationReady && isUserInitialized) {
            RNBootSplash.hide({ fade: true });
        }
    }, [isLoadingInitialData, isNavigationReady, isUserInitialized]);

    return (
        <NavigationContainer onReady={() => dispatch(setIsNavigationReady(true))}>
            <OverlayLoader isLoading={showLoadingOverlay}>
                <SafeAreaProvider style={globalStyles.defaultFlex}>
                    <StatusBar withBrand={accessToken ? true : false} />
                    <FullScreenLoader isLoading={isLoadingInitialData || !isNavigationReady}>
                        <Stack.Navigator screenOptions={{ headerShown: false }}>
                            <Stack.Screen
                                component={
                                    accessToken
                                        ? AuthorizedNavController
                                        : UnauthorizedNavController
                                }
                                name={accessToken ? "AuthorizedNav" : "UnauthorizedNav"}
                            />
                        </Stack.Navigator>
                    </FullScreenLoader>
                </SafeAreaProvider>
            </OverlayLoader>
        </NavigationContainer>
    );
};

export { App };
export default App;
