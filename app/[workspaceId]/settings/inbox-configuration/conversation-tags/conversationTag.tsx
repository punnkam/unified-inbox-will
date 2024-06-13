"use client";

import { Button } from "@/components/ui/button";
import { ConversationTag } from "@/lib/types";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteConversationTag } from "@/app/actions";
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
import clsx from "clsx";
import { fakeIconsData } from "@/lib/types";
import { IconComponent } from "@/components/icons/IconComponent";

export const ConversationTagComponent = ({
  conversationTag,
}: {
  conversationTag: ConversationTag;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleDeleteConversationTag = async () => {
    setIsDialogOpen(false);
    const response = await deleteConversationTag(conversationTag);

    if (response.success) {
      toast.success("Conversation tag deleted successfully");

      // refresh the page to reflect the changes
      router.refresh();
    } else {
      toast.error("Error deleting conversation tag: " + response.message);
    }
  };

  const icon = fakeIconsData.find((icon) => icon.id === conversationTag.iconId);

  return (
    <div className="flex items-start justify-between border border-secondary rounded-md gap-2 hover:bg-hover active:bg-pressed">
      <Link
        key={conversationTag.id}
        href={`./conversation-tags/${conversationTag.id}`}
        className="p-5 flex gap-2 items-center"
      >
        <div
          className={clsx(
            "flex items-center justify-center h-9 w-9 text-white rounded-lg",
            conversationTag.type.color === "error" && "bg-error",
            conversationTag.type.color === "success" && "bg-success",
            conversationTag.type.color === "active" && "bg-icon-active",
            conversationTag.type.color === "tertiary" && "bg-icon-tertiary"
          )}
          style={{
            boxShadow: "0px 4px 4px 0px rgba(196, 217, 255, 0.25) inset",
          }}
        >
          <IconComponent icon={icon?.icon || fakeIconsData[0].icon} />
        </div>
        <div className="flex flex-col">
          <p className="text-subtitle-xs">{conversationTag.name}</p>
          <p className="text-body-2xs text-tertiary font-normal mt-1">
            {conversationTag.description}
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
              <Link href={`./conversation-tags/${conversationTag.id}`}>
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
                Are you sure you want to delete conversation tag?{" "}
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
                onClick={() => handleDeleteConversationTag()}
              >
                Delete conversation tag
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
