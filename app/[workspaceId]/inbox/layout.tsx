"use client";

import React from "react";
import { InboxSidebar } from "./InboxSidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SidebarProvider, useSidebar } from "./SidebarContext";
import { cn } from "@/lib/utils";

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
        <div
          className={cn(
            "h-screen flex-grow bg-primary md:overflow-clip relative",
            isOpen
              ? "w-0 overflow-hidden sm:w-[calc(100vw-80px-280px)]"
              : "w-[calc(100vw-80px)]"
          )}
        >
          {children}
        </div>
      </div>
    </Collapsible>
  );
}
