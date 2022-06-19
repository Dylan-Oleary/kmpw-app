import { gql } from "@apollo/client";

export const DOG_FRAGMENT = gql`
    fragment FullDog on Dog {
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
`;
