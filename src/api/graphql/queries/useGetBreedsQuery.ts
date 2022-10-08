import { gql, useQuery } from "@apollo/client";

import { Breed } from "@/types";

export const GET_BREEDS = gql`
    query GetBreeds {
        breeds {
            id
            name
            lifeSpanAvg
            heightImperialAvg
            weightImperialAvg
        }
    }
`;

export const useGetBreedsQuery = () => {
    const { data, error, loading } = useQuery<{ breeds: Breed[] }>(GET_BREEDS);

    return { error, loading, breeds: data?.breeds || [] };
};
