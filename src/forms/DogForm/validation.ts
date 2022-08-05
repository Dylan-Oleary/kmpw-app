import dayjs from "dayjs";
import { isValueOfType } from "@theonlydevsever/utilities";

import { DATE_FORMATS } from "@/constants";
import { Breed, DogFormSubmission, FormInputValidator, GraphQlDogMutationData } from "@/types";

export const buildDogMutationData: (data: DogFormSubmission) => GraphQlDogMutationData = (data) => {
    const { birthday, breed, name, profilePicture, weightImperial } = data;
    const mutationData: GraphQlDogMutationData = {
        birthday: isValueOfType(birthday, "date")
            ? dayjs(birthday).format(DATE_FORMATS.DATE_TIME)
            : undefined,
        breedId: breed?.id,
        name,
        profilePicture,
        weightImperial
    };

    return mutationData;
};

export const minimumPossibleBirthday = dayjs("1980-01-01").toDate();

export const validateBirthday: FormInputValidator<Date> = (value) => {
    if (value) {
        if (!isValueOfType(value, "date")) {
            return "Birthday must be a valid date";
        }

        if (dayjs(minimumPossibleBirthday).isAfter(value)) {
            return "Birthday must be after January 1, 1980";
        }

        if (dayjs(value).isAfter(dayjs())) {
            return "Birthday cannot be in the future";
        }
    }

    return undefined;
};

export const validateBreed: FormInputValidator<Breed> = (value) => {
    if (!value) {
        return "Breed is required";
    }

    return undefined;
};

export const validateName: FormInputValidator = (value = "") => {
    if (value?.trim().length === 0) {
        return "Name is required";
    }

    if (value?.trim().length > 50) {
        return "Name cannot be more than 50 characters";
    }

    return undefined;
};

export const validateWeight: FormInputValidator = (value = "") => {
    if (Number(value) === 0) {
        return "Weight is required";
    }

    if (Number(value) > 900) {
        return "Maximum weight is 900";
    }

    return undefined;
};

export const validateSubmission: (submission: {
    birthday?: Date;
    breed?: Breed;
    name?: string;
    weightImperial?: string;
}) => Promise<[boolean, string[]]> = ({ birthday, breed, name, weightImperial }) =>
    Promise.all([
        validateName(name),
        validateBreed(breed),
        validateWeight(weightImperial),
        validateBirthday(birthday)
    ]).then((validationResults) => [
        !validationResults.some((result) => typeof result === "string"),
        validationResults.filter((result) => isValueOfType(result, "string")) as string[]
    ]);
