import { useDispatch } from "react-redux";
import { gql, useQuery } from "@apollo/client";

import { setUserIdentifier, useUserSelector } from "@/redux";
import { User } from "@/types";

export type GetUserQueryResult = { me: User };
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
    const dispatch = useDispatch();
    const { id = null } = useUserSelector();
    const variables = buildGetUserQueryVariables(geolocation);
    const { data, error, loading } = useQuery<GetUserQueryResult, GetUserQueryVariables>(GET_USER, {
        skip: !variables.location,
        variables,
        onCompleted: ({ me: user }) => {
            if (!id) dispatch(setUserIdentifier(user.id));
        }
    });

    return { error, loading, user: data?.me };
};
