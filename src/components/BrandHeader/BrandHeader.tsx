import React, { FC, memo } from "react";
import { StyleProp, TextStyle } from "react-native";

import { HeaderText, TextProps } from "@/components";

import { styles } from "./styles";

export interface BrandHeaderProps extends Pick<TextProps, "size"> {
    content: string[];
    swapColorOrder?: boolean;
}

export const getLeadingStyles: (swapColorOrder: boolean) => StyleProp<TextStyle> = (
    swapColorOrder = false
) => (swapColorOrder ? styles.accentText : styles.baseText);

export const getFollowingStyles: (
    swapColorOrder: boolean,
    index: number
) => StyleProp<TextStyle> = (swapColorOrder, index) =>
    index % 2 === 0 ? getLeadingStyles(!swapColorOrder) : getLeadingStyles(swapColorOrder);

export const BrandHeader: FC<BrandHeaderProps> = memo(
    ({ content = [], size = "4xl", swapColorOrder = false }) =>
        content.length > 0 ? (
            <HeaderText size={size} style={getLeadingStyles(swapColorOrder)}>
                {content[0]}
                {content.length > 1 &&
                    content.slice(1).map((value, index) => (
                        <HeaderText
                            key={`${value}-${index}`}
                            size={size}
                            style={getFollowingStyles(swapColorOrder, index)}
                        >
                            {value}
                        </HeaderText>
                    ))}
            </HeaderText>
        ) : null,
    (prev, next) =>
        Boolean(prev?.content?.find((value, index) => value === next?.content?.[index])) &&
        prev.size === next.size &&
        prev.swapColorOrder === next.swapColorOrder
);
