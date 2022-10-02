import React, { FC } from "react";
import Lottie from "lottie-react-native";

import PulseLoaderAnimation from "@/assets/lottie/pulse_loader_animation.json";
import { Container, LoaderProps, Modal } from "@/components";

import { styles } from "./styles";

export const OverlayLoader: FC<LoaderProps> = ({ children, isLoading }) => (
    <>
        <Modal
            contentContainerStyle={styles.modal}
            isVisible={isLoading}
            onRequestClose={() => null}
        >
            <Container style={styles.loaderContainer}>
                <Lottie source={PulseLoaderAnimation} autoPlay loop />
            </Container>
        </Modal>
        {children}
    </>
);
