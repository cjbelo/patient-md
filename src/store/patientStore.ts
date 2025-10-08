import type { Patient } from "@/graphql/types";
import { mockPatientData } from "@/mockData/patientData";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type PatientState = {
  patients: Patient[];
  add: (p: Omit<Patient, "id" | "lastVisit">) => Patient;
  list: (args: { search?: string; gender?: string; page: number; pageSize: number }) => {
    nodes: Patient[];
    total: number;
    page: number;
    pageSize: number;
  };
  reset: () => void;
};

export const usePatientStore = create<PatientState>()(
  persist(
    (set, get) => ({
      patients: mockPatientData,
      add: (input) => {
        const p: Patient = {
          id: String(Date.now()),
          lastVisit: new Date().toISOString().slice(0, 10),
          ...input,
        };
        set({ patients: [p, ...get().patients] });
        return p;
      },
      list: ({ search = "", gender, page, pageSize }) => {
        const s = search.trim().toLowerCase();
        const filtered = get().patients.filter((p) => {
          const byGender = !gender || p.gender === gender;
          const bySearch =
            !s || p.name.toLowerCase().includes(s) || p.conditions.some((c) => c.toLowerCase().includes(s));
          return byGender && bySearch;
        });
        const total = filtered.length;
        const start = (page - 1) * pageSize;
        const nodes = filtered.slice(start, start + pageSize);
        return { nodes, total, page, pageSize };
      },
      reset: () => set({ patients: mockPatientData }),
    }),
    {
      name: "patient-md-patients",
      version: 4,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
