import { StyleSheet } from "react-native";

import { theme } from "@/constants";

export const buttonBoxStyles = StyleSheet.create({
    boxXs: {
        minHeight: 24,
        paddingHorizontal: theme.spacing[2],
        paddingVertical: theme.spacing[1]
    },
    boxSm: {
        minHeight: 32,
        paddingHorizontal: theme.spacing[5],
        paddingVertical: theme.spacing[2]
    },
    boxMd: {
        minHeight: 40,
        paddingHorizontal: theme.spacing[6],
        paddingVertical: theme.spacing[3]
    },
    boxLg: {
        minHeight: 48,
        paddingHorizontal: theme.spacing[7],
        paddingVertical: theme.spacing[4]
    }
});

export const styles = StyleSheet.create({
    button: {
        borderRadius: 60
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
