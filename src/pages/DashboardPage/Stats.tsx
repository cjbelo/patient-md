import StatsCard from "@/components/StatsCard";
import { CalendarDotsIcon, ClockIcon, UsersIcon, VideoCameraIcon } from "@phosphor-icons/react";

export default function Stats() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
      <StatsCard
        title="Total Patients"
        value="1,234"
        deltaPercent={12}
        trend="up"
        Icon={UsersIcon}
        iconBgClassName="bg-blue-100"
        iconClassName="text-blue-500"
      />
      <StatsCard
        title="Today's Appointments"
        value={15}
        deltaPercent={12}
        trend="down"
        Icon={CalendarDotsIcon}
        iconBgClassName="bg-green-100"
        iconClassName="text-green-500"
      />
      <StatsCard
        title="Video Consultations"
        value={8}
        deltaPercent={45}
        trend="up"
        Icon={VideoCameraIcon}
        iconBgClassName="bg-purple-100"
        iconClassName="text-purple-500"
      />
      <StatsCard
        title="Avg. Wait Time"
        value="12 min"
        deltaPercent={3}
        trend="up"
        Icon={ClockIcon}
        iconBgClassName="bg-yellow-100"
        iconClassName="text-yellow-500"
      />
    </div>
  );
}
