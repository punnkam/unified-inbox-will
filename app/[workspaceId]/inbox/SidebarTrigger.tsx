"use client";

import React from "react";
import { CollapsibleTrigger } from "@/components/ui/collapsible";
import { LayoutLeftIcon } from "@/components/icons/CustomIcons";
import { useSidebar } from "./SidebarContext";

export const SidebarTrigger = () => {
  const { toggleSidebar, isOpen } = useSidebar();

  return (
    <CollapsibleTrigger asChild>
      <div
        onClick={toggleSidebar}
        className={`inline-flex items-center justify-center rounded-xl p-2 h-10 w-10 hover:cursor-pointer hover:bg-hover ${
          isOpen ? "bg-white border border-primary" : ""
        }`}
        style={
          isOpen ? { boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.05)" } : {}
        }
      >
        <LayoutLeftIcon className="text-icon-secondary size-[18px]" />
        <span className="sr-only">Toggle Sidebar</span>
      </div>
    </CollapsibleTrigger>
  );
};
