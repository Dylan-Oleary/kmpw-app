import { StyleSheet } from "react-native";

import { theme } from "@/constants";
import { globalStyles } from "@/styles";

export const styles = StyleSheet.create({
    actionsRow: {
        ...globalStyles.flexRow,
        ...globalStyles.justifyFlexEnd,
        marginTop: theme.spacing[6]
    },
    alert: {
        marginTop: theme.spacing[4]
    },
    confirmButton: {
        marginLeft: theme.spacing[2]
    },
    icon: {
        color: theme.colors.white,
        height: 12,
        width: 12
    }
});
