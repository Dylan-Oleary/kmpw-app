import React, { FC, ReactNode, useEffect, useState } from "react";
import { LayoutChangeEvent, Platform, StyleProp, TouchableOpacity, ViewStyle } from "react-native";

import ArrowRightIcon from "@/assets/svg/arrow-right.svg";
import { useGetBreedsQuery } from "@/api";
import { Button, Container, Modal } from "@/components";
import { EmptyBreedList, SelectDropdown, TextInput } from "@/forms";
import { Breed, FormInputValidator } from "@/types";

import { getDropdownListStyles, styles } from "./styles";

export interface BreedInputProps {
    containerStyle?: StyleProp<ViewStyle>;
    error?: string;
    forceLiveValidation?: boolean;
    label?: string;
    onConfirm: (newBreed: Breed, error?: string) => void;
    placeholder?: string;
    postFix?: string | JSX.Element | ReactNode;
    preFix?: string | JSX.Element | ReactNode;
    sanititize?: (value: Breed) => Breed;
    validation?: FormInputValidator<Breed>;
    value?: Breed;
}

export const BreedInput: FC<BreedInputProps> = ({
    containerStyle,
    error,
    forceLiveValidation = false,
    label = "Breed",
    onConfirm,
    placeholder = "Breed",
    postFix,
    preFix,
    sanititize,
    validation,
    value
}) => {
    const { breeds } = useGetBreedsQuery();
    const [selectedBreed, setSelectedBreed] = useState<Breed | null>(value || null);
    const [isLiveValidationActive, setIsLiveValidationActive] =
        useState<boolean>(forceLiveValidation);
    const [isBreedSelectModalOpen, setIsBreedSelectModalOpen] = useState<boolean>(false);
    const [dropdownListStyle, setDropdownListStyle] = useState<StyleProp<ViewStyle>>(
        getDropdownListStyles()
    );

    const handleConfirm: (value: Breed) => void = (value) => {
        if (!isLiveValidationActive) setIsLiveValidationActive(true);

        const breed = sanitizeValue(value);

        onConfirm?.(breed, validation ? validation(breed) : undefined);
        setIsBreedSelectModalOpen(false);
    };

    const onSelectMount: (event: LayoutChangeEvent) => void = ({
        nativeEvent: {
            layout: { height }
        }
    }) => setDropdownListStyle(getDropdownListStyles(height));

    const sanitizeValue: (value: Breed) => Breed = (value) =>
        sanititize ? sanititize(value) : value;

    useEffect(() => {
        if (forceLiveValidation && !isLiveValidationActive) {
            setIsLiveValidationActive(true);
        }
    }, [forceLiveValidation]);

    return (
        <>
            <TouchableOpacity activeOpacity={1} onPress={() => setIsBreedSelectModalOpen(true)}>
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
                            setIsBreedSelectModalOpen(true);
                        }
                    }}
                    placeholder={placeholder}
                    postFix={postFix}
                    preFix={preFix}
                    value={value?.name}
                />
            </TouchableOpacity>
            <Modal
                contentContainerStyle={styles.modal}
                isVisible={isBreedSelectModalOpen}
                onRequestClose={() => setIsBreedSelectModalOpen(false)}
            >
                <SelectDropdown
                    containerStyle={styles.selector}
                    data={breeds}
                    emptyListComponent={EmptyBreedList}
                    label="Select a breed"
                    labelKey="name"
                    listContainerStyle={dropdownListStyle}
                    //@ts-ignore
                    onChange={(value: Breed) => setSelectedBreed(value)}
                    onLayout={onSelectMount}
                    placeholder="Breed"
                    //@ts-ignore
                    validation={validation}
                    //@ts-ignore
                    value={selectedBreed}
                    valueKey="id"
                    withSearch
                />
                <Container style={styles.actionsRow}>
                    <Button
                        icon={<ArrowRightIcon color={styles.submitIcon.color} />}
                        onPress={() =>
                            //@ts-ignore
                            handleConfirm(selectedBreed)
                        }
                        text="Looks good"
                    />
                </Container>
            </Modal>
        </>
    );
};
