import { gql } from "@apollo/client";

export const GET_PATIENTS = gql`
  query Patients($search: String, $gender: String, $page: Int!, $pageSize: Int!) {
    patients(search: $search, gender: $gender, page: $page, pageSize: $pageSize) {
      total
      page
      pageSize
      nodes {
        id
        name
        age
        gender
        conditions
        lastVisit
        status
        visitType
        avatar
      }
    }
  }
`;

export const ADD_PATIENT = gql`
  mutation AddPatient($input: PatientInput!) {
    addPatient(input: $input) {
      id
      name
      age
      gender
      conditions
      lastVisit
      status
      visitType
      avatar
    }
  }
`;
