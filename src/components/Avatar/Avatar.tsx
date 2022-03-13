import React, { FC } from "react";

import { theme } from "../../constants";
import { Image, IImageProps } from "../Image";
import { AvatarSize } from "../../types";
import { styles } from "./styles";

interface IAvatarProps extends IImageProps {
    size?: AvatarSize;
}

export const Avatar: FC<IAvatarProps> = ({ size = "base", source, ...rest }) => {
    const getWidth: (size: AvatarSize) => number = (size) => {
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

    return (
        <Image
            aspectRatio={[1, 1]}
            imageStyle={styles.avatar}
            source={source}
            width={getWidth(size)}
            {...rest}
        />
    );
};
