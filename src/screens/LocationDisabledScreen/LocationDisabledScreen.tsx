import React, { FC } from "react";
import { ImageBackground } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import DogImage from "@/assets/images/beach-pup.jpg";
import ArrowRightIcon from "@/assets/svg/arrow-right.svg";
import { BrandHeader, Button, Container, Footer, FullScreenLoader } from "@/components";
import { openNativeAppSettings } from "@/lib";
import { useLocationSelector } from "@/redux";

import { getContainerStyle, getFooterContainerStyle, styles } from "./styles";

export const LocationDisabledScreen: FC = () => {
    const insets = useSafeAreaInsets();
    const { isFetchingLocation } = useLocationSelector();

    return (
        <FullScreenLoader isLoading={isFetchingLocation}>
            <Container style={styles.wrapperContainer}>
                <ImageBackground
                    resizeMode="cover"
                    style={styles.backgroundImage}
                    source={DogImage}
                >
                    <Container style={[getContainerStyle(insets), styles.transparentBackground]}>
                        <BrandHeader
                            content={[
                                "Woxy ",
                                "uses your location to determine ",
                                "the weather & temperature ",
                                "in your area."
                            ]}
                            size="2xl"
                            swapColorOrder
                        />
                        <Container style={[styles.locationCtaText, styles.transparentBackground]}>
                            <BrandHeader
                                content={["Please enable your location ", "to get started "]}
                                size="2xl"
                                swapColorOrder
                            />
                        </Container>
                        <Button
                            containerStyle={styles.settingsButton}
                            icon={<ArrowRightIcon color={styles.settingsButtonText.color} />}
                            onPress={() => openNativeAppSettings()}
                            text="Open Device Settings"
                        />
                    </Container>
                    <Container style={getFooterContainerStyle(insets)}>
                        <Footer />
                    </Container>
                </ImageBackground>
            </Container>
        </FullScreenLoader>
    );
};
