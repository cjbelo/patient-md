import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { ADD_PATIENT } from "@/graphql/operations";

export default function AddPatientForm() {
  const [input, setInput] = useState({ name: "", age: "", gender: "Male", condition: "" });
  const [error, setError] = useState<string | null>(null);

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
    if (!input.name.trim() || !input.condition.trim() || Number.isNaN(ageNum) || ageNum <= 0) {
      setError("Please provide a valid name, positive age, and condition.");
      return;
    }
    setError(null);
    await addPatient({
      variables: {
        input: { name: input.name.trim(), age: ageNum, gender: input.gender, conditions: [input.condition.trim()] },
      },
    });
    setInput({ name: "", age: "", gender: "Male", condition: "" });
  };

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow p-4 grid sm:grid-cols-5 gap-3">
      <input
        className="rounded border px-3 py-2"
        placeholder="Name"
        value={input.name}
        onChange={(e) => setInput({ ...input, name: e.target.value })}
      />
      <input
        className="rounded border px-3 py-2"
        placeholder="Age"
        inputMode="numeric"
        value={input.age}
        onChange={(e) => setInput({ ...input, age: e.target.value })}
      />
      <select
        className="rounded border px-3 py-2"
        value={input.gender}
        onChange={(e) => setInput({ ...input, gender: e.target.value })}
      >
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
      <input
        className="rounded border px-3 py-2"
        placeholder="Condition"
        value={input.condition}
        onChange={(e) => setInput({ ...input, condition: e.target.value })}
      />
      <button disabled={loading} className="rounded bg-black text-white px-4 py-2 disabled:opacity-50">
        {loading ? "Adding..." : "Add Patient"}
      </button>
      {error && <div className="sm:col-span-5 text-sm text-red-600">{error}</div>}
    </form>
  );
}
