import { StyleSheet } from "react-native";

import { theme } from "@/constants";
import { globalStyles } from "@/styles";

export const styles = StyleSheet.create({
    container: {
        borderRadius: 0,
        borderBottomColor: theme.colors.warning4,
        borderBottomWidth: 0.75,
        paddingHorizontal: 20
    },
    icon: {
        color: theme.colors.warning4,
        marginRight: theme.spacing[2],
        height: 20,
        width: 20
    },
    bold: {
        fontWeight: "700"
    },
    text: {
        ...globalStyles.defaultFlex,
        color: theme.colors.warning4,
        flexWrap: "wrap"
    }
});
