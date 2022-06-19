import { StyleSheet } from "react-native";

import { theme } from "@/constants";
import { globalStyles } from "@/styles";

export const styles = StyleSheet.create({
    actionsRow: {
        ...globalStyles.flexRow,
        ...globalStyles.justifyFlexEnd,
        marginTop: theme.spacing[4]
    },
    submitIcon: {
        color: theme.colors.white
    }
});
