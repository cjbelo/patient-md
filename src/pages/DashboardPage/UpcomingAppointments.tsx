import {
  CalendarBlankIcon,
  CalendarCheckIcon,
  CalendarDotIcon,
  CalendarHeartIcon,
  VideoCameraIcon,
} from "@phosphor-icons/react";

export default function UpcomingAppointments() {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-medium leading-6 text-dark">Upcoming Appointments</h3>
        <a href="#" className="text-sm text-blue-500 hover:text-blue-700 font-medium">
          View calendar
        </a>
      </div>
      <div className="divide-y divide-gray-200">
        <div className="p-4 hover:bg-gray-50 transition-slow">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 bg-opacity-20 flex items-center justify-center">
              <CalendarHeartIcon className="text-green-500 w-5 h-5" />
            </div>
            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-dark truncate">John Smith</p>
                <p className="text-xs text-gray-500">9:30 AM</p>
              </div>
              <p className="text-sm text-gray-500">Cardiology follow-up</p>
            </div>
          </div>
        </div>

        <div className="p-4 hover:bg-gray-50 transition-slow">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
              <VideoCameraIcon className="text-purple-600 w-5 h-5" />
            </div>
            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-dark truncate">Lisa Anderson</p>
                <p className="text-xs text-gray-500">11:00 AM</p>
              </div>
              <p className="text-sm text-gray-500">Video consultation</p>
            </div>
          </div>
        </div>

        <div className="p-4 hover:bg-gray-50 transition-slow">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <CalendarDotIcon className="text-blue-500 w-5 h-5" />
            </div>
            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-dark truncate">Robert Taylor</p>
                <p className="text-xs text-gray-500">2:15 PM</p>
              </div>
              <p className="text-sm text-gray-500">Initial consultation</p>
            </div>
          </div>
        </div>

        <div className="p-4 hover:bg-gray-50 transition-slow">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
              <CalendarBlankIcon className="text-yellow-600 w-5 h-5" />
            </div>
            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-dark truncate">Amanda Clark</p>
                <p className="text-xs text-gray-500">4:30 PM</p>
              </div>
              <p className="text-sm text-gray-500">Post-surgery check</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
