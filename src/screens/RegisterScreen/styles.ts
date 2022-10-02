import { Platform, StyleProp, StyleSheet, ViewStyle } from "react-native";

import { theme } from "@/constants";
import { globalStyles } from "@/styles";

export const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: theme.spacing[8],
        paddingBottom: theme.spacing[8]
    },
    registerContainer: {
        marginTop: theme.spacing[5]
    },
    footerContainer: {
        backgroundColor: theme.colors.brand5,
        flex: 0,
        padding: theme.spacing[8]
    },
    footerImage: {
        ...globalStyles.defaultFlex
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
