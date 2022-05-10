import { StyleSheet } from "react-native";

import { theme } from "@/constants";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.brand5,
        flexDirection: "row",
        paddingBottom: 20
    },
    divider: {
        backgroundColor: theme.colors.white,
        opacity: 0.3,
        width: 1
    },
    iconContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20
    },
    infoContainer: {
        flexDirection: "row",
        flexGrow: 1,
        justifyContent: "space-between",
        paddingHorizontal: 20
    },
    temperatureContainer: {
        alignItems: "flex-end"
    },
    textColor: {
        color: theme.colors.white
    }
});
