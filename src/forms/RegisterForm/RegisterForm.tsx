import React, { FC, useEffect, useState } from "react";

import { KmpwApiError, registerUser } from "@/api";
import ArrowRightIcon from "@/assets/svg/arrow-right.svg";
import {
    Alert,
    AlertControl,
    Button,
    Container,
    errorAlertDefaultConfig,
    Text
} from "@/components";
import { PasswordInput, TextInput } from "@/forms";
import { useAppDispatch } from "@/hooks";
import { setUserTokens } from "@/redux";
import { FormInputWithError } from "@/types";

import {
    validateConfirmPassword,
    validateEmail,
    validatePassword,
    validateSubmission
} from "./validation";
import { styles } from "./styles";

export const RegisterForm: FC = () => {
    const dispatch = useAppDispatch();
    const [alert, setAlert] = useState<AlertControl>({ show: false });
    const [email, setEmail] = useState<FormInputWithError>({ value: "" });
    const [password, setPassword] = useState<FormInputWithError>({ value: "" });
    const [confirmPassword, setConfirmPassword] = useState<FormInputWithError>({ value: "" });
    const [hasSubmissionBeenAttempted, setHasSubmissionBeenAttempted] = useState<boolean>(false);

    const [hasPasswordBeenFocused, setHasPasswordBeenFocused] = useState<boolean>(false);
    const [hasConfirmPasswordBeenBlurred, setHasConfirmPasswordBeenBlurred] =
        useState<boolean>(false);
    const [enableConfirmPasswordValidation, setEnableConfirmPasswordValidation] =
        useState<boolean>(false);

    const handleSubmit = () => {
        validateSubmission({
            email: email?.value,
            password: password?.value,
            confirmPassword: confirmPassword?.value
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

            registerUser({
                email: email.value?.trim() as string,
                password: password?.value?.trim() as string,
                confirmPassword: confirmPassword?.value?.trim() as string
            })
                .then((response) => dispatch(setUserTokens(response)))
                .catch((error: KmpwApiError) => {
                    const alertConfig: AlertControl = {
                        ...errorAlertDefaultConfig,
                        show: true
                    };

                    if (error?.response?.data) {
                        const { status } = error.response.data;

                        if (status === 409) {
                            alertConfig.body =
                                "It looks like this email is already taken. Please try a different email";
                        }
                    }

                    setAlert(alertConfig);
                });
        });
    };

    useEffect(() => {
        if (hasPasswordBeenFocused && hasConfirmPasswordBeenBlurred) {
            setEnableConfirmPasswordValidation(true);
        }
    }, [hasPasswordBeenFocused, hasConfirmPasswordBeenBlurred]);

    useEffect(() => {
        if (enableConfirmPasswordValidation) {
            setConfirmPassword({
                ...confirmPassword,
                error: validateConfirmPassword(confirmPassword?.value, {
                    password: password?.value
                })
            });
        }
    }, [enableConfirmPasswordValidation, password?.value, confirmPassword?.value]);

    return (
        <Container>
            <Text>
                Let’s get walking! Sign up is easy. Fill out the fields below and you can get
                started right away.
            </Text>
            {alert?.show && alert?.title && (
                <Alert
                    {...alert}
                    isDismissable
                    onDismiss={() => setAlert({ ...alert, show: false })}
                    style={styles.spacer}
                />
            )}
            <Container style={styles.formFieldsContainer}>
                <TextInput
                    autoCapitalize="none"
                    autoComplete="email"
                    error={email?.error}
                    keyboardType="email-address"
                    label="Email"
                    onChange={(value, error) => setEmail({ error, value })}
                    placeholder="Email"
                    validation={validateEmail}
                    value={email?.value}
                />
                <PasswordInput
                    error={password?.error}
                    label="Password"
                    onFocus={() => {
                        if (!hasPasswordBeenFocused) {
                            setHasPasswordBeenFocused(true);
                        }
                    }}
                    onChange={(value, error) => setPassword({ error, value })}
                    placeholder="Password"
                    validation={validatePassword}
                    value={password?.value}
                />
                <PasswordInput
                    error={confirmPassword?.error}
                    forceLiveValidation={enableConfirmPasswordValidation}
                    label="Confirm Password"
                    onBlur={() => {
                        if (!hasConfirmPasswordBeenBlurred) {
                            setHasConfirmPasswordBeenBlurred(true);
                        }
                    }}
                    onChange={(value) => setConfirmPassword({ ...confirmPassword, value })}
                    placeholder="Confirm Password"
                    value={confirmPassword?.value}
                />
                <Button
                    containerStyle={styles.spacer}
                    icon={<ArrowRightIcon color={styles.submitIcon.color} />}
                    onPress={handleSubmit}
                    text="Get Started"
                />
            </Container>
        </Container>
    );
};
