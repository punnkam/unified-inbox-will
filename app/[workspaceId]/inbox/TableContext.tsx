import React, { createContext, useContext, useState, ReactNode } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";
import { usePathname } from "next/navigation";

interface TableContextType {
  columnFilters: ColumnFiltersState;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  view: "landing" | "chat";
  setView: React.Dispatch<React.SetStateAction<"landing" | "chat">>;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider = ({ children }: { children: ReactNode }) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    {
      id: "messageStatus",
      value: false,
    },
  ]);

  const pathname = usePathname();

  // if on chat page set inital view to chat
  const [view, setView] = useState<"landing" | "chat">(
    pathname.split("/")[4] === "chat" ? "chat" : "landing"
  );

  return (
    <TableContext.Provider
      value={{ columnFilters, setColumnFilters, view, setView }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider");
  }
  return context;
};
