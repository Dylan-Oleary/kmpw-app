import React, { FC, useState } from "react";
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
    Modal
} from "@/components";
import { useAppDispatch } from "@/hooks";
import { clearUser, setShowLoadingOverlay, useUserSelector } from "@/redux";

import { styles } from "./styles";

export interface IDeleteAccountModalProps {
    isVisible: boolean;
    onRequestClose: () => void;
}

export const DeleteAccountModal: FC<IDeleteAccountModalProps> = ({
    isVisible = false,
    onRequestClose = () => {}
}) => {
    const client = useApolloClient();
    const dispatch = useAppDispatch();
    const { accessToken } = useUserSelector();
    const [errorAlert, setErrorAlert] = useState<AlertControl>({ show: false });

    const handleDelete = () => {
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
        <Modal isVisible={isVisible} onRequestClose={onRequestClose}>
            <BrandHeader
                content={["Are you sure you want to ", "delete your account?"]}
                size="lg"
            />
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
            <Container style={styles.actionsRow}>
                <Button onPress={onRequestClose} secondary text="Go back" />
                <Button
                    containerStyle={styles.confirmButton}
                    icon={<TrashOutlineIcon {...styles.icon} />}
                    onPress={handleDelete}
                    text="Delete account"
                />
            </Container>
        </Modal>
    );
};
