import React, { FC, useState } from "react";
import { View, ViewProps } from "react-native";

import DogImage from "@/assets/images/test-pup.jpg";
import CameraOutlineIcon from "@/assets/svg/camera-outline.svg";
import { Avatar } from "@/components";
import { ImagePickerModal } from "@/modals";

import { styles } from "./styles";

export interface ImageUploaderProps extends ViewProps {}

export const ImageUploader: FC<ImageUploaderProps> = ({ style, ...rest }) => {
    const [isPickerModalOpen, setIsPickerModalOpen] = useState<boolean>(false);

    return (
        <View style={style} {...rest}>
            <Avatar onPress={() => setIsPickerModalOpen(true)} size="xl" source={DogImage}>
                {({ height, width }) => (
                    <CameraOutlineIcon height={height} width={width} {...styles.icon} />
                )}
            </Avatar>
            <ImagePickerModal
                isVisible={isPickerModalOpen}
                onRequestClose={() => setIsPickerModalOpen(false)}
            />
        </View>
    );
};
