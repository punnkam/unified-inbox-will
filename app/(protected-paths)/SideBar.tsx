"use client";

import React from "react";
import HostAiIcon from "../components/icons/HostAiIcon";
import BankNoteIcon from "../components/icons/BankNoteIcon";
import BookOpenIcon from "../components/icons/BookOpenIcon";
import HomeLineIcon from "../components/icons/HomeLineIcon";
import InboxIcon from "../components/icons/InboxIcon";
import LayersThreeIcon from "../components/icons/LayersThreeIcon";
import LayoutAltIcon from "../components/icons/LayoutAltIcon";
import SettingsIcon from "../components/icons/SettingsIcon";
import { SideBarIcon } from "./SideBarOption";
import { usePathname } from "next/navigation";

export const SideBar = () => {
  const pathname = usePathname();

  return (
    <div className="h-screen w-fit flex flex-col justify-between items-center bg-primary-subtle stroke-primary px-4 pt-6 pb-8">
      <div className="flex flex-col items-center">
        <HostAiIcon />
        <div className="mt-5 flex flex-col items-center gap-5">
          <SideBarIcon
            path={"/home"}
            icon={<HomeLineIcon />}
            selected={pathname == "/home"}
          />
          <SideBarIcon
            path={"/inbox"}
            icon={<InboxIcon />}
            selected={pathname == "/inbox"}
          />
          <SideBarIcon
            path={"/three"}
            icon={<LayersThreeIcon />}
            selected={pathname == "/three"}
          />
          <SideBarIcon
            path={"/money"}
            icon={<BankNoteIcon />}
            selected={pathname == "/money"}
          />
          <SideBarIcon
            path={"/layout"}
            icon={<LayoutAltIcon />}
            selected={pathname == "/layout"}
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-[20px]">
        {/* settings and book */}
        <SideBarIcon
          path={"/settings"}
          icon={<SettingsIcon />}
          selected={pathname == "/settings"}
        />
        <SideBarIcon
          path={"/guide"}
          icon={<BookOpenIcon />}
          selected={pathname == "/guide"}
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
