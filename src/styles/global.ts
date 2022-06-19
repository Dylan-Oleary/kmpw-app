import { Dimensions, StyleSheet } from "react-native";

export const screenHeight = Dimensions.get("screen").height;
export const screenWidth = Dimensions.get("screen").width;
export const maxDeviceHeight = Math.max(Dimensions.get("window").height, screenHeight);

export const globalStyles = StyleSheet.create({
    defaultFlex: {
        flex: 1
    },
    flexRow: {
        flexDirection: "row"
    },
    alignItemsCenter: {
        alignItems: "center"
    },
    justifyFlexSpaceBetween: {
        justifyContent: "space-between"
    },
    justifyFlexCenter: {
        justifyContent: "center"
    },
    justifyFlexEnd: {
        justifyContent: "flex-end"
    }
});
