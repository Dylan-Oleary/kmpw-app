import React, { FC } from "react";

import { logoutUser } from "../../api/auth";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { clearUser } from "../../redux/thunks";
import { Button, Container } from "../index";
import LogoutIcon from "../../assets/svg/logout.svg";
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
