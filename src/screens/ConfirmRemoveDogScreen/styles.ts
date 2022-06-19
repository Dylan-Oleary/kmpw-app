import { StyleSheet } from "react-native";

import { theme } from "@/constants";

export const styles = StyleSheet.create({
    alertContainer: {
        marginTop: theme.spacing[4]
    },
    contentContainer: {
        padding: 30
    },
    detailsContainer: {
        marginTop: theme.spacing["7"]
    },
    headerBodyText: {
        marginTop: theme.spacing["5"]
    }
});
