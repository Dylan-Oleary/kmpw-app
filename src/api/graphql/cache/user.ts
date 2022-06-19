import { gql, useApolloClient } from "@apollo/client";

import { getFragmentCacheResult } from "@/api";
import { User } from "@/types";
import { useUserSelector } from "@/redux";

export type GetCachedUserQueryVariables = { id: string };

export const GET_CACHED_USER = gql`
    fragment CachedUser on User {
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
