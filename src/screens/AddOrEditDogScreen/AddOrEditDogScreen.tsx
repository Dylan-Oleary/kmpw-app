import React, { FC } from "react";
import { ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Container } from "@/components";
import { DogForm } from "@/forms";
import { AddOrEditDogScreenRouteProp, HomeStackNavigationProp } from "@/navigation";
import { globalStyles } from "@/styles";

import { styles } from "./styles";

export const AddOrEditDogScreen: FC = () => {
    const { params = {} } = useRoute<AddOrEditDogScreenRouteProp>();
    const { navigate } = useNavigation<HomeStackNavigationProp>();

    return (
        <ScrollView contentContainerStyle={globalStyles.defaultFlex}>
            <Container style={[globalStyles.defaultFlex, styles.contentContainer]}>
                <DogForm
                    dog={params?.dog}
                    onSubmit={(data, id) => navigate("ConfirmAddOrEditDog", { data, id })}
                />
            </Container>
        </ScrollView>
    );
};
