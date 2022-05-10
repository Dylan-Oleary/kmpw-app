import React, { FC } from "react";
import { StyleProp, ViewProps, ViewStyle } from "react-native";

import PlusIcon from "@/assets/svg/plus.svg";
import { Button, Container, DogCard, HeaderText } from "@/components";
import { Dog } from "@/types";

import { styles } from "./styles";

export interface IDogListProps extends ViewProps {
    dogs: Dog[];
    loading?: boolean;
}

export const getDogCardStyles: (index: number) => StyleProp<ViewStyle> = (index) =>
    index > 0 ? styles.dogCardNthItem : null;

export const DogList: FC<IDogListProps> = ({ dogs = [], loading = false, style, ...props }) => {
    return (
        <Container style={style} {...props}>
            <HeaderText size="base">
                Your walking{" "}
                <HeaderText size="base" style={styles.headerTextAccent}>
                    buddies.
                </HeaderText>
            </HeaderText>
            {dogs.length > 0 && (
                <Container style={styles.dogListContainer}>
                    {dogs.map((dog, i) => (
                        <DogCard dog={dog} key={dog.id} style={getDogCardStyles(i)} />
                    ))}
                </Container>
            )}
            <Button
                containerStyle={styles.addDogButtonContainer}
                icon={<PlusIcon color={styles.addDogIcon.color} />}
                onPress={() => console.info("Pressed!")}
                text="Add a New Buddy"
            />
        </Container>
    );
};
