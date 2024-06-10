// Example file where you should handle auth
// This will ensure the user is authenticated before accessing the pages in this directory

import React from "react";
import { SideBar } from "./SideBar";

export default function ProtectedPathsLayout({
  children,
  params: { workspaceId },
}: Readonly<{
  children: React.ReactNode;
  params: { workspaceId: string };
}>) {
  // some sort of auth check here

  return (
    <div className="flex">
      {/* Side bar */}
      <SideBar />

      {/* Page Content */}
      <div className="flex-grow bg-primary">{children}</div>
    </div>
  );
}
