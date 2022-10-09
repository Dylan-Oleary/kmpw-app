import { StyleSheet } from "react-native";

import { WEATHER_ICON_DEFAULT_SIZE } from "@/components";
import { theme } from "@/constants";
import { globalStyles } from "@/styles";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.brand5,
        flexDirection: "row",
        paddingBottom: 10
    },
    divider: {
        backgroundColor: theme.colors.white,
        opacity: 0.3,
        width: 1
    },
    iconContainer: {
        ...globalStyles.alignItemsCenter,
        ...globalStyles.justifyFlexCenter,
        paddingHorizontal: 10
    },
    infoContainer: {
        flexDirection: "row",
        flexGrow: 1,
        justifyContent: "space-between",
        paddingHorizontal: 20
    },
    temperatureContainer: {
        alignItems: "flex-end"
    },
    textColor: {
        color: theme.colors.white
    },
    weatherIconPlaceholderContainer: {
        ...globalStyles.alignItemsCenter,
        ...globalStyles.justifyFlexCenter,
        height: WEATHER_ICON_DEFAULT_SIZE,
        width: WEATHER_ICON_DEFAULT_SIZE
    },
    weatherIconPlaceholder: {
        color: theme.colors.white,
        height: 24,
        width: 24
    }
});
