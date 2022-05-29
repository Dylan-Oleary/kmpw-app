import { StyleSheet } from "react-native";

import { theme } from "@/constants";

export const styles = StyleSheet.create({
    buttonIcon: {
        color: theme.colors.white
    },
    buttonRow: {
        flexDirection: "row"
    },
    container: {
        alignItems: "center",
        backgroundColor: theme.colors.gray3,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: theme.colors.gray5,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 19,
        paddingRight: 10
    },
    exitIcon: {
        color: theme.colors.brand5,
        height: 20,
        width: 20
    },
    removeButton: {
        marginLeft: theme.spacing["2"]
    },
    text: {
        color: theme.colors.white
    }
});
