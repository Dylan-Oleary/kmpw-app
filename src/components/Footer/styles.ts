import { StyleSheet } from "react-native";

import { theme } from "../../constants";

export const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: theme.colors.brand5,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    logoutIcon: {
        color: theme.colors.white
    }
});
