import { StyleSheet } from "react-native";

import { theme } from "@/constants";
import { globalStyles, screenWidth } from "@/styles";

export const getToastStyles = (type: "normal" | "success" | "danger" | "warning" | string) => {
    let toastTheme: string;
    const borderRadius = 4;

    switch (type) {
        case "danger":
            toastTheme = theme.colors.error3;
            break;
        case "success":
            toastTheme = theme.colors.brand5;
            break;
        case "warning":
            toastTheme = theme.colors.warning3;
            break;
        case "normal":
        default:
            toastTheme = theme.colors.info3;
            break;
    }

    return StyleSheet.create({
        container: {
            ...globalStyles.androidBoxShadow,
            ...globalStyles.iOSBoxShadow,
            ...globalStyles.flexRow,
            borderRadius,
            marginBottom: theme.spacing[2],
            maxWidth: screenWidth * 0.95,
            width: screenWidth * 0.95
        },
        closeIcon: {
            color: theme.colors.textDark,
            height: 18,
            width: 18,
            marginLeft: theme.spacing[2]
        },
        icon: {
            height: 18,
            width: 18,
            marginRight: theme.spacing[2]
        },
        iconTheme: {
            color: toastTheme
        },
        leftBorder: {
            borderTopLeftRadius: borderRadius,
            borderBottomLeftRadius: borderRadius,
            width: theme.spacing[2]
        },
        leftBorderTheme: {
            backgroundColor: toastTheme
        },
        messageContainer: {
            ...globalStyles.alignItemsCenter,
            ...globalStyles.defaultFlex,
            ...globalStyles.flexRow,
            backgroundColor: "transparent",
            paddingHorizontal: theme.spacing[2],
            paddingVertical: theme.spacing[2]
        },
        messageText: {
            flex: 1,
            flexWrap: "wrap"
        }
    });
};
