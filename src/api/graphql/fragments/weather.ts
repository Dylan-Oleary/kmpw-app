import { gql } from "@apollo/client";

export const WEATHER_DETAILS_FRAGMENT = gql`
    fragment WeatherDetails on CurrentWeatherResponse {
        alert {
            condition {
                text
            }
            message
            recommendedSafetyLevel
            type
        }
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
`;
