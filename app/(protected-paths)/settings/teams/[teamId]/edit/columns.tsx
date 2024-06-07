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
import { MemberWithTeamId } from "@/lib/types";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const handleRemoveMember = (
  member: MemberWithTeamId,
  router: AppRouterInstance
) => {
  // console.log("Removing member", member);

  // Call your API here
  setTimeout(() => {
    toast.success(`Removed ${member.name} from team ${member.teamId}`);

    // refresh the page to get the updated data
    router.refresh();
  }, 1000);
};

export const columns: ColumnDef<MemberWithTeamId>[] = [
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
              <Button variant="ghost" className="h-8 w-8 p-0">
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
                  await handleRemoveMember(member, router);
                  setIsOpen(false);
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
