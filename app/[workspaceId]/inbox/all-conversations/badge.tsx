"use client";

import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { ConversationTagType, fakeIconsData } from "@/lib/types";
import clsx from "clsx";
import { IconComponent } from "@/components/icons/IconComponent";
import { updateConversationTagVisaibility } from "@/app/actions";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export const Badge = ({
  subscipton,
  id,
  number,
  title,
  badge,
  icon,
  iconType,
}: {
  subscipton?: string;
  id: number;
  number: number;
  title: string;
  badge?: string;
  icon?: number;
  iconType?: ConversationTagType["color"];
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const foundIcon = fakeIconsData.find((iconSearch) => iconSearch.id === icon);

  return (
    <div
      className={cn(
        "p-4 flex flex-col gap-5 border border-primary rounded-xl bg-primary w-full",
        loading && "opacity-50"
      )}
    >
      <div className="flex items-center gap-[28px] justify-between">
        <div className="flex items-center gap-2">
          <div
            className={clsx(
              "flex items-center justify-center h-9 w-9 text-white rounded-lg",
              iconType === "error" && "bg-error",
              iconType === "success" && "bg-success",
              iconType === "active" && "bg-icon-active",
              iconType === "tertiary" && "bg-icon-tertiary"
            )}
            style={{
              boxShadow: "0px 4px 4px 0px rgba(196, 217, 255, 0.25) inset",
            }}
          >
            <IconComponent icon={foundIcon?.icon || fakeIconsData[0].icon} />
          </div>
          <p className="text-subtitle-sm">{title}</p>
        </div>

        <AlertDialog open={isDialogOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} size={"iconSm"}>
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4 text-icon-tertiary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="text-subtitle-xs">
              <AlertDialogTrigger
                onClick={() => setIsDialogOpen(true)}
                className="w-full"
              >
                <DropdownMenuItem>Remove from dashboard</DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want this removed?
              </AlertDialogTitle>
              <AlertDialogDescription>
                You can re-add this back in settings if you change your mind.
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
                onClick={async () => {
                  setIsDialogOpen(false);
                  setLoading(true);
                  const resposne = await updateConversationTagVisaibility(
                    id,
                    false
                  );

                  if (resposne.success) {
                    router.refresh();
                  }
                  setLoading(false);
                }}
              >
                Remove
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div>
        <p className="text-body-5xl">{number}</p>
        <p className="text-body-sm text-tertiary">{subscipton}</p>
      </div>
    </div>
  );
};
