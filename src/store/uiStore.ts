import { create } from "zustand";

interface UIState {
  page: number;
  pageSize: number;
  search: string;
  gender?: "Male" | "Female" | "Other" | "";
  setPage: (p: number) => void;
  setSearch: (s: string) => void;
  setGender: (g?: UIState["gender"]) => void;
  reset: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  page: 1,
  pageSize: 5,
  search: "",
  gender: "",
  setPage: (p) => set({ page: p }),
  setSearch: (s) => set({ search: s, page: 1 }),
  setGender: (g) => set({ gender: g ?? "", page: 1 }),
  reset: () => set({ page: 1, pageSize: 5, search: "", gender: "" }),
}));
