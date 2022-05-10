import React, { FC } from "react";
import { Dimensions, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import DogImage from "@/assets/images/test-pup.jpg";
import { Container, HeaderText, Image } from "@/components";
import { RegisterForm } from "@/forms";

import { getContainerStyle, getFooterImageStyle, styles } from "./styles";

export const RegisterScreen: FC = () => {
    const insets = useSafeAreaInsets();
    const screenWidth = Dimensions.get("screen").width;

    return (
        <ScrollView contentContainerStyle={getContainerStyle()}>
            <Container style={styles.contentContainer}>
                <HeaderText>It's time to use</HeaderText>
                <HeaderText style={styles.headerTextAccent}>the W word.</HeaderText>
                <Container style={styles.registerContainer}>
                    <RegisterForm />
                </Container>
            </Container>
            <Image
                aspectRatio={[127, 100]}
                containerStyle={getFooterImageStyle(insets)}
                source={DogImage}
                width={screenWidth}
            />
        </ScrollView>
    );
};
