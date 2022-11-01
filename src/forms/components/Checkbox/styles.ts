import { StyleSheet } from "react-native";

import { theme } from "@/constants";
import { ICheckboxProps } from "@/forms";
import { globalStyles } from "@/styles";

const CHECKBOX_SIZE = 20;

export const styles = StyleSheet.create({
    container: {
        ...globalStyles.flexRow,
        ...globalStyles.alignItemsCenter
    },
    labelContainer: {
        marginLeft: theme.spacing[2]
    }
});

export const getCheckBoxStyleProps: (
    isChecked: boolean
) => Pick<ICheckboxProps, "iconStyle" | "innerIconStyle" | "fillColor"> = (isChecked = false) => ({
    fillColor: theme.colors.brand5,
    iconStyle: {
        height: CHECKBOX_SIZE,
        width: CHECKBOX_SIZE
    },
    innerIconStyle: {
        borderColor: isChecked ? theme.colors.brand5 : theme.colors.gray2,
        borderWidth: 0.66,
        height: CHECKBOX_SIZE,
        width: CHECKBOX_SIZE
    }
});
