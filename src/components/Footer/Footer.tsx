import React, { FC } from "react";

import { logoutUser } from "@/api";
import LogoutIcon from "@/assets/svg/logout.svg";
import { Button, Container } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { clearUser } from "@/redux";

import { styles } from "./styles";

export const Footer: FC = () => {
    const dispatch = useAppDispatch();
    const { accessToken } = useAppSelector((state) => state.user);

    const handleLogout = () => {
        logoutUser(accessToken)
            .then(() => dispatch(clearUser()))
            .catch((error) => {
                //TODO: Handle API errors
                console.log(error);
            });
    };

    return (
        <Container style={styles.container}>
            <Button
                icon={<LogoutIcon color={styles.logoutIcon.color} />}
                onPress={handleLogout}
                text="Logout"
            />
            <Button text="Terms &#38; Legal" />
        </Container>
    );
};
