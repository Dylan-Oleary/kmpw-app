import React, { FC, memo, MemoExoticComponent } from "react";

import { Container, Text } from "@/components";

import { styles } from "./styles";

export const EmptyBreedList: MemoExoticComponent<FC> = memo(() => (
    <Container style={styles.container}>
        <Text size="sm" style={styles.text}>
            It looks like we couldn't find what you were looking for
        </Text>
    </Container>
));
