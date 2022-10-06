import React, { FC, ReactNode, useEffect, useState } from "react";
import { Platform, StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import dayjs from "dayjs";

import { DATE_FORMATS } from "@/constants";
import { TextInput } from "@/forms";
import { DatePickerModal } from "@/modals";
import { FormInputValidator } from "@/types";

export interface DateInputProps {
    containerStyle?: StyleProp<ViewStyle>;
    dateFormat?: string;
    error?: string;
    forceLiveValidation?: boolean;
    label?: string;
    minimumDate?: Date;
    onConfirm: (newDate: Date, error?: string) => void;
    placeholder?: string;
    postFix?: string | JSX.Element | ReactNode;
    preFix?: string | JSX.Element | ReactNode;
    sanititize?: (value: Date) => Date;
    validation?: FormInputValidator<Date>;
    value?: Date;
}

export const DateInput: FC<DateInputProps> = ({
    containerStyle = {},
    dateFormat = DATE_FORMATS.FULL_MONTH_WITH_DAY_AND_YEAR,
    error,
    forceLiveValidation = false,
    label,
    minimumDate,
    onConfirm,
    placeholder,
    postFix,
    preFix,
    sanititize,
    validation,
    value
}) => {
    const [isLiveValidationActive, setIsLiveValidationActive] =
        useState<boolean>(forceLiveValidation);
    const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState<boolean>(false);

    const handleConfirm: (value: Date) => void = (value) => {
        if (!isLiveValidationActive) setIsLiveValidationActive(true);

        const date = sanitizeValue(value);

        onConfirm?.(date, validation ? validation(date) : undefined);
        setIsDatePickerModalOpen(false);
    };

    const sanitizeValue: (value: Date) => Date = (value) =>
        sanititize ? sanititize(value) : value;

    useEffect(() => {
        if (forceLiveValidation && !isLiveValidationActive) {
            setIsLiveValidationActive(true);
        }
    }, [forceLiveValidation]);

    return (
        <>
            <TouchableOpacity activeOpacity={1} onPress={() => setIsDatePickerModalOpen(true)}>
                <TextInput
                    containerStyle={containerStyle}
                    editable={false}
                    error={error}
                    forceLiveValidation={isLiveValidationActive}
                    label={label}
                    onPressIn={(event) => {
                        // Handle iOS TouchableOpacity issue
                        if (Platform.OS === "ios") {
                            event.preventDefault();
                            setIsDatePickerModalOpen(true);
                        }
                    }}
                    placeholder={placeholder}
                    postFix={postFix}
                    preFix={preFix}
                    value={value && dayjs(value).format(dateFormat)}
                />
            </TouchableOpacity>
            <DatePickerModal
                initialDate={value}
                isVisible={isDatePickerModalOpen}
                minimumDate={minimumDate}
                onConfirm={handleConfirm}
                onRequestClose={() => setIsDatePickerModalOpen(false)}
            />
        </>
    );
};
