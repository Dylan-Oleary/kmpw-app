import { StyleSheet } from "react-native";

import { theme } from "@/constants";

export const styles = StyleSheet.create({
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
    infoRow: {
        flexDirection: "row"
    },
    nthInfoRow: {
        marginTop: 8
    },
    infoRowItem: {
        alignItems: "flex-start",
        flex: 1
    },
    infoLabel: {
        lineHeight: 16
    },
    infoValue: {
        lineHeight: 16,
        fontWeight: "700"
    }
});
