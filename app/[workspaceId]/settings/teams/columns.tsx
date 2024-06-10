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
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MemberWithDeleteHandler } from "@/lib/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const columns: ColumnDef<MemberWithDeleteHandler>[] = [
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
      const [isOpen, setIsOpen] = useState(false);
      const router = useRouter();

      const member = row.original;

      return (
        <AlertDialog open={isOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="self-end">
              <Button variant="ghost" size={"icon"} className="h-8 w-8 px-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4 text-icon-tertiary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <AlertDialogTrigger onClick={() => setIsOpen(true)}>
                <DropdownMenuItem>Remove from team</DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to remove from team?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This will remove them from this team and not from the workspace.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button
                variant={"secondary"}
                size={"sm"}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={async () => {
                  const repsonse = await member.onDelete(member);

                  setIsOpen(false);

                  if (repsonse.success) {
                    toast.success(`Removed ${member.name} from team`);

                    // reload the page to fetch new data
                    router.refresh();
                  } else {
                    toast.error("Failed to remove member");
                  }
                }}
              >
                Remove from team
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
