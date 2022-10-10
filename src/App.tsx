import React, { FC, useEffect } from "react";
import RNBootSplash from "react-native-bootsplash";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { ToastProvider } from "react-native-toast-notifications";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { FullScreenLoader, getToastProviderOptions, OverlayLoader, StatusBar } from "@/components";
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

interface ApplicationStackProps {
    accessToken?: string;
    isLoadingInitialData: boolean;
    isNavigationReady: boolean;
}

const App: FC = () => {
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
                    <ApplicationStack
                        accessToken={accessToken}
                        isLoadingInitialData={isLoadingInitialData}
                        isNavigationReady={isNavigationReady}
                    />
                </SafeAreaProvider>
            </OverlayLoader>
        </NavigationContainer>
    );
};

const ApplicationStack: FC<ApplicationStackProps> = ({
    accessToken,
    isLoadingInitialData,
    isNavigationReady
}) => {
    const insets = useSafeAreaInsets();

    return (
        <ToastProvider {...getToastProviderOptions(insets)}>
            <FullScreenLoader isLoading={isLoadingInitialData || !isNavigationReady}>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                        component={
                            accessToken ? AuthorizedNavController : UnauthorizedNavController
                        }
                        name={accessToken ? "AuthorizedNav" : "UnauthorizedNav"}
                    />
                </Stack.Navigator>
            </FullScreenLoader>
        </ToastProvider>
    );
};

export { App };
export default App;
