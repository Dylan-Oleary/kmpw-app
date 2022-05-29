import { gql, useMutation } from "@apollo/client";

export type DeleteDogMutationResult = { deleteDog: string };
export type DeleteDogMutationVariables = { id: string };

export const DELETE_DOG = gql`
    mutation DeleteDog($id: ID!) {
        deleteDog(id: $id)
    }
`;

export const useDeleteDogMutation = (id: string) => {
    const [deleteDog, { error, loading }] = useMutation<
        DeleteDogMutationResult,
        DeleteDogMutationVariables
    >(DELETE_DOG, {
        optimisticResponse: { deleteDog: id },
        variables: { id },
        update: (cache, { data }) => {
            const dogId = data?.deleteDog;

            if (dogId && dogId === id) {
                const normalizedId = cache.identify({ id: dogId, __typename: "Dog" });

                cache.evict({ id: normalizedId });
                cache.gc();
            }
        }
    });

    return { deleteDog, error, loading };
};
