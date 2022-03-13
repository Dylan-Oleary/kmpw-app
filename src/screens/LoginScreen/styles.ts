import { StyleSheet } from "react-native";

import { theme } from "../../constants";

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: theme.spacing[8],
        paddingBottom: theme.spacing[8]
    },
    headerTextAccent: {
        color: theme.colors.brand5
    },
    loginContainer: {
        marginTop: theme.spacing[5]
    },
    footerContainer: {
        backgroundColor: theme.colors.brand5,
        flex: 0,
        padding: theme.spacing[8]
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
