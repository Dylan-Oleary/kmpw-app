import { ApolloClient, DocumentNode } from "@apollo/client";

export type GetQueryCacheResultOpts = {
    cacheKey: string;
    fragment: DocumentNode;
};

export const getFragmentCacheResult = <T extends unknown>(
    client: ApolloClient<any>,
    { cacheKey, fragment }: GetQueryCacheResultOpts
): T => {
    return client.readFragment({
        id: cacheKey,
        fragment
    }) as T;
};
