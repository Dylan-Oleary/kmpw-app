import React, { FC, useState } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useApolloClient } from "@apollo/client";

import { deleteUser } from "@/api";
import TrashOutlineIcon from "@/assets/svg/trash-outline.svg";
import {
    Alert,
    AlertControl,
    BrandHeader,
    Button,
    Container,
    errorAlertDefaultConfig,
    HeaderText,
    Text
} from "@/components";
import { TextInput } from "@/forms";
import { useAppDispatch } from "@/hooks";
import { clearUser, setShowLoadingOverlay, useUserSelector } from "@/redux";

import { getContainerStyle, styles } from "./styles";

const DELETE_ACCOUNT_VALIDATION_STRING = "Bark";

export const DeleteAccountScreen: FC = () => {
    const dispatch = useAppDispatch();
    const client = useApolloClient();
    const { goBack } = useNavigation();
    const insets = useSafeAreaInsets();
    const { accessToken } = useUserSelector();
    const [errorAlert, setErrorAlert] = useState<AlertControl>({ show: false });
    const [inputValue, setInputValue] = useState<string>("");
    const [isDeleteButtonDisabled, setIsDeleteButtonDisabled] = useState<boolean>(
        inputValue !== DELETE_ACCOUNT_VALIDATION_STRING
    );

    const handleInputChange: (value: string) => void = (value = "") => {
        if (value === DELETE_ACCOUNT_VALIDATION_STRING) {
            setIsDeleteButtonDisabled(false);
        } else if (!isDeleteButtonDisabled) {
            setIsDeleteButtonDisabled(true);
        }

        setInputValue(value);
    };

    const handleDelete: () => void = () => {
        dispatch(setShowLoadingOverlay(true));

        deleteUser(accessToken)
            .then(() => {
                client.clearStore();
                dispatch(clearUser());
            })
            .catch(() => {
                setErrorAlert({ ...errorAlertDefaultConfig, show: true });
            })
            .finally(() => {
                dispatch(setShowLoadingOverlay(false));
            });
    };

    return (
        <Container style={getContainerStyle(insets)}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <BrandHeader content={["Delete ", "your account"]} size="2xl" />
                <Alert
                    body="This action is permanent and cannot be undone."
                    style={styles.alert}
                    theme="warning"
                    title="Woof!"
                />
                {errorAlert?.show && (
                    <Alert
                        isDismissable
                        onDismiss={() => setErrorAlert({ ...errorAlert, show: false })}
                        style={styles.alert}
                        {...errorAlert}
                    />
                )}
                <Container style={styles.verticalSpace}>
                    <Text size="base">
                        Enter{" "}
                        <HeaderText size="base" style={styles.accentText}>
                            {DELETE_ACCOUNT_VALIDATION_STRING}
                        </HeaderText>{" "}
                        to delete your account.
                    </Text>
                    <TextInput
                        containerStyle={styles.inputContainer}
                        onChange={(value) => handleInputChange(value as string)}
                        value={inputValue}
                    />
                </Container>
                <Container style={styles.actionsRow}>
                    <Button onPress={() => goBack()} secondary text="Go back" />
                    <Button
                        containerStyle={styles.confirmButton}
                        disabled={isDeleteButtonDisabled}
                        icon={<TrashOutlineIcon {...styles.icon} />}
                        key={isDeleteButtonDisabled ? "disabled" : "enabled"}
                        onPress={handleDelete}
                        text="Delete account"
                    />
                </Container>
            </ScrollView>
        </Container>
    );
};
