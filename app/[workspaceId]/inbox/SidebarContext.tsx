// Helper hook to manage the sidebar state and allow us to toggle it from anywhere in inbox.

import React, { createContext, useContext, useState } from "react";
import { useWindowSize } from "@/lib/hooks/useWindowSize";

const SidebarContext = createContext<any>(null);

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const size = useWindowSize();
  const [isOpen, setIsOpen] = useState(size.width && size.width > 1024); // default to open on desktop (hide on mobile)

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
