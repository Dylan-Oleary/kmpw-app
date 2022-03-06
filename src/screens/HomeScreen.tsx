import React, { FC } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

import { logoutUser } from "../api/auth";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { clearUser } from "../redux/thunks";

const HomeScreen: FC = () => {
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
        <View style={styles.container}>
            <Text>Home</Text>
            <Button title="Log Out" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {}
});

export { HomeScreen };
export default HomeScreen;
