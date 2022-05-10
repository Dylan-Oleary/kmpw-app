import { StyleSheet } from "react-native";

import { theme } from "@/constants";

export const styles = StyleSheet.create({
    contentContainer: {
        padding: 30
    },
    headerBodyText: {
        lineHeight: theme.spacing["6"],
        marginTop: theme.spacing["5"]
    },
    headerContainer: {
        padding: 30
    },
    headerTextAccent: {
        color: theme.colors.brand5
    }
});
