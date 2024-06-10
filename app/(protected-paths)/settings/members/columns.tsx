// docs: https://ui.shadcn.com/docs/components/data-table

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Member = {
  id: string;
  name: string;
  role: "Admin" | "Member" | "External Team";
  email: string;
  image: string;
  status: "Active" | "Pending";
};

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex gap-3 items-center">
          <img
            src={row.original.image}
            alt={row.original.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-subtitle-xs">{row.original.name}</p>
            <p className="text-tertiary text-body-2xs font-normal">
              {row.original.email}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      return (
        <p className="text-tertiary text-body-2xs font-normal">
          {row.original.role}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const member = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="self-end">
            <Button variant="ghost" className="h-8 w-8 px-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4 text-icon-tertiary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* TODO: these do nothing right now */}
            <DropdownMenuItem>Edit Role</DropdownMenuItem>
            <DropdownMenuItem>Remove Member</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
