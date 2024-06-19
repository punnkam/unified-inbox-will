// docs: https://ui.shadcn.com/docs/components/data-table

"use client";

import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { Listing } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";

// custom filter to handle filtering by group
const exactMatchFilter: FilterFn<Listing> = (row, columnId, filterValue) => {
  return row.getValue(columnId) == filterValue;
};

export const columns: ColumnDef<Listing>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <div className="flex gap-3 items-center">
          <img
            src={row.original.image}
            alt={row.original.title}
            className="w-10 h-10 rounded-full object-cover"
          />

          <p className="text-subtitle-xs">{row.original.title}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "group",
    header: "Group",
    accessorFn: (row) => row.group,
    filterFn: exactMatchFilter,
  },
  {
    id: "autopilot",
    cell: ({ row }) => {
      const listing = row.original;

      return (
        <p className="text-body-2xs text-tertiary font-normal text-nowrap">
          {listing.autopilot ? "Autopilot on" : "Autopilot off"}
        </p>
      );
    },
  },
  {
    accessorKey: "actions",
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="p-0"
      />
    ),
  },
];
