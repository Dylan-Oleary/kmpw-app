import { StyleSheet } from "react-native";

import { theme } from "../../../constants";

export const styles = StyleSheet.create({
    input: {
        borderColor: theme.colors.gray2,
        borderRadius: 5,
        borderWidth: 0.66,
        color: theme.colors.textDark,
        fontFamily: "Poppins",
        fontWeight: "500",
        paddingHorizontal: 8,
        paddingVertical: 4
    }
});
