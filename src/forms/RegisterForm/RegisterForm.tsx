import React, { FC, useEffect, useState } from "react";

import { KmpwApiError, registerUser } from "@/api";
import ArrowRightIcon from "@/assets/svg/arrow-right.svg";
import {
    Alert,
    AlertControl,
    Button,
    Container,
    errorAlertDefaultConfig,
    Link,
    Text
} from "@/components";
import { PRIVACY_POLICY_URL } from "@/constants";
import { Checkbox, PasswordInput, TextInput } from "@/forms";
import { useAppDispatch } from "@/hooks";
import { setShowLoadingOverlay, setUserTokens, useApplicationSelector } from "@/redux";
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
    const { showLoadingOverlay = false } = useApplicationSelector();
    const [alert, setAlert] = useState<AlertControl>({ show: false });
    const [email, setEmail] = useState<FormInputWithError>({ value: "" });
    const [password, setPassword] = useState<FormInputWithError>({ value: "" });
    const [confirmPassword, setConfirmPassword] = useState<FormInputWithError>({ value: "" });
    const [isTosChecked, setIsTosChecked] = useState<FormInputWithError<boolean>>({ value: false });
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

            dispatch(setShowLoadingOverlay(true));
            registerUser({
                email: email.value?.trim() as string,
                password: password?.value?.trim() as string,
                confirmPassword: confirmPassword?.value?.trim() as string
            })
                .then((response) => {
                    dispatch(setShowLoadingOverlay(false));
                    dispatch(setUserTokens(response));
                })
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
                    dispatch(setShowLoadingOverlay(false));
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
                    editable={!showLoadingOverlay}
                    error={email?.error}
                    keyboardType="email-address"
                    label="Email"
                    onChange={(value, error) => setEmail({ error, value })}
                    placeholder="Email"
                    validation={validateEmail}
                    value={email?.value}
                />
                <PasswordInput
                    editable={!showLoadingOverlay}
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
                    editable={!showLoadingOverlay}
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
                <Checkbox
                    isChecked={isTosChecked?.value}
                    label={
                        <Container style={styles.checkboxContainer}>
                            <Text size="xs">I have read and agree to the Woxy</Text>
                            <Link
                                label=" terms of service "
                                labelStyle={styles.link}
                                link={PRIVACY_POLICY_URL}
                                size="xs"
                            />
                            <Text size="xs">and</Text>
                            <Link
                                label=" privacy policy "
                                labelStyle={styles.link}
                                link={PRIVACY_POLICY_URL}
                                size="xs"
                            />
                        </Container>
                    }
                    onPress={(value) => setIsTosChecked({ value })}
                />
                <Button
                    containerStyle={styles.spacer}
                    disabled={showLoadingOverlay}
                    icon={<ArrowRightIcon color={styles.submitIcon.color} />}
                    onPress={handleSubmit}
                    text="Get Started"
                />
            </Container>
        </Container>
    );
};
