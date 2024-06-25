import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { AllFilters, FilterValue, FilterValues } from "@/lib/types";
import { ColumnFiltersState } from "@tanstack/react-table";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
