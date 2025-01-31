import "server-only";
import {HttpLink} from "@apollo/client";
import {
    registerApolloClient,
    ApolloClient,
    InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

const httpLink = new HttpLink({
    uri: process.env.SERVER_API_STRING,
});

const cache = new InMemoryCache({ addTypename: false });

export const { getClient, query } = registerApolloClient(() => {
    return new ApolloClient({
        cache,
        link: httpLink,
        defaultOptions: {
            query: {
                errorPolicy: "all"
            }
        }
    });
});