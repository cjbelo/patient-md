import { ApolloClient, InMemoryCache } from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";
import { schema } from "./schema";

export const client = new ApolloClient({
  link: new SchemaLink({ schema }),
  cache: new InMemoryCache({
    typePolicies: {
      Patient: { keyFields: ["id"] },
      Query: {
        fields: {
          patients: {
            keyArgs: ["search", "gender", "page", "pageSize"],
          },
        },
      },
    },
  }),
});
