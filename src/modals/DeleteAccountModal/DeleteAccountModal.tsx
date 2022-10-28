import React, { FC } from "react";

import TrashOutlineIcon from "@/assets/svg/trash-outline.svg";
import { Alert, BrandHeader, Button, Container, Modal } from "@/components";
import { useAppDispatch } from "@/hooks";
import { setShowLoadingOverlay } from "@/redux";

import { styles } from "./styles";

export interface IDeleteAccountModalProps {
    isVisible: boolean;
    onRequestClose: () => void;
}

export const DeleteAccountModal: FC<IDeleteAccountModalProps> = ({
    isVisible = false,
    onRequestClose = () => {}
}) => {
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        dispatch(setShowLoadingOverlay(true));

        // logoutUser(accessToken)
        //     .then(() => client.clearStore())
        //     .catch((error) => {
        //         //TODO: Handle API errors
        //         console.log(error);
        //     })
        //     .finally(() => {
        //         dispatch(setShowLoadingOverlay(false));
        //         dispatch(clearUser());
        //     });
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
