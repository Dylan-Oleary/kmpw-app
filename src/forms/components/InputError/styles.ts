import { StyleSheet } from "react-native";

import { theme } from "@/constants";

export const styles = StyleSheet.create({
    error: {
        color: theme.colors.error3,
        fontSize: 10,
        height: 20,
        lineHeight: 18,
        paddingHorizontal: theme.spacing[1]
    },
    hidden: {
        opacity: 0
    }
});
