import { StyleSheet } from "react-native";

import { theme } from "@/constants";
import { globalStyles } from "@/styles";
import { UserMessageTheme } from "@/types";

export const styles = StyleSheet.create({
    container: {
        borderRadius: 6,
        padding: theme.spacing[2]
    },
    buttonRow: {
        ...globalStyles.flexRow,
        ...globalStyles.justifyFlexEnd,
        marginTop: theme.spacing[2]
    },
    buttonIcon: {
        color: theme.colors.white,
        height: 12,
        width: 12
    },
    listContainer: {
        paddingLeft: theme.spacing[2]
    },
    messageContainer: {
        marginTop: theme.spacing[2]
    }
});

export const getAlertStyles = (alertTheme: UserMessageTheme) =>
    StyleSheet.create({
        button: {
            backgroundColor: theme.colors[`${alertTheme}4`]
        },
        container: {
            backgroundColor: theme.colors[`${alertTheme}1`]
        },
        messageText: {
            color: theme.colors[`${alertTheme}4`]
        },
        title: {
            color: theme.colors[`${alertTheme}5`]
        }
    });
