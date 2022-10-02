import { StyleSheet } from "react-native";

import { globalStyles } from "@/styles";

export const styles = StyleSheet.create({
    modal: {
        ...globalStyles.alignItemsCenter,
        ...globalStyles.justifyFlexCenter,
        backgroundColor: "transparent",
        height: "100%"
    },
    loaderContainer: {
        ...globalStyles.defaultFlex,
        backgroundColor: "transparent",
        width: "45%"
    }
});
