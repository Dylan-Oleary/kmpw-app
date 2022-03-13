import { StyleSheet } from "react-native";

import { theme } from "../../constants";

export const styles = StyleSheet.create({
    addDogButtonContainer: {
        marginTop: theme.spacing[7],
        marginBottom: theme.spacing[5]
    },
    addDogIcon: {
        color: theme.colors.white
    },
    container: {
        flex: 1
    },
    headerContainer: {
        padding: 30
    },
    headerTextAccent: {
        color: theme.colors.brand5
    },
    headerBodyText: {
        lineHeight: theme.spacing["6"],
        marginTop: theme.spacing["5"]
    },
    dogListContainer: {
        flex: 1,
        padding: 30
    },
    dogList: {
        marginTop: theme.spacing["7"]
    },
    dogCardNthItem: {
        marginTop: 18
    }
});
