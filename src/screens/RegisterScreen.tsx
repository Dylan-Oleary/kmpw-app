import React, { FC } from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { screenNames } from "../constants/screens";

const RegisterScreen: FC = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text>Register</Text>
            <Button title="Back to login" onPress={() => navigation.navigate(screenNames.LOGIN)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {}
});

export { RegisterScreen };
export default RegisterScreen;
