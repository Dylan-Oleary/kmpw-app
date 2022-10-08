import React, { FC } from "react";
import { TouchableOpacity, ViewProps } from "react-native";
import RNImagePicker, { Image, Options } from "react-native-image-crop-picker";

import CameraOutlineIcon from "@/assets/svg/camera-outline.svg";
import PhotoOutlineIcon from "@/assets/svg/photo-outline.svg";
import { Container, Text } from "@/components";
import { theme } from "@/constants";

import { styles } from "./styles";

export interface IImagePickerProps extends ViewProps {
    onSelection: (image: Image) => void;
}

const COMMON_IMAGE_PICKER_OPTIONS: Partial<Options> = {
    cropping: true,
    mediaType: "photo",
    // Android only
    cropperActiveWidgetColor: theme.colors.brand5,
    cropperCircleOverlay: true,
    cropperToolbarWidgetColor: theme.colors.textDark,
    cropperStatusBarColor: theme.colors.brand5,
    // iOS only
    cropperChooseText: "Confirm",
    loadingLabelText: "Loading...",
    maxFiles: 1,
    showsSelectedCount: false,
    smartAlbums: ["UserLibrary", "PhotoStream", "Panoramas", "Bursts"]
};

export const ImagePicker: FC<IImagePickerProps> = ({ onSelection = () => {}, style, ...rest }) => {
    const openCamera: () => void = () => {
        RNImagePicker.openCamera({ ...COMMON_IMAGE_PICKER_OPTIONS }).then(handleImageSelection);
    };

    const openImagePicker: () => void = () => {
        RNImagePicker.openPicker({ ...COMMON_IMAGE_PICKER_OPTIONS }).then(handleImageSelection);
    };

    const handleImageSelection: (image: Image) => void = (image) => onSelection(image);

    return (
        <Container style={[styles.actionsRow, style]} {...rest}>
            <TouchableOpacity
                activeOpacity={theme.ACTIVE_OPACITY}
                onPress={openCamera}
                style={styles.actionItem}
            >
                <CameraOutlineIcon {...styles.icon} />
                <Text style={styles.actionText}>Camera</Text>
            </TouchableOpacity>
            <Container style={styles.divider} />
            <TouchableOpacity
                activeOpacity={theme.ACTIVE_OPACITY}
                onPress={openImagePicker}
                style={styles.actionItem}
            >
                <PhotoOutlineIcon {...styles.icon} />
                <Text style={styles.actionText}>Photos</Text>
            </TouchableOpacity>
        </Container>
    );
};
