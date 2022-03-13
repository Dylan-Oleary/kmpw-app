import React, { FC } from "react";
import { Dimensions, ScrollView } from "react-native";

import { styles } from "./styles";
import {
    Button,
    Container,
    DogCard,
    Footer,
    HeaderText,
    Image,
    Text,
    WeatherBanner
} from "../../components";
import PlusIcon from "../../assets/svg/plus.svg";
import DogImage from "../../assets/images/test-pup.jpg";

export const HomeScreen: FC = () => {
    const screenWidth = Dimensions.get("screen").width;

    return (
        <Container style={styles.container}>
            <WeatherBanner />
            <ScrollView>
                <Container style={styles.headerContainer}>
                    <HeaderText size="2xl">
                        Let's get{" "}
                        <HeaderText size="2xl" style={styles.headerTextAccent}>
                            barking.
                        </HeaderText>
                    </HeaderText>
                    <Text style={styles.headerBodyText}>
                        Check out your pups below and let’s see if the weather is pawsome.
                    </Text>
                </Container>
                <Container>
                    <Image aspectRatio={[16, 8]} source={DogImage} width={screenWidth} />
                </Container>
                <Container style={styles.dogListContainer}>
                    <HeaderText size="base">
                        Your walking{" "}
                        <HeaderText size="base" style={styles.headerTextAccent}>
                            buddies.
                        </HeaderText>
                    </HeaderText>
                    <Container style={styles.dogList}>
                        <DogCard />
                        <DogCard style={styles.dogCardNthItem} />
                    </Container>
                    <Button
                        containerStyle={styles.addDogButtonContainer}
                        icon={<PlusIcon color={styles.addDogIcon.color} />}
                        onPress={() => console.info("Pressed!")}
                        text="Add a New Buddy"
                    />
                </Container>
                <Footer />
            </ScrollView>
        </Container>
    );
};
