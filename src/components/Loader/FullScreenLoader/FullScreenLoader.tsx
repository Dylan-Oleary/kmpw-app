import React, { FC } from "react";
import { Platform } from "react-native";
import Lottie from "lottie-react-native";

import DogBallAnimation from "@/assets/lottie/dog_ball_animation.json";
import { Container, LoaderProps, StatusBar } from "@/components";
import { globalStyles } from "@/styles";

export const FullScreenLoader: FC<LoaderProps> = ({ children, isLoading = false }) => (
    <Container style={globalStyles.defaultFlex}>
        {isLoading ? (
            <>
                {Platform.OS === "android" && <StatusBar />}
                <Container
                    style={[
                        globalStyles.defaultFlex,
                        globalStyles.alignItemsCenter,
                        globalStyles.justifyFlexCenter
                    ]}
                >
                    <Lottie source={DogBallAnimation} autoPlay loop />
                </Container>
            </>
        ) : (
            children
        )}
    </Container>
);
