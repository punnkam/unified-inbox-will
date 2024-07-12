// Helper hook to manage the sidebar state and allow us to toggle it from anywhere in inbox.

import React, { createContext, useContext, useState, useEffect } from "react";
import { useWindowSize } from "@/lib/hooks/useWindowSize";

const SidebarContext = createContext<any>(null);

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const size = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);
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
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  return useContext(SidebarContext);
};
