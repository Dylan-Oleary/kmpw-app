import React, { FC, useState } from "react";

import { useAppDispatch } from "../../hooks";
import { Button, Container, Text } from "../../components";
import { TextInput } from "../../forms";
import { loginUser } from "../../api/auth/index";
import { setUserTokens } from "../../redux/thunks";
import { styles } from "./styles";
import { theme } from "../../constants";

import ArrowRightIcon from "../../assets/svg/arrow-right.svg";

export const RegisterForm: FC = () => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleSubmit = () => {
        loginUser({ email, password }).then((response) => dispatch(setUserTokens(response)));
    };

    return (
        <Container>
            <Text>
                Let’s get walking! Sign up is easy. Fill out the fields below and you can get
                started right away.
            </Text>
            <Container style={styles.formFieldsContainer}>
                <TextInput
                    autoComplete="email"
                    onChangeText={setEmail}
                    placeholder="Email"
                    value={email}
                />
                <TextInput
                    autoComplete="password"
                    containerStyle={{ marginTop: theme.spacing[3] }}
                    onChangeText={setPassword}
                    placeholder="Password"
                    value={password}
                />
                <TextInput
                    autoComplete="password"
                    containerStyle={{ marginTop: theme.spacing[3] }}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                />
                <Button
                    containerStyle={styles.submitButtonContainer}
                    icon={<ArrowRightIcon color={styles.submitIcon.color} />}
                    onPress={handleSubmit}
                    text="Get Started"
                />
            </Container>
        </Container>
    );
};
