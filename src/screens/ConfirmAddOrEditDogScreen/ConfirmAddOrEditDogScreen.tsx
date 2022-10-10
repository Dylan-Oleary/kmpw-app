import React, { FC, useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useNavigation, useRoute } from "@react-navigation/native";
import { isValueOfType } from "@theonlydevsever/utilities";

import { uploadDogImage, useCreateDogMutation, useUpdateDogMutation } from "@/api";
import {
    Alert,
    AlertControl,
    BrandHeader,
    Container,
    DogConfirmation,
    errorAlertDefaultConfig,
    FullScreenLoader,
    Text
} from "@/components";
import { buildDogMutationData } from "@/forms";
import { useAppSelector } from "@/hooks";
import { formatPossessiveNoun, resetHomeStack } from "@/lib";
import { ConfirmAddOrEditDogScreenRouteProp, HomeStackNavigationProp } from "@/navigation";
import { globalStyles } from "@/styles";
import { GraphQlDogMutationData } from "@/types";

import { styles } from "./styles";

export const ConfirmAddOrEditDogScreen: FC = () => {
    const toast = useToast();
    const { accessToken } = useAppSelector(({ user }) => user);
    const [alert, setAlert] = useState<AlertControl>({ show: false });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const hasMounted = useRef<boolean>(false);
    const { dispatch, goBack, setOptions } = useNavigation<HomeStackNavigationProp>();
    const {
        params: { data, id }
    } = useRoute<ConfirmAddOrEditDogScreenRouteProp>();
    const { createDog, loading: isCreateDogLoading } = useCreateDogMutation();
    const { updateDog, loading: isUpdateDogLoading } = useUpdateDogMutation(id as string);
    const isLoading = isCreateDogLoading || isUpdateDogLoading || isSubmitting;

    const buildSuccessMessage: (data: GraphQlDogMutationData, isCreate: boolean) => string = (
        data,
        isCreate = true
    ) => {
        if (isCreate) {
            return `Hello, ${data?.name}. Welcome to Woxy!`;
        }

        return `${formatPossessiveNoun(data?.name)} info was successfully updated!`;
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        let hasPhotoUploadError: boolean = false;

        if (data?.newProfilePicture) {
            await uploadDogImage(accessToken, data.newProfilePicture)
                .then(({ secure_url }) => {
                    data.profilePicture = secure_url;
                })
                .catch(() => {
                    hasPhotoUploadError = true;
                });
        }

        const mutationData = buildDogMutationData(data);
        const mutationOptions = {
            variables: { data: mutationData },
            onCompleted: () => {
                dispatch(resetHomeStack());
                toast.show(buildSuccessMessage(mutationData, isValueOfType(id, "undefined")), {
                    type: "success"
                });

                if (hasPhotoUploadError) {
                    toast.show(
                        `An error occurred while updating ${formatPossessiveNoun(
                            mutationData?.name
                        )} photo.`,
                        { type: "warning" }
                    );
                }
            },
            onError: () => {
                setAlert({
                    ...errorAlertDefaultConfig,
                    show: true
                });
                setIsSubmitting(false);
            }
        };

        // TODO: Fix this
        //@ts-ignore
        return id ? updateDog(mutationOptions) : createDog(mutationOptions);
    };

    useEffect(() => {
        if (hasMounted.current) {
            setOptions({ headerShown: !isLoading });
        } else {
            hasMounted.current = true;
        }
    }, [isLoading]);

    return (
        <FullScreenLoader isLoading={isLoading}>
            <Container style={globalStyles.defaultFlex}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
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
                </ScrollView>
            </Container>
        </FullScreenLoader>
    );
};
