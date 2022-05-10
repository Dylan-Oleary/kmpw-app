import { ImageStyle, Platform, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

import { theme } from "@/constants";

export const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: theme.spacing[8],
        paddingBottom: theme.spacing[8]
    },
    headerTextAccent: {
        color: theme.colors.brand5
    },
    registerContainer: {
        marginTop: theme.spacing[5]
    },
    footerContainer: {
        backgroundColor: theme.colors.brand5,
        flex: 0,
        padding: theme.spacing[8]
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

export const getContainerStyle: () => StyleProp<ViewStyle> = () => {
    return {
        backgroundColor: theme.colors.white,
        flexGrow: 1,
        ...Platform.select({
            ios: {
                paddingTop: theme.spacing[2]
            }
        })
    };
};

export const getFooterImageStyle: (insets: EdgeInsets) => StyleProp<ImageStyle> = (
    insets: EdgeInsets
) => {
    const { bottom } = insets;

    return {
        ...Platform.select({
            android: {
                flex: 1
            },
            ios: {
                flex: 1,
                paddingBottom: bottom
            }
        })
    };
};
