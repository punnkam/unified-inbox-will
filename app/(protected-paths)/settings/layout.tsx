import React from "react";
import { SettingsSidebar } from "./SettingsSidebar";

export default function ProtectedPathsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      {/* Side bar */}
      <SettingsSidebar />

      {/* Page Content */}
      <div className="flex-grow bg-primary w-full px-[120px] pt-[100px] pb-[40px]">
        {children}
      </div>
    </div>
  );
}
