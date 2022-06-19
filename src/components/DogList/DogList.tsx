import React, { FC } from "react";
import { StyleProp, ViewProps, ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";

import PlusIcon from "@/assets/svg/plus.svg";
import { BrandHeader, Button, Container, DogCard } from "@/components";
import { AUTHORIZED_SCREEN_NAMES } from "@/constants";
import { HomeStackNavigationProp } from "@/navigation";
import { Dog } from "@/types";

import { styles } from "./styles";

export interface IDogListProps extends ViewProps {
    dogs: Dog[];
    loading?: boolean;
}

export const getDogCardStyles: (index: number) => StyleProp<ViewStyle> = (index) =>
    index > 0 ? styles.dogCardNthItem : null;

export const DogList: FC<IDogListProps> = ({ dogs = [], loading = false, style, ...props }) => {
    const { navigate } = useNavigation<HomeStackNavigationProp>();

    return (
        <Container style={style} {...props}>
            <BrandHeader content={["Your walking ", "buddies."]} size="base" />
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
                //@ts-ignore - TODO: Fix types
                onPress={() => navigate(AUTHORIZED_SCREEN_NAMES.ADD_OR_EDIT_DOG)}
                text="Add a New Buddy"
            />
        </Container>
    );
};
