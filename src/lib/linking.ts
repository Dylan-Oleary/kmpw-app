import { Linking, Platform } from "react-native";

export const openNativeAppSettings: () => void = () => {
    if (Platform.OS === "ios") {
        Linking.openURL("app-settings:");
    } else if (Platform.OS === "android") {
        Linking.openSettings();
    } else {
        throw new Error(`Unsupported OS: ${Platform.OS}`);
    }
};
