import React, { FC } from "react";
import { Image } from "react-native-image-crop-picker";

import { ImagePicker, Modal } from "@/components";

export interface IImagePickerModalProps {
    isVisible: boolean;
    onImageSelection: (image: Image) => void;
    onRequestClose: () => void;
}

export const ImagePickerModal: FC<IImagePickerModalProps> = ({
    isVisible = false,
    onImageSelection = () => {},
    onRequestClose = () => {}
}) => (
    <Modal isVisible={isVisible} onRequestClose={onRequestClose}>
        <ImagePicker onSelection={onImageSelection} />
    </Modal>
);
