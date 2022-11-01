import { StyleSheet } from "react-native";

import { theme } from "@/constants";
import { globalStyles } from "@/styles";

export const styles = StyleSheet.create({
    checkboxContainer: {
        ...globalStyles.flexRow,
        flexWrap: "wrap"
    },
    formFieldsContainer: {
        marginTop: theme.spacing[6]
    },
    link: {
        fontWeight: "700"
    },
    spacer: {
        marginTop: theme.spacing[4]
    },
    submitIcon: {
        color: theme.colors.white
    }
});
