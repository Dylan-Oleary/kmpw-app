import React, { FC, useState } from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ArrowRightIcon from "@/assets/svg/arrow-right.svg";
import {
    AccountActions,
    Alert,
    BrandHeader,
    Button,
    Container,
    FullScreenLoader,
    StatusBar
} from "@/components";
import { openNativeAppSettings } from "@/lib";
import { useLocationSelector } from "@/redux";

import { getContainerStyle, styles } from "./styles";

export const LocationDisabledScreen: FC = () => {
    const insets = useSafeAreaInsets();
    const { isFetchingLocation } = useLocationSelector();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <FullScreenLoader isLoading={isFetchingLocation || isLoading}>
            {Platform.OS === "android" && <StatusBar />}
            <Container style={getContainerStyle(insets)}>
                <BrandHeader content={["Let's get ", "barking."]} size="2xl" />
                <Container style={styles.settingsActionContainer}>
                    <Alert
                        title="Woof!"
                        theme="warning"
                        body={`It looks like you've disabled your location.\n\nWoxy uses your location to determine the weather and temperature in your area. To get started, Woxy requires access to your device's location.`}
                    />
                    <Button
                        containerStyle={styles.settingsButton}
                        icon={<ArrowRightIcon {...styles.icon} />}
                        onPress={() => openNativeAppSettings()}
                        text="Open device settings"
                    />
                </Container>
                <AccountActions onLogoutConfirm={() => setIsLoading(true)} />
            </Container>
        </FullScreenLoader>
    );
};
