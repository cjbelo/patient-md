export type Gender = "Male" | "Female" | "Other";
export type Status = "Active" | "Pending" | "New" | "Inactive" | "Discharged";
export type VisitType =
  | "Initial consult"
  | "Follow up"
  | "Post-op"
  | "Annual checkup"
  | "Telemedicine"
  | "Lab results"
  | "Pre-op";

export type Patient = {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  conditions: string[];
  lastVisit: string; // ISO date (YYYY-MM-DD)
  status: Status;
  visitType: VisitType;
  avatar?: string | null; // e.g. "http://static.photos/people/200x200/3"
};

export type PatientConnection = {
  nodes: Patient[];
  total: number;
  page: number;
  pageSize: number;
};
