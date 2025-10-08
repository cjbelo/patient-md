import PatientList from "@/components/PatientList";
import AddPatientForm from "@/components/AddPatientForm";

export default function DashboardPage() {
  return (
    <div className="min-h-screen text-gray-900">
      <header className="p-6 border-b bg-white">
        <h1 className="text-2xl font-semibold">Patient MD</h1>
        <p className="text-sm text-gray-500">React + TS + Tailwind + Apollo (SchemaLink) + Zustand</p>
      </header>

      <main className="max-w-5xl mx-auto p-6 space-y-6">
        <AddPatientForm />
        <PatientList />
      </main>
    </div>
  );
}
