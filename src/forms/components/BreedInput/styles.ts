import { StyleProp, StyleSheet, ViewStyle } from "react-native";

import { buttonBoxStyles } from "@/components/Button/styles";
import { theme } from "@/constants";
import { globalStyles } from "@/styles";

export const styles = StyleSheet.create({
    actionsRow: {
        ...globalStyles.flexRow,
        ...globalStyles.justifyFlexEnd,
        marginTop: theme.spacing[4]
    },
    breedStatsContainer: {
        paddingHorizontal: 30,
        position: "absolute",
        top: 100
    },
    modal: {
        height: "60%"
    },
    selector: {
        ...globalStyles.defaultFlex
    },
    submitIcon: {
        color: theme.colors.white
    }
});

export const getDropdownListStyles: (height?: number) => StyleProp<ViewStyle> = (height) => ({
    height: height ? height - (styles.actionsRow.marginTop + buttonBoxStyles.boxMd.minHeight) : 0
});
