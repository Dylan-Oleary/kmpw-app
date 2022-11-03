import { Platform, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

import { theme } from "@/constants";

export const styles = StyleSheet.create({
    icon: {
        color: theme.colors.white
    },
    settingsActionContainer: {
        flexGrow: 1,
        marginTop: theme.spacing[6]
    },
    settingsButton: {
        marginTop: theme.spacing[4]
    }
});

export const getContainerStyle: (insets: EdgeInsets) => StyleProp<ViewStyle> = (
    insets: EdgeInsets
) => {
    const { top } = insets;

    return {
        flexGrow: 1,
        paddingBottom: theme.spacing[8],
        paddingHorizontal: theme.spacing[8],
        ...Platform.select({
            android: {
                paddingTop: theme.spacing[4]
            },
            ios: {
                paddingTop: top / 2
            }
        })
    };
};
