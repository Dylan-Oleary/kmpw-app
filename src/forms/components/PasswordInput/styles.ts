import { StyleSheet } from "react-native";

import { theme } from "@/constants";
import { globalStyles } from "@/styles";

export const styles = StyleSheet.create({
    iconContainer: {
        ...globalStyles.defaultFlex,
        ...globalStyles.alignItemsCenter,
        ...globalStyles.justifyFlexCenter,
        width: "100%"
    },
    icon: {
        color: theme.colors.brand5,
        height: 20,
        width: 20
    }
});
