import { StyleSheet } from "react-native";

import { theme } from "@/constants";

export const styles = StyleSheet.create({
    font: {
        color: theme.colors.textDark,
        fontFamily: "Poppins",
        fontWeight: "500"
    },
    ...theme.typography
});
