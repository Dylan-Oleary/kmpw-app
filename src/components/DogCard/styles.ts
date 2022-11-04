import { StyleSheet } from "react-native";

import { theme } from "@/constants";

const BORDER_RADIUS = 10;

export const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: theme.colors.gray3,
        borderRadius: BORDER_RADIUS,
        // Android shadows
        elevation: 3,
        // iOS shadows
        shadowColor: theme.colors.black,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22
    },
    dogImageColumn: {
        alignContent: "center",
        justifyContent: "center",
        paddingHorizontal: 18,
        paddingVertical: 22
    },
    dogInfoContainer: {
        paddingVertical: 20,
        paddingRight: 27,
        flexGrow: 1
    },
    editIconContainer: {
        position: "absolute",
        right: 10,
        top: 10,
        zIndex: 1
    },
    editIcon: {
        color: theme.colors.brand5
    },
    infoContainer: {
        backgroundColor: theme.colors.gray3,
        borderColor: theme.colors.gray3,
        borderTopLeftRadius: BORDER_RADIUS,
        borderTopRightRadius: BORDER_RADIUS,
        borderBottomWidth: 0,
        flexDirection: "row",
        position: "relative"
    },
    infoRow: {
        flexDirection: "row"
    },
    infoRowItem: {
        alignItems: "flex-start",
        flex: 1
    },
    infoValue: {
        fontWeight: "700"
    },
    footerContainer: {
        borderBottomLeftRadius: BORDER_RADIUS,
        borderBottomRightRadius: BORDER_RADIUS,
        height: 48,
        paddingVertical: 12
    },
    nthInfoRow: {
        marginTop: 8
    }
});
