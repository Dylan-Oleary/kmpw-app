import React, { FC, useState } from "react";

import { KmpwApiError, loginUser } from "@/api";
import ArrowRightIcon from "@/assets/svg/arrow-right.svg";
import {
    Alert,
    AlertControl,
    Button,
    Container,
    errorAlertDefaultConfig,
    Text
} from "@/components";
import { useAppDispatch } from "@/hooks";
import { PasswordInput, TextInput } from "@/forms";
import { setUserTokens, setShowLoadingOverlay, useApplicationSelector } from "@/redux";

import { styles } from "./styles";

export const LoginForm: FC = () => {
    const dispatch = useAppDispatch();
    const { showLoadingOverlay = false } = useApplicationSelector();
    const [alert, setAlert] = useState<AlertControl>({ show: false });
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = () => {
        dispatch(setShowLoadingOverlay(true));

        loginUser({ email, password })
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

                    switch (status) {
                        case 401:
                        case 404:
                            alertConfig.body =
                                "The email and/or password you have enteredis incorrect.";
                            break;
                        default:
                            break;
                    }
                }

                setAlert(alertConfig);
                dispatch(setShowLoadingOverlay(false));
            });
    };

    return (
        <Container>
            <Text>Use your credentials to sign in below.</Text>
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
                    keyboardType="email-address"
                    label="Email"
                    onChange={(value) => setEmail(value as string)}
                    placeholder="Email"
                    value={email}
                />
                <PasswordInput
                    editable={!showLoadingOverlay}
                    label="Password"
                    onChange={(value) => setPassword(value as string)}
                    placeholder="Password"
                    value={password}
                />
                <Button
                    containerStyle={styles.spacer}
                    disabled={showLoadingOverlay}
                    icon={<ArrowRightIcon color={styles.submitIcon.color} />}
                    onPress={handleSubmit}
                    text="Grab Your Leash"
                />
            </Container>
        </Container>
    );
};
