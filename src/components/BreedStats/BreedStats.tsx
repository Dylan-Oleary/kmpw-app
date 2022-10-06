import React, { FC } from "react";

import { Container, Text } from "@/components";
import { Breed } from "@/types";

export const BreedStats: FC<Breed> = ({ name }) => (
    <Container>
        <Text>{name}</Text>
    </Container>
);
