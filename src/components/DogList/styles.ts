import { StyleSheet } from "react-native";

import { theme } from "@/constants";
import { globalStyles } from "@/styles";

export const styles = StyleSheet.create({
    addDogButtonContainer: {
        marginTop: theme.spacing[7],
        marginBottom: theme.spacing[5]
    },
    addDogIcon: {
        color: theme.colors.white
    },
    dogListContainer: {
        marginTop: theme.spacing["7"]
    },
    dogListTitleContainer: {
        ...globalStyles.flexRow,
        ...globalStyles.justifyFlexSpaceBetween,
        ...globalStyles.alignItemsCenter
    },
    dogCardNthItem: {
        marginTop: 18
    }
});
