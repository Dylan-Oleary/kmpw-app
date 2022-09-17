import { StyleSheet } from "react-native";

import { theme } from "@/constants";

export const styles = StyleSheet.create({
    avatar: {
        borderColor: theme.colors.gray4,
        borderWidth: 1,
        borderRadius: 200
    },
    container: {
        position: "relative"
    },
    iconContainer: {
        alignItems: "center",
        backgroundColor: theme.colors.gray3,
        borderRadius: 200,
        justifyContent: "center",
        right: 0,
        bottom: 0,
        position: "absolute"
    }
});
