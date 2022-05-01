import { Platform, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

import { theme } from "../../constants";

export const styles = StyleSheet.create({
    backgroundImage: {
        height: "100%",
        width: "100%"
    },
    headerTextAccent: {
        color: theme.colors.brand5
    },
    locationCtaText: {
        marginTop: theme.spacing[7]
    },
    settingsButton: {
        marginTop: theme.spacing[4]
    },
    settingsButtonText: {
        color: theme.colors.white
    },
    transparentBackground: {
        backgroundColor: "transparent"
    },
    wrapperContainer: {
        flex: 1
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

export const getFooterContainerStyle: (insets: EdgeInsets) => StyleProp<ViewStyle> = (
    insets: EdgeInsets
) => {
    const { bottom } = insets;

    return {
        ...Platform.select({
            ios: {
                backgroundColor: theme.colors.brand5,
                paddingBottom: bottom
            }
        })
    };
};
