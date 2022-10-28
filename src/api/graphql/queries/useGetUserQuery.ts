import { GeoCoordinates } from "react-native-geolocation-service";
import { useDispatch } from "react-redux";
import { ApolloQueryResult, gql, useQuery } from "@apollo/client";

import { USER_DETAILS_FRAGMENT, WEATHER_DETAILS_FRAGMENT } from "@/api/graphql";
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
    ${USER_DETAILS_FRAGMENT}
    ${WEATHER_DETAILS_FRAGMENT}
    query GetUser($location: CurrentWeatherWhere) {
        me(location: $location) {
            ...UserDetails
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
                    lifeSpanAvg
                    heightImperialAvg
                    weightImperialAvg
                }
                safetyLevel {
                    level
                    message
                }
            }
            weather {
                ...WeatherDetails
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
    const { data, error, loading, previousData, refetch } = useQuery<
        GetUserQueryResult,
        GetUserQueryVariables
    >(GET_USER, {
        errorPolicy: "all",
        variables,
        onCompleted: ({ me: user }) => {
            if (!id) dispatch(setUserIdentifier(user.id));

            onCompleted?.();
        },
        onError: () => {
            onError?.();
        }
    });

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

    return { error, loading, refetchUser, prevUser: previousData?.me, user: data?.me };
};
