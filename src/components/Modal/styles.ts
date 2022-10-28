import { StyleSheet } from "react-native";

import { theme } from "@/constants";

export const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: theme.colors.white,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        padding: 30,
        paddingBottom: 15,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0
    },
    modalContainer: {
        margin: 0
    }
});
