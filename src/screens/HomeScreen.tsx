import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";

const HomeScreen: FC = () => {
    return (
        <View style={styles.container}>
            <Text>Home</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {}
});

export { HomeScreen };
export default HomeScreen;
