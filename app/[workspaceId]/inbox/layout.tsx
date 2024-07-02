"use client";

import React from "react";
import { SidebarProvider, useSidebar } from "./SidebarContext";
import { TableProvider } from "./TableContext";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { InboxSidebar } from "./content/inbox-landing/InboxSidebar";
import { cn } from "@/lib/utils";
import { useTableContext } from "./TableContext";
import { InboxChatSidebar } from "./content/operations/InboxChatSidebar";

export default function InboxLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TableProvider>
      <SidebarProvider>
        <InboxLayoutContent>{children}</InboxLayoutContent>
      </SidebarProvider>
    </TableProvider>
  );
}

function InboxLayoutContent({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar();
  const { view } = useTableContext();

  if (view === "landing") {
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

  if (view === "chat") {
    return (
      <Collapsible open={isOpen} className="space-y-2">
        <div className="flex">
          {/* Side bar */}
          {/* <CollapsibleContent className="CollapsibleContent space-y-2"> */}
          <InboxChatSidebar />
          {/* </CollapsibleContent> */}

          {/* Page Content */}
          <div
            className={cn(
              "h-screen flex-grow bg-primary md:overflow-clip relative",
              isOpen
                ? "w-0 overflow-hidden sm:w-[calc(100vw-80px-300px)]"
                : "w-[calc(100vw-80px)]"
            )}
          >
            {children}
          </div>
        </div>
      </Collapsible>
    );
  }
}
