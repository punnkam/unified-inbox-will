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
import { ThickCarrotIcon } from "@/components/icons/CustomIcons";
import { ColumnFiltersState } from "@tanstack/react-table";
import { handleSelect } from "@/lib/tableUtils";

export const Badge = ({
  subscipton,
  id,
  number,
  title,
  badge,
  icon,
  iconType,
  percentage,
  setColumnFilters,
  columnFilters,
  className,
}: {
  subscipton?: string;
  id: number;
  number: number;
  title: string;
  badge?: string;
  icon?: number;
  iconType?: ConversationTagType["color"];
  percentage?: number;
  setColumnFilters: (columnId: string, value: any) => void;
  columnFilters: ColumnFiltersState;
  className?: string;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const foundIcon = fakeIconsData.find((iconSearch) => iconSearch.id === icon);

  return (
    <div className={cn("py-2 md:px-2 md:py-0 overflow-visible", className)}>
      <div
        className={cn(
          "flex-shrink-0 p-4 flex flex-col gap-5 border border-primary rounded-xl bg-primary hover:border-secondary cursor-pointer",
          loading && "opacity-50"
        )}
        style={{
          boxShadow: "0px 4px 50px rgba(0, 0, 0, 0.02)"
        }}
        onClick={() => {
          !isDialogOpen &&
            handleSelect({
              filter: "conversationTags",
              label: {
                id,
                name: title,
              },
              columnId: "messages",
              columnFilters,
              setColumnFilters,
            });
        }}
      >
        <div className="flex items-center gap-[28px] justify-between">
          <div className="flex items-center gap-2">
            <div
              className={clsx(
                "flex items-center justify-center h-8 w-8 min-h-8 min-w-8 text-white rounded-lg",
                iconType === "error" && "bg-gray-800",
                iconType === "success" && "bg-blue-800",
                iconType === "active" && "bg-purple-800",
                iconType === "tertiary" && "bg-cyan-800"
              )}
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
                  onClick={(e) => {
                    e.stopPropagation(); // prevents the tag from being selected on click
                    setIsDialogOpen(true);
                  }}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDialogOpen(false);
                  }}
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
          <div className="flex items-center gap-3">
            <p className="text-body-5xl">{number}</p>
            {percentage && (
              <div
                className={cn(
                  "px-2 py-1 rounded-[12px] flex items-center gap-1 text-subtitle-md",
                  percentage > 0
                    ? "bg-green-600/10 text-green-600"
                    : "bg-red-600/10 text-red-600"
                )}
              >
                <ThickCarrotIcon
                  className={cn(
                    percentage > 0 ? "transform" : "transform -rotate-180"
                  )}
                />
                <p>{Math.abs(percentage)}%</p>
              </div>
            )}
          </div>
          <p className="text-body-sm text-tertiary">{subscipton}</p>
        </div>
      </div>
    </div>
  );
};
