import React, { FC } from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { screenNames } from "../constants/screens";

const LoginScreen: FC = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text>Login</Text>
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
