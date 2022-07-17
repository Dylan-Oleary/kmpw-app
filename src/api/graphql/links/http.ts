import { HttpLink } from "@apollo/client";
import Config from "react-native-config";

export const httpLink = new HttpLink({
    credentials: "include",
    uri: Config.API_GRAPHQL_URL
});
