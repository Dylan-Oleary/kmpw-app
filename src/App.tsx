import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StatusBar } from "./components";
import { useAppDispatch, useAppSelector } from "./hooks";
import { AppStackParams, AuthorizedNavController, UnauthorizedNavController } from "./navigation";
import { SplashScreen } from "./screens";
import { initializeApplication } from "./redux/slices";
import { initializeUser } from "./redux/thunks";

const Stack = createNativeStackNavigator<AppStackParams>();

const App = () => {
    const { application, user } = useAppSelector((state) => state);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeUser()).then(() => {
            dispatch(initializeApplication());
        });
    }, []);

    if (application.isLoading) {
        return <SplashScreen />;
    }

    return (
        <SafeAreaProvider style={styles.appContainer}>
            <StatusBar withBrand={user?.accessToken ? true : false} />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    component={
                        user?.accessToken ? AuthorizedNavController : UnauthorizedNavController
                    }
                    name={user?.accessToken ? "AuthorizedNav" : "UnauthorizedNav"}
                />
            </Stack.Navigator>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    appContainer: {
        flex: 1
    }
});

export { App };
export default App;
