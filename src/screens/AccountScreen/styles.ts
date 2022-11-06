import { Platform, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

import { theme } from "@/constants";
import { globalStyles } from "@/styles";

export const styles = StyleSheet.create({
    actionsRow: {
        marginTop: theme.spacing[4]
    },
    contentContainer: {
        ...globalStyles.defaultFlex,
        padding: 30
    },
    disclaimerContainer: {
        ...globalStyles.justifyFlexEnd,
        flexGrow: 1
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
