import { StyleSheet } from "react-native";

import { theme } from "@/constants";

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
    dogCardNthItem: {
        marginTop: 18
    }
});
