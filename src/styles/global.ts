import { Dimensions, StyleSheet } from "react-native";

import { theme } from "@/constants";

export const screenHeight = Dimensions.get("screen").height;
export const screenWidth = Dimensions.get("screen").width;
export const maxDeviceHeight = Math.max(Dimensions.get("window").height, screenHeight);

export const globalStyles = StyleSheet.create({
    // Layout
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
    },
    // Box Shadow
    androidBoxShadow: {
        elevation: 5
    },
    iOSBoxShadow: {
        shadowColor: theme.colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
    }
});
