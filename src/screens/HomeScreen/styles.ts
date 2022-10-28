import { Platform, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

import { theme } from "@/constants";
import { globalStyles } from "@/styles";

export const styles = StyleSheet.create({
    contentContainer: {
        padding: 30
    },
    headerBodyText: {
        lineHeight: theme.spacing["6"],
        marginTop: theme.spacing["5"]
    },
    headerContainer: {
        padding: 30
    },
    weatherBanner: {
        ...Platform.select({
            android: {
                paddingTop: theme.spacing[2]
            }
        })
    }
});

export const getContainerStyle: (insets: EdgeInsets) => StyleProp<ViewStyle> = (insets) => {
    const { bottom = 0 } = insets;

    return {
        ...globalStyles.defaultFlex,
        ...Platform.select({
            ios: {
                paddingBottom: bottom * 0.6
            }
        })
    };
};
