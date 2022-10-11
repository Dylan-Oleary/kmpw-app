import React, { FC } from "react";
import { useApolloClient } from "@apollo/client";

import { logoutUser } from "@/api";
import LogoutIcon from "@/assets/svg/logout.svg";
import { Button, Container } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { clearUser, setShowLoadingOverlay } from "@/redux";

import { styles } from "./styles";

export const Footer: FC = () => {
    const client = useApolloClient();
    const dispatch = useAppDispatch();
    const { accessToken } = useAppSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(setShowLoadingOverlay(true));

        logoutUser(accessToken)
            .then(() => client.clearStore())
            .catch((error) => {
                //TODO: Handle API errors
                console.log(error);
            })
            .finally(() => {
                dispatch(setShowLoadingOverlay(false));
                dispatch(clearUser());
            });
    };

    return (
        <Container style={styles.container}>
            <Button
                containerStyle={styles.button}
                icon={<LogoutIcon {...styles.logoutIcon} />}
                onPress={handleLogout}
                text="Logout"
                textStyle={styles.buttonText}
            />
        </Container>
    );
};
