"use client";

import React, { useState } from "react";
import { InboxSidebar } from "./InboxSidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
        <div className="h-screen flex-grow bg-primary w-full px-[120px] pt-[100px] pb-[40px] overflow-y-auto">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <Plus className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
          <div className="z-10">{children}</div>
        </div>
      </div>
    </Collapsible>
  );
}
