"use client";

import React from "react";
import { CollapsibleTrigger } from "@/components/ui/collapsible";
import { LayoutLeftIcon } from "@/components/icons/CustomIcons";
import { useSidebar } from "./SidebarContext";

export const SidebarTrigger = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <CollapsibleTrigger asChild>
      <div
        onClick={toggleSidebar}
        className="inline-flex items-center justify-center rounded-xl p-2 h-10 w-10 border border-primary hover:cursor-pointer hover:bg-hover"
      >
        <LayoutLeftIcon className="text-icon-secondary size-[18px]" />
        <span className="sr-only">Toggle Sidebar</span>
      </div>
    </CollapsibleTrigger>
  );
};
