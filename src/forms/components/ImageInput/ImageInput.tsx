import React, { FC, useState } from "react";
import { View, ViewProps } from "react-native";
import { Image } from "react-native-image-crop-picker";

import CameraOutlineIcon from "@/assets/svg/camera-outline.svg";
import { Avatar } from "@/components";
import { ImagePickerModal } from "@/modals";

import { styles } from "./styles";

export interface ImageInputProps extends ViewProps {
    onChange: (image: Image) => void;
    value?: string;
}

export const ImageInput: FC<ImageInputProps> = ({ onChange = () => {}, style, value, ...rest }) => {
    const [isPickerModalOpen, setIsPickerModalOpen] = useState<boolean>(false);

    const handleImageSelection = (image: Image) => {
        setIsPickerModalOpen(false);
        onChange(image);
    };

    return (
        <View style={style} {...rest}>
            <Avatar
                onPress={() => setIsPickerModalOpen(true)}
                size="xl"
                source={value ? { uri: value } : undefined}
            >
                {({ height, width }) => (
                    <CameraOutlineIcon height={height} width={width} {...styles.icon} />
                )}
            </Avatar>
            <ImagePickerModal
                isVisible={isPickerModalOpen}
                onImageSelection={handleImageSelection}
                onRequestClose={() => setIsPickerModalOpen(false)}
            />
        </View>
    );
};
