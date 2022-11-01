import { StyleSheet } from "react-native";

import { theme } from "@/constants";
import { globalStyles } from "@/styles";

export const styles = StyleSheet.create({
    checkboxContainer: {
        marginBottom: theme.spacing[5]
    },
    checkboxLabelContainer: {
        ...globalStyles.defaultFlex,
        ...globalStyles.flexRow
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
