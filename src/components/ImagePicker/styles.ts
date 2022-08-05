import { StyleSheet } from "react-native";

import { theme } from "@/constants";
import { globalStyles } from "@/styles";

export const styles = StyleSheet.create({
    actionsRow: {
        ...globalStyles.flexRow,
        ...globalStyles.justifyFlexCenter
    },
    actionItem: {
        ...globalStyles.alignItemsCenter
    },
    actionText: {
        marginTop: theme.spacing[2]
    },
    divider: {
        width: theme.spacing[16]
    },
    icon: {
        height: 32,
        width: 32,
        color: theme.colors.brand5
    }
});
