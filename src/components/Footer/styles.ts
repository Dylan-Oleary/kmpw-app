import { StyleSheet } from "react-native";

import { theme } from "@/constants";
import { globalStyles } from "@/styles";

export const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.white
    },
    buttonText: {
        color: theme.colors.brand5
    },
    container: {
        ...globalStyles.alignItemsCenter,
        ...globalStyles.justifyFlexEnd,
        backgroundColor: theme.colors.white,
        flexDirection: "row",
        borderTopColor: theme.colors.brand5,
        borderTopWidth: 0.25
    },
    userIcon: {
        color: theme.colors.brand5,
        height: 14,
        width: 14
    }
});
