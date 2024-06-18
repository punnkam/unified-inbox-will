"use client";

import React, { useState } from "react";
import { InboxSidebar } from "./InboxSidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { LayoutLeftIcon } from "@/components/icons/CustomIcons";

export default function InboxLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
      <div className="flex">
        {/* Side bar */}

        <CollapsibleContent className="CollapsibleContent space-y-2">
          <InboxSidebar />
        </CollapsibleContent>

        {/* Page Content */}
        <div className="h-screen flex-grow bg-primary w-full px-[120px] pt-[100px] pb-[40px] overflow-y-auto flex items-center">
          <CollapsibleTrigger asChild>
            <div className="inline-flex items-center justify-center rounded-xl p-2 h-10 w-10 border border-primary hover:cursor-pointer hover:bg-hover">
              <LayoutLeftIcon className=" text-icon-secondary size-[18px]" />
              <span className="sr-only">Toggle</span>
            </div>
          </CollapsibleTrigger>
          <div>{children}</div>
        </div>
      </div>
    </Collapsible>
  );
}
