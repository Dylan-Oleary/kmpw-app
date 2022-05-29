import React from "react";
import { AppRegistry, LogBox } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/client";

import { App } from "./src/App";
import { name as appName } from "./app.json";
import { store } from "./src/redux/store";
import { apolloClient } from "./src/api/graphql";

/**
 * This fixes a React-Native-Debugger issue where GraphQL requests are not showing up in the network tab
 *
 * https://github.com/jhen0409/react-native-debugger/issues/382#issuecomment-646874107
 */
if (__DEV__) {
    global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
    global.FormData = global.originalFormData || global.FormData;

    if (window.FETCH_SUPPORT) {
        window.FETCH_SUPPORT.blob = false;
    } else {
        global.Blob = global.originalBlob || global.Blob;
        global.FileReader = global.originalFileReader || global.FileReader;
    }

    LogBox.ignoreLogs([/Require cycle/gi, /I tried to enable Network Inspect/gi]);
}

const WrappedApp = () => (
    <Provider store={store}>
        <ApolloProvider client={apolloClient}>
            <NavigationContainer>
                <App />
            </NavigationContainer>
        </ApolloProvider>
    </Provider>
);

AppRegistry.registerComponent(appName, () => WrappedApp);
