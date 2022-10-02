import React, { FC } from "react";
import { ScrollView } from "react-native";

import DogImage from "@/assets/images/test-pup.jpg";
import { BrandHeader, Container, Image } from "@/components";
import { RegisterForm } from "@/forms";
import { screenWidth } from "@/styles";

import { getContainerStyle, styles } from "./styles";

export const RegisterScreen: FC = () => (
    <ScrollView contentContainerStyle={getContainerStyle()}>
        <Container style={styles.contentContainer}>
            <BrandHeader content={["It's time to use ", "the W word."]} />
            <Container style={styles.registerContainer}>
                <RegisterForm />
            </Container>
        </Container>
        <Image
            aspectRatio={[16, 8]}
            containerStyle={styles.footerImage}
            source={DogImage}
            width={screenWidth}
        />
    </ScrollView>
);
