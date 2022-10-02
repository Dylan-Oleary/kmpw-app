import React, { FC, useState } from "react";
import { ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useDeleteDogMutation } from "@/api";
import {
    Alert,
    AlertControl,
    BrandHeader,
    Container,
    DogConfirmation,
    errorAlertDefaultConfig,
    Text
} from "@/components";
import { resetHomeStack } from "@/lib";
import { ConfirmRemoveDogScreenRouteProp, HomeStackNavigationProp } from "@/navigation";
import { globalStyles } from "@/styles";

import { styles } from "./styles";

export const ConfirmRemoveDogScreen: FC = () => {
    const [alert, setAlert] = useState<AlertControl>({ show: false });
    const { dispatch, goBack } = useNavigation<HomeStackNavigationProp>();
    const {
        params: { dog }
    } = useRoute<ConfirmRemoveDogScreenRouteProp>();
    const { deleteDog, loading } = useDeleteDogMutation(dog.id);

    const onConfirm = (): void => {
        const mutationOptions = {
            onCompleted: () => dispatch(resetHomeStack()),
            onError: () =>
                setAlert({
                    ...errorAlertDefaultConfig,
                    show: true
                })
        };

        deleteDog(mutationOptions);
    };

    return (
        <ScrollView contentContainerStyle={globalStyles.defaultFlex}>
            <Container style={[globalStyles.defaultFlex, styles.contentContainer]}>
                <Container>
                    <BrandHeader content={["Are you ", "sure?"]} size="2xl" />
                    <Text style={styles.headerBodyText}>
                        Once you remove your pup, it cannot be undone.
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
                    confirmButtonText="Confirm"
                    dog={dog}
                    isLoading={loading}
                    isRemoval
                    onCancel={goBack}
                    onConfirm={onConfirm}
                    style={styles.detailsContainer}
                />
            </Container>
        </ScrollView>
    );
};
