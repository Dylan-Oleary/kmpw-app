import React, { FC, useState } from "react";

import { useAppDispatch } from "../../hooks";
import { Button, Container, Text } from "../../components";
import { TextInput } from "../../forms";
import { loginUser } from "../../api/auth/index";
import { setUserTokens } from "../../redux/thunks";
import { styles } from "./styles";
import { theme } from "../../constants";
import ArrowRightIcon from "../../assets/svg/arrow-right.svg";

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
