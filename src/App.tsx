import React, { useEffect } from "react";
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { screenNames } from "./constants";
import { useAppDispatch, useAppSelector } from "./hooks";
import { AuthorizedNavController } from "./navigation";
import { LoginScreen, RegisterScreen, SplashScreen } from "./screens";
import { initializeUser } from "./redux/slices/user";
import { initializeApplication } from "./redux/slices/application";

const Stack = createNativeStackNavigator();

const App = () => {
    const { application, user } = useAppSelector((state) => state);
    const dispatch = useAppDispatch();
    const isDarkMode = useColorScheme() === "dark";

    useEffect(() => {
        dispatch(initializeUser()).then(() => {
            dispatch(initializeApplication());
        });
    }, []);

    if (application.isLoading) {
        return <SplashScreen />;
    }

    return (
        <SafeAreaView style={styles.appContainer}>
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
            <Stack.Navigator>
                {user?.accessToken ? (
                    <Stack.Screen
                        component={AuthorizedNavController}
                        name="AuthorizedNav"
                        options={{ headerShown: false }}
                    />
                ) : (
                    <>
                        <Stack.Screen
                            component={LoginScreen}
                            name={screenNames.LOGIN}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            component={RegisterScreen}
                            name={screenNames.REGISTER}
                            options={{ headerShown: false }}
                        />
                    </>
                )}
            </Stack.Navigator>
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
