import React, { FC } from "react";
import { Dimensions, ScrollView } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Container, HeaderText, Image } from "../../components";
import { RegisterForm } from "../../forms";
import { styles } from "./styles";
// import { UnauthorizedStackParams } from "../../navigation";

import DogImage from "../../assets/images/test-pup.jpg";

const RegisterScreen: FC = () => {
    // const { navigate } = useNavigation<NativeStackNavigationProp<UnauthorizedStackParams>>();
    const screenWidth = Dimensions.get("screen").width;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Container style={styles.contentContainer}>
                <HeaderText>It's time to use</HeaderText>
                <HeaderText style={styles.headerTextAccent}>the W word.</HeaderText>
                <Container style={styles.registerContainer}>
                    <RegisterForm />
                </Container>
            </Container>
            <Image aspectRatio={[127, 100]} source={DogImage} width={screenWidth} />
        </ScrollView>
    );
};

export { RegisterScreen };
export default RegisterScreen;
