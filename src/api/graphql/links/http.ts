import { HttpLink } from "@apollo/client";
import { API_GRAPHQL_URL } from "react-native-dotenv";

export const httpLink = new HttpLink({
    credentials: "include",
    uri: API_GRAPHQL_URL
});
