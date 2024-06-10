"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { SettingsSidebar } from "./SettingsSidebar";

export default function ProtectedPathsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();

  // If the user dosnt have a settings path, redirect to the first one
  if (pathname == "/settings") {
    router.replace("/settings/personal-notifications");
    return;
  }

  return (
    <div className="flex">
      {/* Side bar */}
      <SettingsSidebar />

      {/* Page Content */}
      <div className="h-screen flex-grow bg-primary w-full px-[120px] pt-[100px] pb-[40px] overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
