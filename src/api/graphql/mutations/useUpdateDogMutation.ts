import { gql, useMutation } from "@apollo/client";

import { DOG_FRAGMENT, useApolloCacheUser } from "@/api";
import { Dog, GraphQlDogMutationData } from "@/types";

export type UpdateDogMutationResult = { updateDog: Dog };
export type UpdateDogMutationVariables = {
    data: GraphQlDogMutationData;
    id: string;
    temperatureFarenheit: number;
};

export const UPDATE_DOG = gql`
    mutation UpdateDog($data: UpdateDogData!, $id: ID!, $temperatureFarenheit: Float) {
        updateDog(data: $data, id: $id, temperatureFarenheit: $temperatureFarenheit) {
            id
            createdAt
            updatedAt
            name
            birthday
            profilePicture
            weightImperial
            weightMetric
            breed {
                id
                name
            }
            safetyLevel {
                level
                message
            }
        }
    }
`;

export const useUpdateDogMutation = (id: string) => {
    const [user, userCacheKey] = useApolloCacheUser();
    const [updateDog, { error, loading }] = useMutation<
        UpdateDogMutationResult,
        UpdateDogMutationVariables
    >(UPDATE_DOG, {
        variables: {
            data: {} as GraphQlDogMutationData,
            id,
            temperatureFarenheit: user?.weather!.current.temp_f
        },
        update: (cache, { data }) => {
            const updatedDog = data?.updateDog;

            if (updatedDog) {
                cache.modify({
                    id: userCacheKey,
                    fields: {
                        dogs(existingDogs = [], { readField }) {
                            return existingDogs.map((dog: Dog) => {
                                if (readField("id", dog) === updatedDog?.id) {
                                    return cache.writeFragment({
                                        data: updatedDog,
                                        fragment: DOG_FRAGMENT
                                    });
                                }

                                return dog;
                            });
                        }
                    }
                });
            }
        }
    });

    return { updateDog, error, loading };
};
