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
        borderTopColor: theme.colors.brand5,
        borderTopWidth: 0.25
    },
    logoutIcon: {
        color: theme.colors.brand5
    }
});
