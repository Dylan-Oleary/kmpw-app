import React, { FC, useState } from "react";

import { loginUser } from "@/api";
import ArrowRightIcon from "@/assets/svg/arrow-right.svg";
import { Button, Container, Text } from "@/components";
import { theme } from "@/constants";
import { useAppDispatch } from "@/hooks";
import { TextInput } from "@/forms";
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
                    onChangeText={setEmail}
                    placeholder="Email"
                    value={email}
                />
                <TextInput
                    autoCapitalize="none"
                    autoComplete="password"
                    containerStyle={{ marginTop: theme.spacing[3] }}
                    onChangeText={setPassword}
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
