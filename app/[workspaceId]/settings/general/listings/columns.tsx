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
import { ListingWithDeleteHandler } from "@/lib/types";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<ListingWithDeleteHandler>[] = [
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
    accessorKey: "active",
    header: "Active",
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      return (
        <p className="text-tertiary text-body-2xs font-normal">
          {row.original.address}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [isOpen, setIsOpen] = useState(false);
      const router = useRouter();
      const listing = row.original;

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
              <DropdownMenuItem
                onClick={async () => {
                  const currentActive = listing.active;
                  const response = await listing.onActiveChange(listing);

                  if (response.success) {
                    toast.success(
                      `Listing set as ${
                        response.listing.active ? "active" : "inactive"
                      }`
                    );

                    // reload the page to fetch new data
                    router.refresh();
                  } else {
                    toast.error(
                      `Failed to set listing as ${
                        !currentActive ? "active" : "inactive"
                      }`
                    );
                  }
                }}
              >
                {row.original.active === true
                  ? "Move to inactive"
                  : "Move to active"}
              </DropdownMenuItem>
              <AlertDialogTrigger
                onClick={() => setIsOpen(true)}
                className="w-full"
              >
                <DropdownMenuItem>Remove from HostAI</DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this listing?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. You will no longer be able to
                access this listing.
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
                  const repsonse = await listing.onDelete(listing);

                  setIsOpen(false);

                  if (repsonse.success) {
                    toast.success(
                      "Listing removed successfully: " + listing.title
                    );

                    // reload the page to fetch new data
                    router.refresh();
                  } else {
                    toast.error("Failed to remove listing");
                  }
                }}
              >
                Remove listing
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
