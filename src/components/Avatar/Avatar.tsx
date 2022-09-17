import React, { FC, ReactNode, useMemo } from "react";
import { StyleProp, View, ViewStyle, TouchableOpacity } from "react-native";
import { SvgProps } from "react-native-svg";

import { Image, IImageProps } from "@/components";
import { theme } from "@/constants";
import { AvatarSize } from "@/types";

import { styles } from "./styles";

type AvatarChildrenOpts = SvgProps & {
    size?: AvatarSize;
};

interface IAvatarProps extends IImageProps {
    children?: (opts: AvatarChildrenOpts) => ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
    onPress?: () => void;
    size?: AvatarSize;
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
    size = "base",
    source,
    ...rest
}) => {
    const width = useMemo(() => getAvatarWidth(size), [size]);
    const { iconContainerStyle, iconStyle } = useMemo(() => getAvatarIconStyles(width), [width]);

    return (
        <TouchableOpacity
            activeOpacity={onPress ? theme.ACTIVE_OPACITY : 1}
            onPress={() => onPress?.()}
            style={[styles.container, containerStyle, { width }]}
        >
            <Image
                aspectRatio={[1, 1]}
                imageStyle={styles.avatar}
                source={source}
                width={width}
                {...rest}
            />
            {children && <View style={iconContainerStyle}>{children({ size, ...iconStyle })}</View>}
        </TouchableOpacity>
    );
};
