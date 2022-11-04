import { Platform, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

import { theme } from "@/constants";
import { globalStyles } from "@/styles";

export const styles = StyleSheet.create({
    contentContainer: {
        ...globalStyles.defaultFlex,
        paddingHorizontal: theme.spacing[8],
        paddingBottom: theme.spacing[8]
    },
    imageBackgroundContainer: {
        ...globalStyles.defaultFlex,
        backgroundColor: theme.colors.brand5
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
    const { top = 0 } = insets;

    return {
        backgroundColor: theme.colors.white,
        flexGrow: 1,
        ...Platform.select({
            android: {
                paddingTop: theme.spacing[6]
            },
            ios: {
                paddingTop: top > 0 ? top / 2 : theme.spacing[6]
            }
        })
    };
};

export const getFooterContainerStyle: (insets: EdgeInsets) => StyleProp<ViewStyle> = (insets) => {
    const { bottom = 0 } = insets;

    return {
        backgroundColor: "transparent",
        flex: 0,
        paddingHorizontal: theme.spacing[8],
        paddingTop: theme.spacing[8],
        ...Platform.select({
            android: {
                paddingBottom: theme.spacing[8]
            },
            ios: {
                paddingBottom: bottom > 0 ? bottom : theme.spacing[8]
            }
        })
    };
};
