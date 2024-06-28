"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Conversation, ConversationTag, Member } from "@/lib/realDataSchema";
import { toast } from "sonner";
import { InboxLandingView } from "./inboxLandingView";
import { InboxOperationsView } from "./operationsView";

export type ConversationTable = ReturnType<typeof useReactTable<Conversation>>;

interface DataTableProps {
  columns: ColumnDef<Conversation>[];
  data: Conversation[];
  conversationLabels: (ConversationTag & {
    numberOfUses: number;
  })[];
  availableMembers: Member[];
  title: string;
  conversationPath?: string;
  view: "landing" | "chat";
}

export function InboxParent({
  columns,
  data,
  conversationLabels,
  availableMembers,
  title,
  conversationPath,
  view,
}: DataTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    {
      id: "messageStatus",
      value: false,
    },
  ]);

  // API: Function to handle mark selected rows as unread
  const handleMarkUnread = (table: ConversationTable) => {
    const count = table.getSelectedRowModel().rows.length;

    // If no rows are selected, return
    if (count === 0) {
      return;
    }

    table.getSelectedRowModel().rows.map((row) => {
      const rowData = row.original as Conversation;
      console.log("Mark as unread", rowData);

      // Do something with the rows to mark them as unread

      // Unselect the rows after update (either refresh or this manual way)
      row.toggleSelected(false);
    });

    // Placeholder toast message
    toast.success(`${count} conversations marked as unread`);
  };

  // API: Function to handle mark selected rows as done
  const handleMarkDone = (table: ConversationTable) => {
    const count = table.getSelectedRowModel().rows.length;

    // If no rows are selected, return
    if (count === 0) {
      return;
    }

    table.getSelectedRowModel().rows.map((row) => {
      const rowData = row.original as Conversation;
      console.log("Mark as done", rowData);

      // Do something with the rows to mark them as done

      // Unselect the rows after update (either refresh or this manual way)
      row.toggleSelected(false);
    });

    // Placeholder toast message
    toast.success(`${count} conversations marked as done`);
  };

  // API: Placeholder function to assign a member to selected rows
  const handleAssign = (table: ConversationTable, member: Member) => {
    const count = table.getSelectedRowModel().rows.length;

    // If no rows are selected, return
    if (count === 0) {
      return;
    }

    table.getSelectedRowModel().rows.map((row) => {
      const rowData = row.original as Conversation;
      console.log("Assign", rowData, "to", member);

      // Do something with the rows to assign them to a member

      // Unselect the rows after update (either refresh or this manual way)
      row.toggleSelected(false);
    });

    // Placeholder toast message
    toast.success(`${count} conversations assigned to ${member.name}`);
  };

  // Function to clear all filters except for search and tab
  const clearFilters = (table: ConversationTable) => {
    columnFilters.forEach((filter) => {
      if (
        // guestName comes from search
        // messageStatus is the tab
        filter.id === "guestName" ||
        filter.id === "messageStatus"
      ) {
        return;
      }
      table.getColumn(filter.id)?.setFilterValue(null);
    });
  };

  const handleTabChange = (table: ConversationTable, tab: boolean) => {
    console.log("Tab change", tab);
    table.getColumn("messageStatus")?.setFilterValue(tab);
  };

  // Helper for filtering dropdown
  const handleFilterChange = (
    table: ConversationTable,
    columnId: string,
    value: string
  ) => {
    table.getColumn(columnId)?.setFilterValue(value);
  };

  // Function to remove filter tag groups
  const removeFilter = (columnId: string, filterKey: string) => {
    setColumnFilters((prevFilters) =>
      prevFilters.map((filter) => {
        if (
          filter.id === columnId &&
          typeof filter.value === "object" &&
          filter.value !== null
        ) {
          const newValue = { ...(filter.value as Record<string, unknown>) };
          delete newValue[filterKey];
          return { ...filter, value: newValue };
        }
        return filter;
      })
    );
  };

  if (view === "chat") {
    return (
      <InboxOperationsView
        title={title}
        conversationLabels={conversationLabels}
        availableMembers={availableMembers}
        columns={columns}
        data={data}
        handleTabChange={handleTabChange}
        handleFilterChange={handleFilterChange}
        clearFilters={clearFilters}
        removeFilter={removeFilter}
        handleMarkUnread={handleMarkUnread}
        handleMarkDone={handleMarkDone}
        handleAssign={handleAssign}
        conversationPath={conversationPath}
        setColumnFilters={setColumnFilters}
        columnFilters={columnFilters}
      />
    );
  }

  if (view === "landing") {
    return (
      <InboxLandingView
        title={title}
        conversationLabels={conversationLabels}
        availableMembers={availableMembers}
        columns={columns}
        data={data}
        handleTabChange={handleTabChange}
        handleFilterChange={handleFilterChange}
        clearFilters={clearFilters}
        removeFilter={removeFilter}
        handleMarkUnread={handleMarkUnread}
        handleMarkDone={handleMarkDone}
        handleAssign={handleAssign}
        conversationPath={conversationPath}
        setColumnFilters={setColumnFilters}
        columnFilters={columnFilters}
      />
    );
  }
}
