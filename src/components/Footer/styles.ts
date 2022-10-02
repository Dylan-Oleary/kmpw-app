import { StyleSheet } from "react-native";

import { theme } from "@/constants";

export const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.white
    },
    buttonText: {
        color: theme.colors.brand5
    },
    container: {
        alignItems: "center",
        backgroundColor: theme.colors.white,
        flexDirection: "row",
        justifyContent: "space-between",
        shadowColor: theme.colors.black,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.4,
        shadowRadius: 1.41,
        elevation: 2
    },
    logoutIcon: {
        color: theme.colors.brand5
    }
});
