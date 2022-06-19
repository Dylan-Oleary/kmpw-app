import { StyleSheet } from "react-native";

import { theme } from "@/constants";
import { globalStyles } from "@/styles";

export const styles = StyleSheet.create({
    buttonIcon: {
        color: theme.colors.white
    },
    buttonRow: {
        ...globalStyles.flexRow,
        marginTop: theme.spacing["7"]
    },
    confirmButton: {
        marginLeft: theme.spacing["3"]
    },
    dogInfoContainer: {
        marginTop: theme.spacing["7"]
    },
    dogInfoItem: {
        flex: 0,
        marginTop: theme.spacing["3"]
    },
    pawIcon: {
        color: theme.colors.textDark,
        marginLeft: 5,
        height: 18,
        width: 18,
        transform: [{ rotate: "24deg" }]
    },
    pencilIcon: {
        height: 11,
        width: 11,
        marginTop: -1
    }
});
