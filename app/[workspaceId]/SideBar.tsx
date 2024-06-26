"use client";

import React from "react";
import {
  HostAiIcon,
  BankNoteIcon,
  BookOpenIcon,
  HomeLineIcon,
  InboxIcon,
  LayersThreeIcon,
  LayoutAltIcon,
  SettingsIcon,
  BellIcon,
} from "@/components/icons/CustomIcons";
import { SideBarIcon } from "./SideBarOption";
import { usePathname } from "next/navigation";

export const SideBar = () => {
  const pathname = usePathname();

  // Get the second element of path
  // e.g. /will/home -> home
  // the first element is the workspace name
  const workspace = pathname.split("/")[1];
  const path = pathname.split("/")[2];

  return (
    <div className="h-screen overflow-y-auto w-fit min-w-fit flex flex-col justify-between items-center bg-primary-subtle border border-primary px-4 pt-6 pb-8">
      <div className="flex flex-col items-center">
        <HostAiIcon />
        <div className="mt-5 flex flex-col items-center gap-5">
          <SideBarIcon
            path={`/${workspace}/home`}
            icon={<HomeLineIcon />}
            selected={path == "home"}
          />
          <SideBarIcon
            path={`/${workspace}/inbox/all-conversations`}
            icon={<InboxIcon />}
            selected={path == "inbox"}
          />
          <SideBarIcon
            path={`/${workspace}/three`}
            icon={<LayersThreeIcon />}
            selected={path == "three"}
          />
          <SideBarIcon
            path={`/${workspace}/money`}
            icon={<BellIcon />}
            selected={path == "money"}
          />
          <SideBarIcon
            path={`/${workspace}/layout`}
            icon={<LayoutAltIcon />}
            selected={path == "layout"}
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-[20px]">
        {/* settings and book */}
        <SideBarIcon
          path={`/${workspace}/settings/personal-notifications`}
          icon={<SettingsIcon />}
          selected={path == "settings"}
        />
        <SideBarIcon
          path={`/${workspace}/guide`}
          icon={<BookOpenIcon />}
          selected={path == "guide"}
        />

        {/* User Image */}
        <div className="mt-16">
          <img
            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="User Image"
            className="rounded-full w-[36px] h-[36px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};
