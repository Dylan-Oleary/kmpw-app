import React, { FC } from "react";
import { View, ViewProps } from "react-native";

import { styles } from "./styles";

export const Container: FC<ViewProps> = ({ children, style = {}, ...props }) => (
    <View {...props} style={[styles.container, style]}>
        {children}
    </View>
);
