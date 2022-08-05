import React, { FC } from "react";
import ImagePicker from "react-native-image-crop-picker";

import { Container, Modal } from "@/components";

export interface IImagePickerModalProps {
    isVisible: boolean;
    onRequestClose: () => void;
}

export const ImagePickerModal: FC<IImagePickerModalProps> = ({
    isVisible = false,
    onRequestClose = () => {}
}) => {
    return (
        <Modal isVisible={isVisible} onRequestClose={onRequestClose}>
            <Container style={{ backgroundColor: "red" }}></Container>
        </Modal>
    );
};
