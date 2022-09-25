import React, { FC } from "react";
import { RefreshControl as RNRefreshControl, RefreshControlProps } from "react-native";

import { theme } from "@/constants";

export const RefreshControl: FC<RefreshControlProps> = ({
    colors = [theme.colors.brand5],
    refreshing = false,
    onRefresh = () => {},
    tintColor = theme.colors.brand5,
    ...rest
}) => (
    <RNRefreshControl
        colors={colors}
        onRefresh={onRefresh}
        refreshing={refreshing}
        tintColor={tintColor}
        {...rest}
    />
);
