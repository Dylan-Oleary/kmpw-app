import { StyleSheet } from "react-native";

import { theme } from "@/constants";

export const styles = StyleSheet.create({
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
        top: 10
    },
    editIcon: {
        color: theme.colors.brand5
    },
    infoContainer: {
        backgroundColor: theme.colors.gray3,
        borderColor: theme.colors.gray5,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
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
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        height: 48,
        paddingVertical: 12
    },
    nthInfoRow: {
        marginTop: 8
    }
});
