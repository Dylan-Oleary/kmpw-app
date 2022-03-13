import { StyleSheet } from "react-native";

import { theme } from "../../constants";

export const styles = StyleSheet.create({
    formFieldsContainer: {
        marginTop: theme.spacing[6]
    },
    submitButtonContainer: {
        marginTop: theme.spacing[4]
    },
    submitIcon: {
        color: theme.colors.white
    }
});
