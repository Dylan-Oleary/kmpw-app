import React, { FC } from "react";
import { TouchableOpacity, ViewProps } from "react-native";
import RNImagePicker, { Image, Options } from "react-native-image-crop-picker";

import { Container, Text } from "@/components";
import { theme } from "@/constants";

import { styles } from "./styles";

export interface IImagePickerProps extends ViewProps {
    onSelection: (image: Image) => void;
}

const COMMON_IMAGE_PICKER_OPTIONS: Partial<Options> = {
    cropping: true,
    cropperActiveWidgetColor: theme.colors.brand5,
    cropperCircleOverlay: true,
    height: 128,
    mediaType: "photo",
    showsSelectedCount: false,
    width: 128
};

export const ImagePicker: FC<IImagePickerProps> = ({ onSelection = () => {}, style, ...rest }) => {
    const openCamera = () => {
        RNImagePicker.openCamera({ ...COMMON_IMAGE_PICKER_OPTIONS }).then(handleImageSelection);
    };

    const openImagePicker = () => {
        RNImagePicker.openPicker({ ...COMMON_IMAGE_PICKER_OPTIONS }).then(handleImageSelection);
    };

    const handleImageSelection = (image: Image) => onSelection(image);

    return (
        <Container style={[styles.actionsRow, style]} {...rest}>
            <TouchableOpacity onPress={openCamera}>
                <Text>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openImagePicker}>
                <Text>Photos</Text>
            </TouchableOpacity>
        </Container>
    );
};
