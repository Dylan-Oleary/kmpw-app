import React, { FC, ReactNode, useMemo, useState } from "react";
import { ImageSourcePropType, StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import { SvgProps } from "react-native-svg";

import DefaultAvatarImage from "@/assets/images/logo_white_bg.png";
import { Image, IImageProps } from "@/components";
import { theme } from "@/constants";
import { AvatarSize } from "@/types";

import { getShimmerStyles, styles } from "./styles";

type AvatarChildrenOpts = SvgProps & {
    size?: AvatarSize;
};

interface IAvatarProps extends Omit<IImageProps, "source"> {
    children?: (opts: AvatarChildrenOpts) => ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
    onLongPress?: () => void;
    onPress?: () => void;
    size?: AvatarSize;
    source?: ImageSourcePropType;
}

export const getAvatarWidth: (size: AvatarSize) => number = (size) => {
    const { BASE_REM } = theme;
    let width;

    switch (size) {
        case "xxs":
            width = BASE_REM;
            break;
        case "xs":
            width = BASE_REM * 2;
            break;
        case "sm":
            width = BASE_REM * 4;
            break;
        case "base":
            width = BASE_REM * 5;
            break;
        case "lg":
            width = BASE_REM * 6;
            break;
        case "xl":
            width = BASE_REM * 8;
            break;
        default:
            width = BASE_REM * 4;
    }

    return width;
};

export const getAvatarIconStyles: (width: number) => {
    iconContainerStyle: ViewStyle;
    iconStyle: SvgProps;
} = (width) => {
    const iconContainerSize = width * 0.3125;
    const iconSize = iconContainerSize * 0.64;

    return {
        iconContainerStyle: {
            ...styles.iconContainer,
            height: iconContainerSize,
            width: iconContainerSize
        },
        iconStyle: {
            height: iconSize,
            width: iconSize
        }
    };
};

export const Avatar: FC<IAvatarProps> = ({
    children,
    containerStyle,
    onPress,
    onLongPress,
    size = "base",
    source = DefaultAvatarImage,
    ...rest
}) => {
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
    const width = useMemo(() => getAvatarWidth(size), [size]);
    const { iconContainerStyle, iconStyle } = useMemo(() => getAvatarIconStyles(width), [width]);

    return (
        <TouchableOpacity
            activeOpacity={onPress ? theme.ACTIVE_OPACITY : 1}
            onLongPress={() => onLongPress?.()}
            onPress={() => onPress?.()}
            style={[styles.container, containerStyle, { width }]}
        >
            <ShimmerPlaceHolder
                LinearGradient={LinearGradient}
                style={getShimmerStyles(width)}
                visible={isImageLoaded}
            >
                <Image
                    aspectRatio={[1, 1]}
                    imageStyle={styles.avatar}
                    source={source}
                    onLoadEnd={() => setIsImageLoaded(true)}
                    width={width}
                    {...rest}
                />
            </ShimmerPlaceHolder>
            {children && <View style={iconContainerStyle}>{children({ size, ...iconStyle })}</View>}
        </TouchableOpacity>
    );
};
