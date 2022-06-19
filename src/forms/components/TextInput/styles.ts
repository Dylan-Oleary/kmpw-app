import { StyleSheet } from "react-native";

import { theme } from "@/constants";

export const styles = StyleSheet.create({
    error: {
        borderColor: theme.colors.error3
    },
    input: {
        borderColor: theme.colors.gray2,
        borderRadius: 5,
        borderWidth: 0.66,
        color: theme.colors.textDark,
        flexGrow: 1,
        fontFamily: "Poppins",
        fontWeight: "500",
        paddingHorizontal: 8,
        paddingVertical: 4
    },
    fixContainer: {
        alignContent: "center",
        borderColor: theme.colors.gray2,
        borderRadius: 5,
        borderWidth: 0.66,
        justifyContent: "center",
        minWidth: 50.5
    },
    fixText: {
        color: theme.colors.brand5,
        fontFamily: "Poppins",
        fontWeight: "500",
        textAlign: "center"
    },
    preFixContainer: {
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        borderRightWidth: 0
    },
    postFixContainer: {
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        borderLeftWidth: 0
    }
});
