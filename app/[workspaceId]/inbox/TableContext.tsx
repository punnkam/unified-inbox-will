import React, { createContext, useContext, useState, ReactNode } from "react";
import { ColumnDef, ColumnFiltersState } from "@tanstack/react-table";
import { usePathname } from "next/navigation";
import { Conversation } from "@/lib/realDataSchema";

interface TableContextType {
  columnFilters: ColumnFiltersState;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  view: "landing" | "chat";
  setView: React.Dispatch<React.SetStateAction<"landing" | "chat">>;
  operationsData?: {
    referall: string;
  };
  data: Conversation[];
  setData: React.Dispatch<React.SetStateAction<Conversation[]>>;
  columns: ColumnDef<Conversation>[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnDef<Conversation>[]>>;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider = ({ children }: { children: ReactNode }) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    {
      id: "messageStatus",
      value: false,
    },
  ]);

  const [data, setData] = useState<Conversation[]>([]);
  const [columns, setColumns] = useState<ColumnDef<Conversation>[]>([]);

  const pathname = usePathname();

  // if on chat page set inital view to chat
  const [view, setView] = useState<"landing" | "chat">(
    pathname.split("/")[4] === "chat" ? "chat" : "landing"
  );

  // TODO: this
  const referallMap = {
    "all-conversations": {
      title: "All Conversations",
    },
    "unassigned-conversations": {
      title: "Unassigned Conversations",
    },
    "your-conversations": {
      title: "Your Conversations",
    },
  };

  return (
    <TableContext.Provider
      value={{
        columnFilters,
        setColumnFilters,
        view,
        setView,
        data,
        setData,
        columns,
        setColumns,
      }}
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
