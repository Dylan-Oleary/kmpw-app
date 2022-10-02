import React, { FC } from "react";
import { StyleProp, ViewStyle } from "react-native";
import RNModal, { ModalProps as RNModalProps } from "react-native-modal";

import { Container } from "@/components";
import { maxDeviceHeight, screenWidth } from "@/styles";

import { styles } from "./styles";

type IncludedRNModalProps = "isVisible";

export interface ModalProps extends Pick<RNModalProps, IncludedRNModalProps> {
    contentContainerStyle?: StyleProp<ViewStyle>;
    onRequestClose: () => void;
}

export const Modal: FC<ModalProps> = ({
    children,
    contentContainerStyle,
    isVisible = false,
    onRequestClose = () => {}
}) => (
    <RNModal
        deviceHeight={maxDeviceHeight}
        deviceWidth={screenWidth}
        isVisible={isVisible}
        onBackButtonPress={onRequestClose}
        onBackdropPress={onRequestClose}
        onSwipeComplete={onRequestClose}
        statusBarTranslucent
        style={styles.modalContainer}
        swipeDirection="down"
        swipeThreshold={75}
        useNativeDriver
    >
        <Container style={[styles.contentContainer, contentContainerStyle]}>{children}</Container>
    </RNModal>
);
