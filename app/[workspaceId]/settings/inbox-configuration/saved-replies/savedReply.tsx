"use client";

import { Button } from "@/components/ui/button";
import { SavedReply } from "@/lib/types";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteSavedReply } from "@/app/actions";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const SavedReplyComponent = ({
  savedReply,
}: {
  savedReply: SavedReply;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleDeleteSavedReply = async () => {
    setIsDialogOpen(false);
    const response = await deleteSavedReply(savedReply);

    if (response.success) {
      toast.success("Saved reply deleted successfully");

      // refresh the page to reflect the changes
      router.refresh();
    } else {
      toast.error("Error deleting saved reply: " + response.message);
    }
  };

  return (
    <div className="flex items-start justify-between border border-secondary rounded-md gap-2 hover:bg-hover active:bg-pressed">
      <Link
        key={savedReply.id}
        href={`./saved-replies/${savedReply.id}`}
        className="p-5  w-full"
      >
        <div className="flex flex-col">
          <p className="text-subtitle-xs">{savedReply.name}</p>
          <p className="text-body-2xs text-tertiary font-normal mt-1">
            {savedReply.reply}
          </p>
        </div>
      </Link>

      <div className="p-5">
        <AlertDialog open={isDialogOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size={"icon"}
                className="h-8 w-8 hover:bg-pressed z-10"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4 text-icon-tertiary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="text-subtitle-xs">
              <Link href={`./saved-replies/${savedReply.id}`}>
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </Link>
              <AlertDialogTrigger
                onClick={() => setIsDialogOpen(true)}
                className="w-full"
              >
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete saved reply?{" "}
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button
                variant={"secondary"}
                size={"sm"}
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteSavedReply()}
              >
                Delete saved reply
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
