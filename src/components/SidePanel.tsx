import { useLogoutRedirect } from "@/hooks/useLogoutRedirect";
import { APP_NAME } from "@/utils/constants";
import {
  CalendarDotIcon,
  FileTextIcon,
  GearIcon,
  HouseIcon,
  PulseIcon,
  SignOutIcon,
  UsersIcon,
  VideoCameraIcon,
  type IconProps,
} from "@phosphor-icons/react";
import type React from "react";
import { Link } from "react-router-dom";

const menuItems = [
  { Icon: HouseIcon, label: "Dashboard", path: "/dashboard", active: true },
  { Icon: UsersIcon, label: "Patients", path: "/patients" },
  { Icon: CalendarDotIcon, label: "Appointments", path: "/appointments" },
  { Icon: VideoCameraIcon, label: "Video Consult", path: "/video-consultation" },
  { Icon: FileTextIcon, label: "Reports", path: "/reports" },
  { Icon: GearIcon, label: "Settings", path: "/settings" },
];

type MenuItemProps = {
  Icon: React.ComponentType<IconProps>;
  label: string;
  path: string;
  active?: boolean;
};

const MenuItem: React.FC<MenuItemProps> = ({ Icon, label, path, active }) => {
  return (
    <Link
      to={path}
      className={[
        "sidebar-item flex items-center px-4 py-2 text-sm font-medium rounded-lg",
        active ? "active text-dark" : "text-gray-600 hover:text-dark",
      ].join(" ")}
    >
      <Icon className="w-4 h-4 mr-3" />
      {label}
    </Link>
  );
};

export default function SidePanel() {
  const handleLogout = useLogoutRedirect();

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
        <div className="flex items-center h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="bg-blue-500 p-2 rounded-lg mr-3">
              <PulseIcon className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-dark">{APP_NAME}</h1>
          </div>
        </div>
        <div className="flex flex-col flex-grow px-4 py-4 overflow-y-auto">
          <nav className="flex-1 space-y-2">
            {menuItems.map(({ Icon, label, path, active }) => (
              <MenuItem key={label} Icon={Icon} label={label} path={path} active={active} />
            ))}
          </nav>

          <div className="mt-auto pb-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center">
                <img
                  className="h-10 w-10 rounded-full"
                  src="http://static.photos/people/200x200/11"
                  alt="User profile"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-dark">CJ Belo</p>
                  <p className="text-xs text-gray-500">Full-stack Engineer</p>
                </div>
              </div>
              <button
                className="mt-3 w-full flex items-center justify-center px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white cursor-pointer pointer-fine:hover:-translate-y-1 active:scale-98 transition"
                onClick={handleLogout}
              >
                <SignOutIcon className="w-4 h-4 mr-2" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
