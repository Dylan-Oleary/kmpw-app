import React, { FC } from "react";

import { Container, DogInformation } from "@/components";
import { Breed } from "@/types";

import { styles } from "./styles";

export const BreedStats: FC<Breed> = ({ lifeSpanAvg, heightImperialAvg, weightImperialAvg }) => (
    <Container>
        <DogInformation
            label="Avg. lifespan"
            size="sm"
            value={lifeSpanAvg ? `${lifeSpanAvg} years` : undefined}
        />
        <DogInformation
            label="Avg. height"
            size="sm"
            style={styles.statRow}
            value={heightImperialAvg ? `${heightImperialAvg} in.` : undefined}
        />
        <DogInformation
            label="Avg. weight"
            size="sm"
            style={styles.statRow}
            value={weightImperialAvg ? `${weightImperialAvg} lbs` : undefined}
        />
    </Container>
);
