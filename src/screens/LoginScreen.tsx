import React, { FC, useState } from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useAppDispatch } from "../hooks";
import { screenNames } from "../constants/screens";
import { loginUser } from "../api/auth/index";
import { setUserTokens } from "../redux/thunks";

const LoginScreen: FC = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const [email, setEmail] = useState<string>("test@gmail.com");
    const [password, setPassword] = useState<string>("asd123ASD!");

    const handleSubmit = () => {
        loginUser({ email, password }).then((response) => dispatch(setUserTokens(response)));
    };

    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <Button title="Login" onPress={handleSubmit} />
            <Button
                title="Go to register"
                onPress={() => navigation.navigate(screenNames.REGISTER)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {}
});

export { LoginScreen };
export default LoginScreen;
