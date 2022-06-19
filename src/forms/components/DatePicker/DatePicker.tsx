import React, { FC } from "react";
import RNDatePicker, { DatePickerProps as RNDatePickerProps } from "react-native-date-picker";

import { theme } from "@/constants";

export interface DatePickerProps extends RNDatePickerProps {
    onDateChange: (date: Date) => void;
}

export const DatePicker: FC<DatePickerProps> = ({
    date = new Date(),
    mode = "date",
    onDateChange = () => {},
    ...rest
}) => (
    <RNDatePicker
        date={date}
        mode={mode}
        onDateChange={onDateChange}
        textColor={theme.colors.textDark}
        {...rest}
    />
);
