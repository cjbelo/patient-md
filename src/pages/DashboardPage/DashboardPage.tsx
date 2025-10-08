import React from "react";
import { PlusIcon } from "@phosphor-icons/react";
import AddPatientFormModal from "@/components/AddPatientFormModal";
import RecentActivity from "./RecentActivity";
import RecentPatients from "./RecentPatients";
import Stats from "./Stats";
import UpcomingAppointments from "./UpcomingAppointments";

export default function DashboardPage() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-dark">Dashboard Overview</h2>
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-500 cursor-pointer pointer-fine:hover:-translate-y-1 active:bg-blue-700 transition"
          onClick={() => setOpen(true)}
        >
          <PlusIcon className="w-4 h-4 mr-2" /> New Patient
        </button>
      </div>

      <Stats />
      <RecentPatients />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingAppointments />
        <RecentActivity />
      </div>
      <AddPatientFormModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
