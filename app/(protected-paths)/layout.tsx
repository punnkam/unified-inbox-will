// Example file where you should handle auth
// This will ensure the user is authenticated before accessing the pages in this directory

import React from "react";
import HostAiIcon from "../components/icons/HostAiIcon";
import BankNoteIcon from "../components/icons/BankNoteIcon";
import BookOpenIcon from "../components/icons/BookOpenIcon";
import HomeLineIcon from "../components/icons/HomeLineIcon";
import InboxIcon from "../components/icons/InboxIcon";
import LayersThreeIcon from "../components/icons/LayersThreeIcon";
import LayoutAltIcon from "../components/icons/LayoutAltIcon";
import SettingsIcon from "../components/icons/SettingsIcon";

export default function ProtectedPathsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // some sort of auth check here

  return (
    <div className="flex">
      {/* Side bar */}
      <div className="h-screen w-fit flex flex-col justify-between items-center bg-primary-subtle stroke-primary px-4 pt-6 pb-8">
        <div className="flex flex-col items-center">
          <HostAiIcon />
          <div className="mt-5 flex flex-col items-center gap-5">
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <HomeLineIcon className="text-icon-secondary" />
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <InboxIcon className="text-icon-secondary" />
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <LayersThreeIcon className="text-icon-secondary" />
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <BankNoteIcon className="text-icon-secondary" />
            </div>

            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <LayoutAltIcon className="text-icon-secondary" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-[20px]">
          {/* settings and book */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center">
            <SettingsIcon className="text-icon-secondary" />
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center">
            <BookOpenIcon className="text-icon-secondary" />
          </div>

          <div className="mt-16">
            {/* User Image */}
            <img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Vercel Logo"
              width={36}
              height={36}
              className="rounded-full w-[36px] h-[36px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="flex-grow bg-primary">{children}</div>
    </div>
  );
}
