import React, { FC, useState } from "react";

import { loginUser } from "@/api";
import ArrowRightIcon from "@/assets/svg/arrow-right.svg";
import { Button, Container, Text } from "@/components";
import { PasswordInput, TextInput } from "@/forms";
import { useAppDispatch } from "@/hooks";
import { setUserTokens } from "@/redux";

import { styles } from "./styles";

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
                    label="Email"
                    onChangeText={setEmail}
                    placeholder="Email"
                    value={email}
                />
                <PasswordInput
                    label="Password"
                    onChangeText={setPassword}
                    placeholder="Password"
                    value={password}
                />
                <PasswordInput
                    label="Confirm Password"
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
