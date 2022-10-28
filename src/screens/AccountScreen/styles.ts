import { Platform, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

import { theme } from "@/constants";
import { globalStyles } from "@/styles";

export const styles = StyleSheet.create({
    actionsRow: {
        ...globalStyles.flexRow,
        marginTop: theme.spacing[4]
    },
    actionsRowNthItem: {
        marginLeft: theme.spacing[2]
    },
    contentContainer: {
        ...globalStyles.defaultFlex,
        padding: 30
    },
    deleteAccountIcon: {
        height: 12,
        width: 12
    },
    icon: {
        color: theme.colors.white
    },
    profileInfoContainer: {
        ...globalStyles.defaultFlex
    },
    profileInfo: {
        flex: 0
    },
    profileInfoNthItem: {
        marginTop: theme.spacing[2]
    },
    stack: {
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
