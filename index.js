import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { App } from "./src/App";
import { name as appName } from "./app.json";
import { store } from "./src/redux/store";

const WrappedApp = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <App />
            </NavigationContainer>
        </Provider>
    );
};

AppRegistry.registerComponent(appName, () => WrappedApp);
