import { StyleSheet } from "react-native";

import { theme } from "@/constants";

export const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingLeft: 19,
        paddingRight: 10
    },
    text: {
        color: theme.colors.white
    }
});
