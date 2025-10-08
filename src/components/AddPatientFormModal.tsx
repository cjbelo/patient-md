import React from "react";
import { useMutation } from "@apollo/client/react";
import { ADD_PATIENT } from "@/graphql/operations";
import Spinner from "@/components/Spinner";
import { XIcon, UserPlusIcon } from "@phosphor-icons/react";

type Props = { open: boolean; onClose: () => void };

export default function AddPatientFormModal({ open, onClose }: Props) {
  const [input, setInput] = React.useState({ name: "", age: "", gender: "Male", condition: "" });
  const [error, setError] = React.useState<string | null>(null);

  const [addPatient, { loading }] = useMutation(ADD_PATIENT, {
    update(cache: any, { data }: any) {
      cache.modify({
        fields: {
          patients(existing: any) {
            if (!existing || !data?.addPatient) return existing;
            const withNew = [data.addPatient, ...existing.nodes];
            return { ...existing, nodes: withNew, total: existing.total + 1 };
          },
        },
      });
    },
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ageNum = Number(input.age);
    const conditions = input.condition
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (!input.name.trim() || Number.isNaN(ageNum) || ageNum <= 0) {
      setError("Please provide a valid name and positive age.");
      return;
    }
    setError(null);

    try {
      await addPatient({
        variables: {
          input: {
            name: input.name.trim(),
            age: ageNum,
            gender: input.gender as "Male" | "Female" | "Other",
            conditions, // ← parsed array
            status: "Active", // ← send explicit status
            visitType: "Initial consult", // ← send visit type too
            avatar: null,
          },
        },
        // simpler & correct with paginated field args: just refetch
        refetchQueries: ["Patients"],
      });
      setInput({ name: "", age: "", gender: "Male", condition: "" });
      onClose();
    } catch (err: any) {
      setError(err?.message ?? "Failed to add patient.");
    }
  };

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative inline-block w-full max-w-lg rounded-lg bg-white shadow-xl">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
              <UserPlusIcon className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Add New Patient</h3>
          </div>
          <button
            aria-label="Close"
            onClick={onClose}
            className="p-2 rounded cursor-pointer pointer-fine:hover:bg-gray-100 text-gray-600"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First name</label>
            <input
              className="rounded border px-3 py-2 w-full"
              placeholder="Name"
              value={input.name}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                className="rounded border px-3 py-2 w-full"
                placeholder="Age"
                inputMode="numeric"
                value={input.age}
                onChange={(e) => setInput({ ...input, age: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                className="rounded border px-3 py-2 w-full"
                value={input.gender}
                onChange={(e) => setInput({ ...input, gender: e.target.value })}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Conditions <span className="text-gray-400">(comma-separated)</span>
            </label>
            <input
              className="rounded border px-3 py-2 w-full"
              placeholder="Condition"
              value={input.condition}
              onChange={(e) => setInput({ ...input, condition: e.target.value })}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 cursor-pointer pointer-fine:hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-md px-4 py-2 bg-blue-600 text-white text-sm font-medium cursor-pointer pointer-fine:hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Spinner size="sm" /> Adding...
                </span>
              ) : (
                "Add Patient"
              )}
            </button>
          </div>
          {error && <div className="text-sm text-rose-600">{error}</div>}
        </form>
      </div>
    </div>
  );
}
