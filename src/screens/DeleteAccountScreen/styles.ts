import { Platform, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

import { theme } from "@/constants";
import { globalStyles } from "@/styles";

export const styles = StyleSheet.create({
    accentText: {
        color: theme.colors.brand5
    },
    actionsRow: {
        ...globalStyles.flexRow,
        marginTop: theme.spacing[4]
    },
    alert: {
        marginTop: theme.spacing[4]
    },
    contentContainer: {
        ...globalStyles.defaultFlex,
        padding: 30
    },
    confirmButton: {
        marginLeft: theme.spacing[2]
    },
    icon: {
        color: theme.colors.white,
        height: 12,
        width: 12
    },
    inputContainer: {
        marginTop: theme.spacing[2]
    },
    verticalSpace: {
        marginTop: theme.spacing[4]
    }
});

export const getContainerStyle: (insets: EdgeInsets) => StyleProp<ViewStyle> = (insets) => {
    const { bottom = 0 } = insets;

    return {
        ...globalStyles.defaultFlex,
        ...Platform.select({
            ios: {
                paddingBottom: bottom
            }
        })
    };
};
