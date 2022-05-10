import { ApolloClient, from, InMemoryCache } from "@apollo/client";

import { authLink, errorLink, httpLink } from "@/api/graphql/links";

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, authLink, httpLink])
});
