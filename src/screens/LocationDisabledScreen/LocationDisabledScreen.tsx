import React, { FC } from "react";
import { ImageBackground } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import DogImage from "@/assets/images/beach-pup.jpg";
import ArrowRightIcon from "@/assets/svg/arrow-right.svg";
import { Button, Container, Footer, HeaderText } from "@/components";
import { openNativeAppSettings } from "@/lib";

import { getContainerStyle, getFooterContainerStyle, styles } from "./styles";

export const LocationDisabledScreen: FC = () => {
    const insets = useSafeAreaInsets();

    return (
        <Container style={styles.wrapperContainer}>
            <ImageBackground resizeMode="cover" style={styles.backgroundImage} source={DogImage}>
                <Container style={[getContainerStyle(insets), styles.transparentBackground]}>
                    <HeaderText size="2xl">
                        KMPW uses location information to let you know{" "}
                        <HeaderText size="2xl" style={styles.headerTextAccent}>
                            when it's okay
                        </HeaderText>{" "}
                        to take your pup for a stroll.
                    </HeaderText>
                    <HeaderText size="2xl" style={styles.locationCtaText}>
                        <HeaderText size="2xl" style={styles.headerTextAccent}>
                            Please enable your location
                        </HeaderText>{" "}
                        to get started
                    </HeaderText>
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
