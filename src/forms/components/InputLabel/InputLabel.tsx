import React, { FC } from "react";

import { Text } from "@/components";

import { styles } from "./styles";

export const InputLabel: FC = ({ children }) => (
    <Text style={styles.label} size="xs">
        {children}
    </Text>
);
