import React, { FC } from "react";
import { ImageBackground } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import DogImage from "@/assets/images/beach-pup.jpg";
import ArrowRightIcon from "@/assets/svg/arrow-right.svg";
import { BrandHeader, Button, Container, Footer } from "@/components";
import { openNativeAppSettings } from "@/lib";

import { getContainerStyle, getFooterContainerStyle, styles } from "./styles";

export const LocationDisabledScreen: FC = () => {
    const insets = useSafeAreaInsets();

    return (
        <Container style={styles.wrapperContainer}>
            <ImageBackground resizeMode="cover" style={styles.backgroundImage} source={DogImage}>
                <Container style={[getContainerStyle(insets), styles.transparentBackground]}>
                    <BrandHeader
                        content={[
                            "KMPW uses location information to let you know ",
                            "when it's okay ",
                            "to take your pup for a stroll."
                        ]}
                        size="2xl"
                    />
                    <Container style={styles.locationCtaText}>
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
    );
};
