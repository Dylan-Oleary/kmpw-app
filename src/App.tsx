import React, { useEffect } from "react";
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useAppDispatch, useAppSelector } from "./hooks";
import { LoginScreen, SplashScreen } from "./screens";
import { initializeApplication } from "./redux/slices/application";

const Stack = createNativeStackNavigator();

const App = () => {
    const { isLoading, user } = useAppSelector(({ application }) => application);
    const dispatch = useAppDispatch();
    const isDarkMode = useColorScheme() === "dark";

    useEffect(() => {
        dispatch(initializeApplication());
    }, []);

    return (
        <SafeAreaView style={styles.appContainer}>
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
            {isLoading ? (
                <SplashScreen />
            ) : (
                <Stack.Navigator>
                    {user ? (
                        <>
                            <Stack.Screen component={LoginScreen} name="Login" />
                        </>
                    ) : (
                        <>
                            <Stack.Screen component={LoginScreen} name="Login" />
                        </>
                    )}
                </Stack.Navigator>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    appContainer: {
        flex: 1
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "600"
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: "400"
    },
    highlight: {
        fontWeight: "700"
    }
});

export { App };
export default App;
