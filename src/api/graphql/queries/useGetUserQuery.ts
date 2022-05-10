import { gql, useQuery } from "@apollo/client";

import { User } from "@/types";

export type GetUserQueryVariables = { location?: { q: string } };

export const GET_USER = gql`
    query GetUser($location: CurrentWeatherWhere) {
        me(location: $location) {
            id
            email
            createdAt
            updatedAt
            reauthenticationAt
            dogs {
                id
                createdAt
                updatedAt
                name
                birthday
                profilePicture
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
            weather {
                current {
                    condition {
                        code
                        icon
                        text
                    }
                    feelslike_c
                    feelslike_f
                    temp_c
                    temp_f
                }
                location {
                    name
                    region
                }
            }
        }
    }
`;

export const buildGetUserQueryVariables = (geolocation: string = ""): GetUserQueryVariables =>
    geolocation?.trim().length > 0 ? { location: { q: geolocation } } : {};

export const useGetUserQuery = (geolocation: string = "") => {
    const { data, error, loading } = useQuery<{ me: User }, GetUserQueryVariables>(GET_USER, {
        variables: buildGetUserQueryVariables(geolocation)
    });

    return { error, loading, user: data?.me };
};
