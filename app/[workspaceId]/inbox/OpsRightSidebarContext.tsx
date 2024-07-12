// Helper hook to manage the sidebar state and allow us to toggle it from anywhere in inbox.

import React, { createContext, useContext, useState, useEffect } from "react";
import { useWindowSize } from "@/lib/hooks/useWindowSize";
import { TaskItem, UpsellItem } from "@/lib/realDataSchema";

const OpsRightSidebarContext = createContext<any>(null);

export const OpsRightSidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const size = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<
    | "default"
    | { type: "upsell"; data: UpsellItem }
    | { type: "task"; data: TaskItem }
    | { type: "phone"; id: string }
    | { type: "notes"; id: string }
  >("default");
  const [initialLoad, setInitialLoad] = useState(false);

  // open sidebar by default on desktop
  useEffect(() => {
    if (size.width && size.width > 705 && !isOpen && !initialLoad) {
      setIsOpen(true);
      setInitialLoad(true);
    }
  }, [size, initialLoad]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <OpsRightSidebarContext.Provider
      value={{ isOpen, toggleSidebar, selectedTab, setSelectedTab }}
    >
      {children}
    </OpsRightSidebarContext.Provider>
  );
};

export const useOpsRightSidebar = () => {
  return useContext(OpsRightSidebarContext);
};
