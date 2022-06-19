import React, { FC, useState } from "react";
import { ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useCreateDogMutation, useUpdateDogMutation } from "@/api";
import { Alert, AlertControl, BrandHeader, Container, DogConfirmation, Text } from "@/components";
import { buildDogMutationData } from "@/forms";
import { resetHomeStack } from "@/lib";
import { ConfirmAddOrEditDogScreenRouteProp, HomeStackNavigationProp } from "@/navigation";
import { globalStyles } from "@/styles";

import { styles } from "./styles";

export const ConfirmAddOrEditDogScreen: FC = () => {
    const [alert, setAlert] = useState<AlertControl>({ show: false });
    const { dispatch, goBack } = useNavigation<HomeStackNavigationProp>();
    const {
        params: { data, id }
    } = useRoute<ConfirmAddOrEditDogScreenRouteProp>();
    const mutationData = buildDogMutationData(data);
    const { createDog, loading: isCreateDogLoading } = useCreateDogMutation(mutationData);
    const { updateDog, loading: isUpdateDogLoading } = useUpdateDogMutation(
        mutationData,
        id as string
    );
    const isLoading = isCreateDogLoading || isUpdateDogLoading;

    const handleSubmit: () => void = () => {
        const mutationOptions = {
            onCompleted: () => dispatch(resetHomeStack()),
            onError: () =>
                setAlert({
                    title: "Oh no!",
                    body: "We couldn't complete your request at the moment. Please try again.",
                    theme: "error",
                    show: true
                })
        };

        return id ? updateDog(mutationOptions) : createDog(mutationOptions);
    };

    return (
        <ScrollView contentContainerStyle={globalStyles.defaultFlex}>
            <Container style={[globalStyles.defaultFlex, styles.contentContainer]}>
                <Container>
                    <BrandHeader content={["Confirm your ", "pup."]} size="2xl" />
                    <Text style={styles.headerBodyText}>
                        Check out your pup's details below and make sure everything looks good.
                    </Text>
                    {alert?.show && (
                        <Alert
                            body={alert?.body}
                            style={styles.alertContainer}
                            theme={alert?.theme}
                            title={alert?.title}
                        />
                    )}
                </Container>
                <DogConfirmation
                    dog={data}
                    isLoading={isLoading}
                    onCancel={goBack}
                    onConfirm={handleSubmit}
                    style={styles.detailsContainer}
                />
            </Container>
        </ScrollView>
    );
};
