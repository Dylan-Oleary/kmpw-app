import { Platform, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

import { theme } from "@/constants";

export const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingHorizontal: theme.spacing[8],
        paddingBottom: theme.spacing[8]
    },
    loginContainer: {
        marginTop: theme.spacing[5]
    },
    footerText: {
        color: theme.colors.white
    },
    footerCopy: {
        marginTop: theme.spacing[4]
    },
    registerButtonContainer: {
        marginTop: theme.spacing[4]
    }
});

export const getContainerStyle: (insets: EdgeInsets) => StyleProp<ViewStyle> = (
    insets: EdgeInsets
) => {
    const { top } = insets;

    return {
        backgroundColor: theme.colors.white,
        flexGrow: 1,
        ...Platform.select({
            ios: {
                paddingTop: top / 2
            }
        })
    };
};

export const getFooterContainerStyle: (insets: EdgeInsets) => StyleProp<ViewStyle> = (
    insets: EdgeInsets
) => {
    const { bottom } = insets;

    return {
        backgroundColor: theme.colors.brand5,
        flex: 0,
        paddingHorizontal: theme.spacing[8],
        paddingTop: theme.spacing[8],
        ...Platform.select({
            android: {
                paddingBottom: theme.spacing[8]
            },
            ios: {
                paddingBottom: bottom
            }
        })
    };
};
