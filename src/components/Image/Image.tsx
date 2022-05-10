import React, { FC } from "react";
import { Image as RNImage, ImageProps, ImageStyle, StyleProp, View, ViewStyle } from "react-native";

import { getRatio } from "@/lib";
import type { AspectRatio } from "@/types";

import { styles } from "./styles";

export interface IImageProps extends ImageProps {
    aspectRatio?: AspectRatio;
    containerStyle?: StyleProp<ViewStyle>;
    imageStyle?: StyleProp<ImageStyle>;
}

export const Image: FC<IImageProps> = ({
    aspectRatio = [16, 9],
    containerStyle,
    imageStyle,
    source,
    width = 250,
    ...rest
}) => (
    <View
        style={[
            { width, height: width / getRatio(aspectRatio[0], aspectRatio[1]) },
            containerStyle
        ]}
    >
        <RNImage source={source} style={[styles.image, imageStyle]} {...rest} />
    </View>
);
