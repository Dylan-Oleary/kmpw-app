import React, { FC, useRef, useState } from "react";
import { Platform, StyleProp, ViewStyle } from "react-native";
import { isValueOfType } from "@theonlydevsever/utilities";
import dayjs from "dayjs";

import { useGetBreedsQuery } from "@/api/graphql";
import ArrowRightIcon from "@/assets/svg/arrow-right.svg";
import { Alert, AlertControl, BrandHeader, Button, Container } from "@/components";
import { DateInput, EmptyBreedList, ImageUploader, SelectDropdown, TextInput } from "@/forms";
import { convertDateToStartOfDay, removeAllNonDigits } from "@/lib";
import { Breed, Dog, DogFormSubmission, FormInputWithError } from "@/types";

import {
    minimumPossibleBirthday,
    validateBirthday,
    validateBreed,
    validateName,
    validateSubmission,
    validateWeight
} from "./validation";
import { styles } from "./styles";

// TODO: Handle Breeds Query Error from API
// TODO: Type generics for dropdown

export interface DogFormProps {
    dog?: Dog;
    onSubmit: (data: DogFormSubmission, id?: string) => void;
    style?: StyleProp<ViewStyle>;
}

export const DogForm: FC<DogFormProps> = ({ dog, onSubmit, style }) => {
    const isEditForm = useRef<boolean>(isValueOfType(dog, "object"));
    const [alert, setAlert] = useState<AlertControl>({ show: false });
    const { breeds } = useGetBreedsQuery();
    const [name, setName] = useState<FormInputWithError>({ value: dog?.name || "" });
    const [breed, setBreed] = useState<FormInputWithError<Breed>>({ value: dog?.breed });
    const [weightImperial, setWeightImperial] = useState<FormInputWithError>({
        value: dog?.weightImperial ? String(dog?.weightImperial) : ""
    });
    const [birthday, setBirthday] = useState<FormInputWithError<Date>>({
        value: dog?.birthday ? dayjs(dog.birthday).toDate() : undefined
    });
    const [hasSubmissionBeenAttempted, setHasSubmissionBeenAttempted] = useState<boolean>(false);

    const handleSubmit = () => {
        validateSubmission({
            birthday: birthday?.value,
            breed: breed?.value,
            name: name?.value,
            weightImperial: weightImperial?.value
        }).then(([isReadyToSubmit, errors]) => {
            if (!hasSubmissionBeenAttempted) setHasSubmissionBeenAttempted(true);

            if (!isReadyToSubmit) {
                const singleError = errors.length === 1;

                setAlert({
                    messageList: errors,
                    show: true,
                    theme: "error",
                    title: `There ${singleError ? "is" : "are"} ${errors.length} error${
                        singleError ? "" : "s"
                    }`
                });

                return;
            }

            onSubmit?.(
                {
                    birthday: birthday?.value,
                    breed: breed?.value as Breed,
                    name: name?.value as string,
                    weightImperial: Number(weightImperial?.value) as number
                },
                dog?.id
            );
        });
    };

    return (
        <Container style={style}>
            <BrandHeader
                content={[`${isEditForm.current ? "Update" : "Add"} your `, "pup."]}
                size="base"
            />
            {alert?.show && alert?.title && (
                <Alert
                    isDismissable
                    messageList={alert?.messageList}
                    onDismiss={() => setAlert({ ...alert, show: false })}
                    style={styles.spacer}
                    theme={alert?.theme}
                    title={alert?.title}
                />
            )}
            <Container style={styles.spacer}>
                <ImageUploader style={styles.imageUploader} />
                <TextInput
                    autoCapitalize="words"
                    error={name?.error}
                    forceLiveValidation={hasSubmissionBeenAttempted}
                    label="Name"
                    onChange={(value, error) => setName({ error, value })}
                    placeholder="Name"
                    validation={validateName}
                    value={name?.value}
                />
                <SelectDropdown
                    data={breeds}
                    emptyListComponent={EmptyBreedList}
                    error={breed?.error}
                    forceLiveValidation={hasSubmissionBeenAttempted}
                    label="Breed"
                    labelKey="name"
                    //@ts-ignore
                    onChange={(value, error) => setBreed({ error, value })}
                    placeholder="Breed"
                    //@ts-ignore
                    validation={validateBreed}
                    //@ts-ignore
                    value={breed?.value}
                    valueKey="id"
                    withSearch
                />
                <TextInput
                    error={weightImperial?.error}
                    forceLiveValidation={hasSubmissionBeenAttempted}
                    keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
                    label="Weight"
                    onChange={(value, error) => setWeightImperial({ error, value })}
                    placeholder="Weight"
                    postFix="lbs"
                    sanititize={removeAllNonDigits}
                    validation={validateWeight}
                    value={weightImperial?.value}
                />
                <DateInput
                    error={birthday?.error}
                    forceLiveValidation={hasSubmissionBeenAttempted}
                    label="Birthday (optional)"
                    minimumDate={minimumPossibleBirthday}
                    placeholder="Birthday"
                    onConfirm={(value, error) => setBirthday({ error, value })}
                    sanititize={convertDateToStartOfDay}
                    validation={validateBirthday}
                    value={birthday?.value}
                />
                <Button
                    containerStyle={styles.spacer}
                    icon={<ArrowRightIcon color={styles.submitIcon.color} />}
                    onPress={handleSubmit}
                    text="Looks good"
                />
            </Container>
        </Container>
    );
};
