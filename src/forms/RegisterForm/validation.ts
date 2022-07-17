import { isValueOfType } from "@theonlydevsever/utilities";

import { isValidEmail } from "@/lib";
import { FormInputValidator } from "@/types";

export const validateConfirmPassword: FormInputValidator<string, { password?: string }> = (
    value = "",
    { password = "" } = { password: "" }
) => {
    if (!value || value?.trim() === "") {
        return "Confirm Password is required";
    }

    if (value !== password) {
        return "Passwords must match";
    }

    return undefined;
};

export const validateEmail: FormInputValidator = (value = "") => {
    if (!value || value?.trim() === "") {
        return "Email is required";
    }

    if (value?.trim().length > 100) {
        return "Email cannot be more than 100 characters";
    }

    if (!isValidEmail(value)) {
        return "Email is invalid";
    }

    return undefined;
};

export const validatePassword: FormInputValidator = (value = "") => {
    if (!value || value?.trim() === "") {
        return "Password is required";
    }

    if (value?.trim().length < 8 || value?.trim().length > 50) {
        return "Password must be between 8 and 50 characters";
    }

    return undefined;
};

export const validateSubmission: (submission: {
    email?: string;
    password?: string;
    confirmPassword?: string;
}) => Promise<[boolean, string[]]> = ({ email, password, confirmPassword }) =>
    Promise.all([
        validateEmail(email),
        validatePassword(password),
        validateConfirmPassword(confirmPassword, { password })
    ]).then((validationResults) => [
        !validationResults.some((result) => typeof result === "string"),
        validationResults.filter((result) => isValueOfType(result, "string")) as string[]
    ]);
