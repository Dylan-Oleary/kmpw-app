import React, { FC, ReactNode, useEffect, useState } from "react";
import {
    StyleProp,
    TextInput as RNTextInput,
    TextInputProps as RNTextInputProps,
    TextStyle,
    View,
    ViewStyle
} from "react-native";

import { Text } from "@/components";
import { theme } from "@/constants";
import { InputError, InputLabel } from "@/forms";
import { globalStyles } from "@/styles";
import { FormInputValidator } from "@/types";

import { styles } from "./styles";

export interface TextInputProps extends Omit<RNTextInputProps, "onChange"> {
    containerStyle?: StyleProp<ViewStyle>;
    error?: string;
    forceLiveValidation?: boolean;
    inputStyle?: StyleProp<TextStyle>;
    label?: string;
    onChange?: (value?: string, error?: string) => void;
    postFix?: string | JSX.Element | ReactNode;
    preFix?: string | JSX.Element | ReactNode;
    sanititize?: (value?: string) => string | undefined;
    validation?: FormInputValidator;
}

export const getInputStyle: (args: {
    preFix?: string | JSX.Element | ReactNode;
    postFix?: string | JSX.Element | ReactNode;
}) => StyleProp<TextStyle> = ({ preFix, postFix }) => {
    const renderedStyles: StyleProp<TextStyle> = [styles.input];

    if (preFix) {
        renderedStyles.push({
            borderBottomLeftRadius: 0,
            borderTopLeftRadius: 0
        });
    }

    if (postFix) {
        renderedStyles.push({
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0
        });
    }

    return renderedStyles;
};

export const getInputBorderErrorStyles: (showError: boolean) => StyleProp<ViewStyle> = (
    showError = false
) => (showError ? styles.error : undefined);

export const renderFix = (
    fix: string | JSX.Element | ReactNode,
    fixStyles: StyleProp<ViewStyle>
) => {
    if (typeof fix === "string") {
        return (
            <View style={fixStyles}>
                <Text size="xs" style={styles.fixText}>
                    {fix}
                </Text>
            </View>
        );
    }

    return fix;
};

export const TextInput: FC<TextInputProps> = ({
    containerStyle = {},
    error,
    forceLiveValidation = false,
    inputStyle = {},
    label,
    onChange,
    placeholderTextColor = theme.colors.gray1,
    postFix,
    preFix,
    sanititize,
    validation,
    value,
    ...props
}) => {
    const [isLiveValidationActive, setIsLiveValidationActive] =
        useState<boolean>(forceLiveValidation);
    const showErrorStyles = Boolean(isLiveValidationActive && error);

    const handleBlur = () => {
        if (!isLiveValidationActive) setIsLiveValidationActive(true);

        if (validation) {
            handleChange(value);
        }
    };

    const handleChange: (value?: string) => void = (value = "") => {
        const cleanValue = sanitizeValue(value);

        onChange?.(cleanValue, validation ? validation(cleanValue) : undefined);
    };

    const sanitizeValue: (value?: string) => string | undefined = (value) =>
        sanititize ? sanititize(value) : value;

    useEffect(() => {
        if (forceLiveValidation && !isLiveValidationActive) {
            setIsLiveValidationActive(true);
        }
    }, [forceLiveValidation]);

    return (
        <View style={containerStyle}>
            {label && <InputLabel>{label}</InputLabel>}
            <View style={globalStyles.flexRow}>
                {preFix &&
                    renderFix(preFix, [
                        styles.fixContainer,
                        styles.preFixContainer,
                        getInputBorderErrorStyles(showErrorStyles)
                    ])}
                <RNTextInput
                    onBlur={handleBlur}
                    onChangeText={handleChange}
                    placeholderTextColor={placeholderTextColor}
                    style={[
                        getInputStyle({
                            preFix,
                            postFix
                        }),
                        getInputBorderErrorStyles(showErrorStyles),
                        inputStyle
                    ]}
                    value={value}
                    {...props}
                />
                {postFix &&
                    renderFix(postFix, [
                        styles.fixContainer,
                        styles.postFixContainer,
                        getInputBorderErrorStyles(showErrorStyles)
                    ])}
            </View>
            <InputError error={error} show={isLiveValidationActive} />
        </View>
    );
};
