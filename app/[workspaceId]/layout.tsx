// Example file where you should handle auth
// This will ensure the user is authenticated before accessing the pages in this directory

import React from "react";
import { SideBar } from "./SideBar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function ProtectedPathsLayout({
  children,
  params: { workspaceId },
}: Readonly<{
  children: React.ReactNode;
  params: { workspaceId: string };
}>) {
  // some sort of auth check here

  return (
    <TooltipProvider>
      <div className="flex">
        {/* Side bar */}
        <SideBar />

        {/* Page Content */}
        <div
          className="flex-grow bg-primary overflow-x-clip"
          style={{
            boxShadow: "-10px 4px 15px 0px rgba(0, 0, 0, 0.02)",
          }}
        >
          {children}
        </div>
      </div>
    </TooltipProvider>
  );
}
