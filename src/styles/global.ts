import { Dimensions, StyleSheet } from "react-native";

export const screenHeight = Dimensions.get("screen").height;
export const screenWidth = Dimensions.get("screen").width;

export const globalStyles = StyleSheet.create({
    defaultFlex: {
        flex: 1
    }
});
