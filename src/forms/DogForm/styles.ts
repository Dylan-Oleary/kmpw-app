import { StyleSheet } from "react-native";

import { theme } from "@/constants";
import { globalStyles } from "@/styles";

export const styles = StyleSheet.create({
    imageInputContainer: {
        ...globalStyles.alignItemsCenter,
        marginBottom: theme.spacing["7"]
    },
    spacer: {
        marginTop: theme.spacing[4]
    },
    submitIcon: {
        color: theme.colors.white
    }
});
