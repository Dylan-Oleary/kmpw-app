import React, { FC, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { LayoutChangeEvent, StyleProp, View, ViewStyle } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import CaretDownIcon from "@/assets/svg/caret-down.svg";
import PawSolidIcon from "@/assets/svg/paw-solid.svg";
import { Text } from "@/components";
import { theme } from "@/constants";
import { InputError, InputLabel, TextInput } from "@/forms";
import { FormInputValidator } from "@/types";

import { styles } from "./styles";

export interface SelectDropdownProps<T = {}, DataType = {}> {
    containerStyle?: StyleProp<ViewStyle>;
    data: DataType[];
    disabled?: boolean;
    emptyListComponent?: JSX.Element | ReactNode;
    error?: string;
    forceLiveValidation?: boolean;
    label?: string;
    labelKey: string;
    listContainerStyle?: StyleProp<ViewStyle>;
    onBlur?: () => void;
    onChange: (selectedValue: T, error?: string) => void;
    onFocus?: () => void;
    placeholder?: string;
    validation?: FormInputValidator;
    valueKey: string;
    value: T;
    withSearch?: boolean;
}

export const getDropdownInputStyle: (
    isDropdownOpen: boolean,
    showError?: boolean
) => StyleProp<ViewStyle> = (isDropdownOpen, showError = false) => [
    styles.input,
    isDropdownOpen ? styles.inputDropDownOpen : undefined,
    showError ? styles.error : undefined
];

export const getListContainerStyle: (width?: number) => StyleProp<ViewStyle> = (width) => [
    styles.listContainer,
    { width }
];

export const getIconContainerStyle: (showError: boolean) => StyleProp<ViewStyle> = (showError) => [
    styles.postFixContainer,
    showError ? styles.error : undefined
];

export const SelectDropdown: FC<SelectDropdownProps> = ({
    containerStyle,
    data = [],
    disabled = false,
    emptyListComponent,
    error,
    forceLiveValidation = false,
    label,
    labelKey,
    listContainerStyle,
    onBlur,
    onChange = () => {},
    onFocus,
    placeholder = "",
    validation,
    value,
    valueKey,
    withSearch = false
}) => {
    const mountedWidth = useRef<number>();
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [isLiveValidationActive, setIsLiveValidationActive] = useState<boolean>(false);
    const prevValue = useRef(value);
    const showErrorStyles = Boolean(isLiveValidationActive && error && !isDropdownOpen);

    const handleBlur: () => void = () => {
        //@ts-ignore
        onChange(prevValue.current, validation ? validation(prevValue.current) : undefined);
        setIsDropdownOpen(false);
        onBlur?.();
    };

    //@ts-ignore
    const handleChange = (value) => {
        prevValue.current = value;
        onChange(value, validation ? validation(value) : undefined);
    };

    const handleFocus: () => void = () => {
        if (!isLiveValidationActive) setIsLiveValidationActive(true);

        setIsDropdownOpen(true);
        onFocus?.();
    };

    const setMountedWidth: (event: LayoutChangeEvent) => void = ({
        nativeEvent: {
            layout: { width }
        }
    }) => (mountedWidth.current = width);

    const renderListItem = useCallback(
        //TODO: Type this accordingly
        (item: any, selected: boolean) => (
            <View style={styles.listItem}>
                <Text size="sm" style={selected ? styles.selectedListItemText : styles.placeholder}>
                    {item[labelKey]}
                </Text>
                {selected && <PawSolidIcon {...styles.selectedIcon} />}
            </View>
        ),
        []
    );

    const renderInputSearch: (onSearch: (text: string) => void) => JSX.Element = (onSearch) => (
        <TextInput
            containerStyle={styles.searchContainer}
            inputStyle={styles.searchInput}
            //@ts-ignore
            onChange={onSearch}
            placeholder="I'm looking for..."
        />
    );

    useEffect(() => {
        if (forceLiveValidation && !isLiveValidationActive) {
            setIsLiveValidationActive(true);
        }
    }, [forceLiveValidation]);

    return (
        <View onLayout={setMountedWidth} style={containerStyle}>
            {label && <InputLabel>{label}</InputLabel>}
            <Dropdown
                // TODO: Optimize to use auto-scroll
                autoScroll={false}
                containerStyle={[getListContainerStyle(mountedWidth.current), listContainerStyle]}
                data={data}
                disable={disabled}
                dropdownPosition="bottom"
                flatListProps={{
                    //@ts-ignore
                    getItemLayout: (data, index) => ({
                        length: 36,
                        offset: 36 * index,
                        index
                    }),
                    //@ts-ignore
                    keyExtractor: (item) => item[valueKey],
                    initialNumToRender: 10,
                    ListEmptyComponent: emptyListComponent
                }}
                fontFamily="Poppins"
                labelField={labelKey}
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                // @ts-ignore
                placeholder={value?.[labelKey] || placeholder}
                placeholderStyle={styles.placeholder}
                renderInputSearch={renderInputSearch}
                // @ts-ignore
                renderItem={renderListItem}
                renderRightIcon={() => (
                    <View style={getIconContainerStyle(showErrorStyles)}>
                        <CaretDownIcon color={theme.colors.brand5} />
                    </View>
                )}
                search={withSearch}
                selectedTextStyle={styles.inputText}
                showsVerticalScrollIndicator={false}
                style={getDropdownInputStyle(isDropdownOpen, showErrorStyles)}
                valueField={valueKey}
                //@ts-ignore
                value={value?.[valueKey]}
            />
            <InputError error={error} show={isLiveValidationActive} />
        </View>
    );
};
