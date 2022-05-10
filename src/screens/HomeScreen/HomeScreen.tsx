import React, { FC } from "react";
import { ScrollView } from "react-native";

import { useGetUserQuery } from "@/api";
import DogImage from "@/assets/images/test-pup.jpg";
import { Container, DogList, Footer, HeaderText, Image, Text, WeatherBanner } from "@/components";
import { buildGeolocationString } from "@/lib";
import { useLocationSelector } from "@/redux";
import { globalStyles, screenWidth } from "@/styles";

import { styles } from "./styles";

export const HomeScreen: FC = () => {
    const { location, requestTimestamp } = useLocationSelector();
    const { loading, user } = useGetUserQuery(
        buildGeolocationString(location?.latitude, location?.longitude)
    );

    return (
        <Container style={globalStyles.defaultFlex}>
            <WeatherBanner
                lastUpdatedTimestamp={requestTimestamp}
                loading={loading}
                weather={user?.weather}
            />
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
                <DogList
                    dogs={user?.dogs || []}
                    loading={loading}
                    style={[styles.contentContainer]}
                />
            </ScrollView>
            <Footer />
        </Container>
    );
};
