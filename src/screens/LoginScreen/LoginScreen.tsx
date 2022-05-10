import React, { FC } from "react";
import { Dimensions, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button, Container, HeaderText, Image, Text } from "@/components";
import { UNAUTHORIZED_SCREEN_NAMES } from "@/constants";
import { LoginForm } from "@/forms";
import { UnauthorizedStackParams } from "@/navigation";

import DogImage from "@/assets/images/test-pup.jpg";
import ArrowRightIcon from "@/assets/svg/arrow-right.svg";

import { getContainerStyle, getFooterContainerStyle, styles } from "./styles";

export const LoginScreen: FC = () => {
    const insets = useSafeAreaInsets();
    const { navigate } = useNavigation<NativeStackNavigationProp<UnauthorizedStackParams>>();
    const screenWidth = Dimensions.get("screen").width;

    return (
        <ScrollView contentContainerStyle={getContainerStyle(insets)}>
            <Container style={styles.contentContainer}>
                <HeaderText>Those paws</HeaderText>
                <HeaderText>
                    were <HeaderText style={styles.headerTextAccent}>made for</HeaderText>
                </HeaderText>
                <HeaderText style={styles.headerTextAccent}>walking.</HeaderText>
                <Container style={styles.loginContainer}>
                    <LoginForm />
                </Container>
            </Container>
            <Image aspectRatio={[16, 8]} source={DogImage} width={screenWidth} />
            <Container style={getFooterContainerStyle(insets)}>
                <HeaderText style={styles.footerText}>Looking to get</HeaderText>
                <HeaderText style={styles.footerText}>started?</HeaderText>
                <Text style={[styles.footerText, styles.footerCopy]}>
                    It takes 2 minutes to sign up, and let’s you save multiple pups and gain
                    additional features.
                </Text>
                <Button
                    containerStyle={styles.registerButtonContainer}
                    icon={<ArrowRightIcon color={styles.footerText.color} />}
                    onPress={() => navigate(UNAUTHORIZED_SCREEN_NAMES.REGISTER)}
                    secondary
                    text="Register Today"
                />
            </Container>
        </ScrollView>
    );
};
