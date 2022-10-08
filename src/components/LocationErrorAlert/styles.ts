import { StyleSheet } from "react-native";

import { theme } from "@/constants";

export const styles = StyleSheet.create({
    container: {
        borderRadius: 0,
        borderBottomColor: theme.colors.warning4,
        borderBottomWidth: 0.75,
        paddingHorizontal: 20
    },
    icon: {
        color: theme.colors.warning4,
        marginRight: theme.spacing[2],
        height: 20,
        width: 20
    },
    text: {
        color: theme.colors.warning4,
        flex: 1,
        flexWrap: "wrap"
    }
});
