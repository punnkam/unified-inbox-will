import {
  AllFilters,
  Conversation,
  ConversationTable,
  FilterValue,
  FilterValues,
  Member,
} from "@/lib/realDataSchema";
import { ColumnFiltersState } from "@tanstack/react-table";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";

// function to handle selecting a filter value and updating table states
export const handleSelect = ({
  filter,
  label,
  columnId,
  columnFilters,
  setColumnFilters,
}: {
  filter: keyof AllFilters;
  label: FilterValue;
  columnId: string;
  columnFilters: ColumnFiltersState;
  setColumnFilters: (columnId: string, value: any) => void;
}) => {
  // Find the current filter parent and current values for the column
  const currentFilter = columnFilters.find((f) => f.id === columnId)?.value as
    | FilterValues
    | undefined;

  // Determine the new filter values for the specified filter parent
  const newFilterValues = currentFilter?.[filter]
    ? currentFilter[filter].some((item) => item.id === label.id)
      ? // If the value is already included, remove it
        currentFilter[filter].filter((item) => item.id !== label.id)
      : // If the value is not included, add it
        [...currentFilter[filter], label]
    : // If there are no current filters for this filter parent, start a new array with the label
      [label];

  // Create a new filter object with the updated filter values
  const newFilter = { [filter]: newFilterValues };

  // Update the column filters by merging the current filter object with the new filter object
  setColumnFilters(columnId, { ...currentFilter, ...newFilter });
};

// API: Function to handle mark selected rows as unread
export const handleMarkUnread = (table: ConversationTable) => {
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
export const handleMarkDone = (table: ConversationTable) => {
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
export const handleAssign = (table: ConversationTable, member: Member) => {
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
export const clearFilters = (
  table: ConversationTable,
  columnFilters: ColumnFiltersState
) => {
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

export const handleTabChange = (table: ConversationTable, tab: boolean) => {
  console.log("Tab change", tab);
  table.getColumn("messageStatus")?.setFilterValue(tab);
};

// Helper for filtering dropdown
export const handleFilterChange = (
  table: ConversationTable,
  columnId: string,
  value: string
) => {
  table.getColumn(columnId)?.setFilterValue(value);
};

// Function to remove filter tag groups
export const removeFilter = (
  columnId: string,
  filterKey: string,
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>
) => {
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
