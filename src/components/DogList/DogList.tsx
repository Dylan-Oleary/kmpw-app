import React, { FC, useRef } from "react";
import { StyleProp, ViewProps, ViewStyle } from "react-native";
import Config from "react-native-config";
import { useNavigation } from "@react-navigation/native";

import PlusIcon from "@/assets/svg/plus.svg";
import { BrandHeader, Button, Container, DogCard, Text } from "@/components";
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
    const maxNumberOfDogs = useRef<number>(parseInt(Config.USER_MAX_NUM_OF_DOGS));

    return (
        <Container style={style} {...props}>
            <Container style={styles.dogListTitleContainer}>
                <BrandHeader content={["Your walking ", "buddies."]} size="base" />
                <Text size="xs">{`(${dogs?.length}/${maxNumberOfDogs.current})`}</Text>
            </Container>
            {dogs.length > 0 && (
                <Container style={styles.dogListContainer}>
                    {dogs.map((dog, i) => (
                        <DogCard dog={dog} key={dog.id} style={getDogCardStyles(i)} />
                    ))}
                </Container>
            )}
            {dogs?.length < maxNumberOfDogs.current && (
                <Button
                    containerStyle={styles.addDogButtonContainer}
                    icon={<PlusIcon color={styles.addDogIcon.color} />}
                    //@ts-ignore - TODO: Fix types
                    onPress={() => navigate(AUTHORIZED_SCREEN_NAMES.ADD_OR_EDIT_DOG)}
                    text="Add a New Buddy"
                />
            )}
        </Container>
    );
};
