import { StyleSheet } from "react-native";

import { theme } from "@/constants";

export const styles = StyleSheet.create({
    button: {
        borderRadius: 60,
        paddingHorizontal: theme.spacing[6],
        paddingVertical: theme.spacing[3]
    },
    content: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center"
    },
    text: {
        color: theme.colors.white,
        fontFamily: "Poppins",
        fontWeight: "500"
    },
    iconLeft: {
        marginRight: theme.spacing[1]
    },
    iconRight: {
        marginLeft: theme.spacing[1]
    }
});
