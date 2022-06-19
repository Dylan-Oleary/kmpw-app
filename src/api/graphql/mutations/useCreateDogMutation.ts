import { gql, useMutation } from "@apollo/client";

import { DOG_FRAGMENT, useApolloCacheUser } from "@/api";
import { Dog, GraphQlDogMutationData } from "@/types";

export type CreateDogMutationResult = { createDog: Dog };
export type CreateDogMutationVariables = {
    data: GraphQlDogMutationData;
    temperatureFarenheit: number;
};

export const CREATE_DOG = gql`
    mutation CreateDog($data: CreateDogData!, $temperatureFarenheit: Float) {
        createDog(data: $data, temperatureFarenheit: $temperatureFarenheit) {
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

export const useCreateDogMutation = (data: GraphQlDogMutationData) => {
    const [user, userCacheKey] = useApolloCacheUser();
    const [createDog, { error, loading }] = useMutation<
        CreateDogMutationResult,
        CreateDogMutationVariables
    >(CREATE_DOG, {
        variables: { data, temperatureFarenheit: user?.weather!.current.temp_f },
        update: (cache, { data }) => {
            const newDog = data?.createDog;

            if (newDog) {
                cache.modify({
                    id: userCacheKey,
                    fields: {
                        dogs(existingDogs = []) {
                            const newDogRef = cache.writeFragment({
                                data: newDog,
                                fragment: DOG_FRAGMENT
                            });

                            return [...existingDogs, newDogRef];
                        }
                    }
                });
            }
        }
    });

    return { createDog, error, loading };
};
