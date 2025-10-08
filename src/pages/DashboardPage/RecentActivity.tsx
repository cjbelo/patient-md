import { CheckIcon, FileTextIcon, VideoCameraIcon, WarningIcon } from "@phosphor-icons/react";

export default function RecentActivity() {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-dark">Recent Activity</h3>
      </div>
      <div className="divide-y divide-gray-200">
        <div className="p-4 hover:bg-gray-50 transition-slow">
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckIcon className="text-green-600 w-5 h-5" />
              </div>
            </div>
            <div className="ml-4">
              <div className="text-sm text-gray-500">
                <p>
                  Patient <span className="font-medium text-dark">Michael Brown</span> completed his treatment plan
                </p>
              </div>
              <div className="mt-1 text-xs text-gray-400">
                <p>30 minutes ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 hover:bg-gray-50 transition-slow">
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <FileTextIcon className="text-blue-500 w-5 h-5" />
              </div>
            </div>
            <div className="ml-4">
              <div className="text-sm text-gray-500">
                <p>
                  New lab results received for <span className="font-medium text-dark">Emily Johnson</span>
                </p>
              </div>
              <div className="mt-1 text-xs text-gray-400">
                <p>2 hours ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 hover:bg-gray-50 transition-slow">
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <VideoCameraIcon className="text-purple-600 w-5 h-5" />
              </div>
            </div>
            <div className="ml-4">
              <div className="text-sm text-gray-500">
                <p>
                  Video consultation with <span className="font-medium text-dark">David Wilson</span> was completed
                </p>
              </div>
              <div className="mt-1 text-xs text-gray-400">
                <p>Yesterday</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 hover:bg-gray-50 transition-slow">
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <WarningIcon className="text-yellow-600 w-5 h-5" />
              </div>
            </div>
            <div className="ml-4">
              <div className="text-sm text-gray-500">
                <p>
                  Medication alert for <span className="font-medium text-dark">Sarah Williams</span>: Refill needed
                </p>
              </div>
              <div className="mt-1 text-xs text-gray-400">
                <p>May 14, 2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
