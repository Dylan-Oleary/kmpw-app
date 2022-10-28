import { Platform, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

import { theme } from "@/constants";
import { globalStyles } from "@/styles";

export const styles = StyleSheet.create({
    actionsRow: {
        ...globalStyles.flexRow
    },
    buttonRowItem: {
        marginLeft: theme.spacing["3"]
    },
    contentContainer: {
        ...globalStyles.defaultFlex,
        padding: 30
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
