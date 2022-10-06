import { Platform, StyleSheet } from "react-native";

import { theme } from "@/constants";

export const styles = StyleSheet.create({
    error: {
        borderColor: theme.colors.error3
    },
    input: {
        borderColor: theme.colors.gray2,
        borderRadius: 5,
        borderWidth: 0.66,
        maxHeight: 36.7,
        paddingLeft: 8,
        paddingVertical: 4
    },
    inputDropDownOpen: {
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0
    },
    inputText: {
        color: theme.colors.textDark,
        fontSize: 14,
        fontWeight: "500"
    },
    listContainer: {
        borderColor: theme.colors.gray2,
        borderRadius: 5,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderWidth: 0.66,
        marginTop: Platform.select({
            android: -26,
            ios: -2
        }),
        marginRight: 0,
        shadowColor: "transparent",
        elevation: 0
    },
    listItem: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: theme.spacing[2],
        paddingVertical: theme.spacing[3]
    },
    placeholder: {
        color: theme.colors.gray1,
        fontSize: 14,
        fontWeight: "500"
    },
    postFixContainer: {
        alignItems: "center",
        borderLeftWidth: 0.66,
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        borderColor: theme.colors.gray2,
        borderRadius: 5,
        height: "100%",
        justifyContent: "center",
        paddingHorizontal: theme.spacing[4],
        width: 50.5
    },
    searchContainer: {
        marginTop: theme.spacing[1],
        marginBottom: theme.spacing[3],
        paddingHorizontal: 8
    },
    searchInput: {
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderRadius: 0,
        borderBottomWidth: 1,
        borderColor: theme.colors.brand5
    },
    selectedIcon: {
        color: theme.colors.brand5,
        height: 15,
        width: 15
    },
    selectedListItemText: {
        color: theme.colors.brand5,
        fontWeight: "700"
    }
});
