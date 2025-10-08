import SidePanel from "@/components/SidePanel";
import TopPanel from "@/components/TopPanel";
import type { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidePanel />
      <div className="flex-1 overflow-auto">
        <TopPanel />
        <div className="p-4 md:p-6">{children}</div>
      </div>
    </div>
  );
}
