import { StyleSheet } from "react-native";

import { theme } from "@/constants";
import { globalStyles } from "@/styles";

export const styles = StyleSheet.create({
    actionsRow: {
        ...globalStyles.flexRow
    },
    actionsRowNthItem: {
        marginLeft: theme.spacing[2]
    },
    deleteAccountIcon: {
        height: 12,
        width: 12
    },
    icon: {
        color: theme.colors.white
    }
});
