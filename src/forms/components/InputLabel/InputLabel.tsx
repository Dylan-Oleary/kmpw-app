import React, { FC } from "react";

import { Text } from "../../../components";

import { styles } from "./styles";

export const InputLabel: FC = ({ children }) => {
    return <Text>{children}</Text>;
};
