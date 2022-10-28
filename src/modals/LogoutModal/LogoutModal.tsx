import React, { FC } from "react";
import { useApolloClient } from "@apollo/client";

import { logoutUser } from "@/api";
import LogoutIcon from "@/assets/svg/logout.svg";
import { BrandHeader, Button, Container, Modal } from "@/components";
import { useAppDispatch } from "@/hooks";
import { clearUser, useUserSelector } from "@/redux";

import { styles } from "./styles";

export interface ILogoutModalProps {
    isVisible: boolean;
    onConfirm: () => void;
    onRequestClose: () => void;
}

export const LogoutModal: FC<ILogoutModalProps> = ({
    isVisible = false,
    onConfirm = () => {},
    onRequestClose = () => {}
}) => {
    const client = useApolloClient();
    const dispatch = useAppDispatch();
    const { accessToken } = useUserSelector();

    const handleLogout = () => {
        onConfirm();

        logoutUser(accessToken)
            .then(() => client.clearStore())
            .catch((error) => {
                //TODO: Handle API errors
                console.log(error);
            })
            .finally(() => {
                dispatch(clearUser());
            });
    };

    return (
        <Modal isVisible={isVisible} onRequestClose={onRequestClose}>
            <BrandHeader content={["Are you sure you want to ", "logout?"]} size="lg" />
            <Container style={styles.actionsRow}>
                <Button onPress={onRequestClose} secondary text="Go back" />
                <Button
                    containerStyle={styles.confirmButton}
                    icon={<LogoutIcon {...styles.icon} />}
                    onPress={handleLogout}
                    text="Logout"
                />
            </Container>
        </Modal>
    );
};
