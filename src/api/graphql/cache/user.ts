import { gql, useApolloClient } from "@apollo/client";

import { getFragmentCacheResult } from "@/api";
import { USER_DETAILS_FRAGMENT, WEATHER_DETAILS_FRAGMENT } from "../fragments";
import { User } from "@/types";
import { useUserSelector } from "@/redux";

export type GetCachedUserQueryVariables = { id: string };

export const GET_CACHED_USER = gql`
    ${USER_DETAILS_FRAGMENT}
    ${WEATHER_DETAILS_FRAGMENT}
    fragment CachedUser on User {
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
`;

export const useApolloCacheUser: () => [User, string] = () => {
    const client = useApolloClient();
    const { id } = useUserSelector();
    const cacheKey = `User:${id}`;

    return [
        getFragmentCacheResult<User>(client, {
            cacheKey,
            fragment: GET_CACHED_USER
        }),
        cacheKey
    ];
};
