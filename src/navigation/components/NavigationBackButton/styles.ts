import { StyleSheet } from "react-native";

import { theme } from "@/constants";
import { globalStyles } from "@/styles";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent"
    },
    icon: {
        color: theme.colors.textDark,
        height: 16,
        width: 16
    },
    pressable: {
        ...globalStyles.alignItemsCenter,
        ...globalStyles.flexRow
    },
    text: {
        marginLeft: theme.spacing[1]
    }
});
