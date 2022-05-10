import { ApolloLink } from "@apollo/client";

import { buildAuthenticationHeader } from "@/lib/session";
import { store } from "@/redux/store";

export const authLink = new ApolloLink((operation, forward) => {
    const { user } = store.getState();
    const { accessToken = "" } = user;

    operation.setContext(() => ({
        headers: { authorization: buildAuthenticationHeader(accessToken) }
    }));

    return forward(operation);
});
