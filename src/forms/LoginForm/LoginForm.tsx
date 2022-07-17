import React, { FC, useState } from "react";

import { loginUser } from "@/api";
import ArrowRightIcon from "@/assets/svg/arrow-right.svg";
import { Button, Container, Text } from "@/components";
import { useAppDispatch } from "@/hooks";
import { PasswordInput, TextInput } from "@/forms";
import { setUserTokens } from "@/redux";

import { styles } from "./styles";

export const LoginForm: FC = () => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = () => {
        loginUser({ email, password }).then((response) => dispatch(setUserTokens(response)));
    };

    return (
        <Container>
            <Text>Use your credentials to sign in below.</Text>
            <Container style={styles.formFieldsContainer}>
                <TextInput
                    autoCapitalize="none"
                    autoComplete="email"
                    keyboardType="email-address"
                    label="Email"
                    onChange={(value) => setEmail(value as string)}
                    placeholder="Email"
                    value={email}
                />
                <PasswordInput
                    label="Password"
                    onChange={(value) => setPassword(value as string)}
                    placeholder="Password"
                    value={password}
                />
                <Button
                    containerStyle={styles.submitButtonContainer}
                    icon={<ArrowRightIcon color={styles.submitIcon.color} />}
                    onPress={handleSubmit}
                    text="Grab Your Leash"
                />
            </Container>
        </Container>
    );
};
