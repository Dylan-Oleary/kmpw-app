import React, { FC } from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useGetUserQuery } from "@/api";
import DogImage from "@/assets/images/test-pup.jpg";
import { BrandHeader, Container, DogList, Footer, Image, Text, WeatherBanner } from "@/components";
import { DogForm } from "@/forms";
import { buildGeolocationString } from "@/lib";
import { HomeStackNavigationProp } from "@/navigation";
import { useLocationSelector } from "@/redux";
import { globalStyles, screenWidth } from "@/styles";

import { styles } from "./styles";

export const HomeScreen: FC = () => {
    const { navigate } = useNavigation<HomeStackNavigationProp>();
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
                    <BrandHeader content={["Let's get ", "barking."]} size="2xl" />
                    <Text style={styles.headerBodyText}>
                        Check out your pups below and let’s see if the weather is pawsome.
                    </Text>
                </Container>
                <Container>
                    <Image aspectRatio={[16, 8]} source={DogImage} width={screenWidth} />
                </Container>
                {!loading && user && (
                    <Container style={styles.contentContainer}>
                        {(user?.dogs || []).length > 0 ? (
                            <DogList dogs={user?.dogs || []} loading={loading} />
                        ) : (
                            <DogForm
                                onSubmit={(data) => navigate("ConfirmAddOrEditDog", { data })}
                            />
                        )}
                    </Container>
                )}
            </ScrollView>
            <Footer />
        </Container>
    );
};
