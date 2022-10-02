import React, { FC } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import DogImage from "@/assets/images/test-pup.jpg";
import { BrandHeader, Container, Image } from "@/components";
import { RegisterForm } from "@/forms";
import { screenWidth } from "@/styles";

import { getContainerStyle, getFooterImageStyle, styles } from "./styles";

export const RegisterScreen: FC = () => {
    const insets = useSafeAreaInsets();

    return (
        <ScrollView contentContainerStyle={getContainerStyle()}>
            <Container style={styles.contentContainer}>
                <BrandHeader content={["It's time to use ", "the W word."]} />
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
