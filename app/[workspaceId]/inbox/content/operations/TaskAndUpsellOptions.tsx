import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "@/components/icons/CustomIcons";
import { cn } from "@/lib/utils";

export const TaskAndUpsellOptions = ({
  title,
  value,
  isDropdown,
  dropdownContent,
  icon,
}: {
  title: string;
  value: string | React.ReactNode;
  isDropdown?: boolean;
  dropdownContent?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const MainData = (
    <div className={cn("flex items-center gap-1", !isDropdown && "p-1")}>
      {typeof value === "string" ? (
        <p className="text-subtitle-sm">{value}</p>
      ) : (
        value
      )}
    </div>
  );

  if (isDropdown) {
    return (
      <div className="flex items-center gap-4 w-full justify-between">
        <div className="py-2">
          <p className="text-body-sm text-secondary h-5">{title}</p>
        </div>
        <DropdownMenu open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-1 w-fit rounded-md hover:bg-hover hover:cursor-pointer p-1">
              {icon}
              {MainData}
              <ChevronDownIcon className="size-fit text-icon-tertiary" />
            </div>
          </DropdownMenuTrigger>
          {dropdownContent}
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 w-full justify-between">
      <div className="py-2">
        <p className="text-body-sm text-secondary h-5">{title}</p>
      </div>
      {MainData}
    </div>
  );
};
