"use client";

import React from "react";
import { InboxSidebar } from "./InboxSidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SidebarProvider, useSidebar } from "./SidebarContext";

export default function InboxLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <InboxLayoutContent>{children}</InboxLayoutContent>
    </SidebarProvider>
  );
}

function InboxLayoutContent({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar();

  return (
    <Collapsible open={isOpen} className="space-y-2">
      <div className="flex">
        {/* Side bar */}
        <CollapsibleContent className="CollapsibleContent space-y-2">
          <InboxSidebar />
        </CollapsibleContent>

        {/* Page Content */}
        <div className="h-screen flex-grow bg-primary w-full px-[120px] pt-[100px] pb-[40px] overflow-y-auto">
          {children}
        </div>
      </div>
    </Collapsible>
  );
}
