import { GeoCoordinates } from "react-native-geolocation-service";
import { useDispatch } from "react-redux";
import { ApolloQueryResult, gql, useQuery } from "@apollo/client";

import { buildGeolocationString } from "@/lib";
import { setUserIdentifier, useUserSelector } from "@/redux";
import { User } from "@/types";

export type GetUserQueryResult = { me: User };
export type GetUserQueryVariables = { location?: { q: string } };

export type UseGetUserQueryBaseOpts = {
    geolocation: GeoCoordinates | null;
};

export type UseGetUserExtendedQueryOpts = {
    onCompleted?: () => void;
    onError?: () => void;
} & UseGetUserQueryBaseOpts;

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
                    }
                    feelslike_c
                    feelslike_f
                    is_day
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

export const useGetUserQuery = (opts: UseGetUserExtendedQueryOpts) => {
    const { geolocation, onCompleted, onError } = opts;
    const dispatch = useDispatch();
    const { id = null } = useUserSelector();
    const variables = buildGetUserQueryVariables(
        buildGeolocationString(geolocation?.latitude, geolocation?.longitude)
    );
    const { data, error, loading, refetch } = useQuery<GetUserQueryResult, GetUserQueryVariables>(
        GET_USER,
        {
            skip: !variables.location,
            variables,
            onCompleted: ({ me: user }) => {
                if (!id) dispatch(setUserIdentifier(user.id));

                onCompleted?.();
            },
            onError: () => {
                onError?.();
            }
        }
    );

    const refetchUser: (
        opts: UseGetUserQueryBaseOpts
    ) => Promise<ApolloQueryResult<GetUserQueryResult>> = (opts) => {
        const { geolocation } = opts;

        return refetch({
            ...buildGetUserQueryVariables(
                buildGeolocationString(geolocation?.latitude, geolocation?.longitude)
            )
        });
    };

    return { error, loading, refetchUser, user: data?.me };
};
