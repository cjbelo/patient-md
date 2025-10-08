import SidePanel from "@/components/SidePanel";
import TopPanel from "@/components/TopPanel";
import { PlusIcon } from "@phosphor-icons/react";
import RecentActivity from "./RecentActivity";
import RecentPatients from "./RecentPatients";
import Stats from "./Stats";
import UpcomingAppointments from "./UpcomingAppointments";

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidePanel />

      <div className="flex-1 overflow-auto">
        <TopPanel />

        <div className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-dark">Dashboard Overview</h2>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-500 hover:bg-blue-700 focus:outline-none">
              <PlusIcon className="w-4 h-4 mr-2" /> New Patient
            </button>
          </div>

          <Stats />
          <RecentPatients />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UpcomingAppointments />
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
}
