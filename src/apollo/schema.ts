import { makeExecutableSchema } from "@graphql-tools/schema";
import { usePatientStore } from "@/store/patientStore";
import type { Gender, Status, VisitType } from "@/graphql/types";
import { sleep } from "@/utils/sleep";

export const typeDefs = /* GraphQL */ `
  type Patient {
    id: ID!
    name: String!
    age: Int!
    gender: String!
    conditions: [String!]!
    lastVisit: String!
    status: String!
    visitType: String!
    avatar: String
  }

  input PatientInput {
    name: String!
    age: Int!
    gender: String!
    conditions: [String!]!
    status: String
    visitType: String
    avatar: String
  }

  type PatientConnection {
    nodes: [Patient!]!
    total: Int!
    page: Int!
    pageSize: Int!
  }

  type Query {
    patients(search: String, gender: String, page: Int!, pageSize: Int!): PatientConnection!
  }

  type Mutation {
    addPatient(input: PatientInput!): Patient!
  }
`;

export const resolvers = {
  Query: {
    patients: async (_: unknown, args: { search?: string; gender?: string; page: number; pageSize: number }) => {
      await sleep();
      return usePatientStore.getState().list(args);
    },
  },
  Mutation: {
    addPatient: async (
      _: unknown,
      {
        input,
      }: {
        input: {
          name: string;
          age: number;
          gender: Gender;
          conditions: string[];
          status?: Status;
          visitType?: VisitType;
          avatar?: string | null;
        };
      }
    ) => {
      await sleep();

      const status = input.status ?? "New";
      const visitType = input.visitType ?? "Initial consult";
      const avatar = input.avatar ?? null;
      const conditions = status === "Pending" || status === "New" ? [] : input.conditions ?? [];

      return usePatientStore.getState().add({ ...input, status, visitType, avatar, conditions });
    },
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
