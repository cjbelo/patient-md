import { useLogoutRedirect } from "@/hooks/useLogoutRedirect";
import { useUIStore } from "@/store/uiStore";
import {
  BellIcon,
  DotsThreeOutlineVerticalIcon,
  MagnifyingGlassIcon,
  SignOutIcon,
  UserIcon,
  type IconProps,
} from "@phosphor-icons/react";

const IconButton = ({ Icon, onClick }: { Icon: React.ComponentType<IconProps>; onClick?: () => void }) => (
  <button
    className="text-gray-400 cursor-pointer pointer-fine:hover:text-gray-700 focus:outline-none"
    onClick={onClick}
  >
    <Icon className="w-5 h-5" />
  </button>
);

export default function TopPanel() {
  const { search, setSearch } = useUIStore();
  const handleLogout = useLogoutRedirect();

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <div className="flex items-center md:hidden">
          <button className="text-gray-500 focus:outline-none">
            <DotsThreeOutlineVerticalIcon weight="fill" className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 max-w-md ml-4 md:ml-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="text-gray-400 w-4 h-4" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search patients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <IconButton Icon={BellIcon} />
          <IconButton Icon={UserIcon} />
          <IconButton Icon={SignOutIcon} onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
}
