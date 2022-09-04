import { StyleSheet } from "react-native";

import { theme } from "@/constants";

export const styles = StyleSheet.create({
    container: {
        borderRadius: 0,
        borderBottomColor: theme.colors.error5,
        borderBottomWidth: 0.75,
        paddingHorizontal: 20
    },
    icon: {
        color: theme.colors.error5,
        marginRight: theme.spacing[2],
        height: 20,
        width: 20
    },
    text: {
        color: theme.colors.error5,
        flex: 1,
        flexWrap: "wrap"
    }
});
