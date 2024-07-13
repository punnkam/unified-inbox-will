import { CurrencyDollarIcon } from "@/components/icons/CustomIcons";
import { UpsellStatusEnum } from "@/lib/realDataSchema";
import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

// New custom StatusDropdown component
export const StatusDropdown = ({
  align = "end",
  onUpdateStatus,
}: {
  align?: "start" | "end" | "center";
  onUpdateStatus: (status: UpsellStatusEnum) => void;
}) => {
  const handleUpdateStatus = (newStatus: UpsellStatusEnum) => {
    onUpdateStatus(newStatus);
  };

  return (
    <DropdownMenuContent
      align={align}
      className="text-subtitle-xs p-0"
      onClick={(e) => e.stopPropagation()}
    >
      <Command>
        <CommandInput placeholder={`Search`} autoFocus={true} />
        <CommandList>
          <CommandEmpty>No matches.</CommandEmpty>
          <CommandGroup className="w-full">
            <DropdownMenuItem className="p-0 active:bg-transparent">
              <CommandItem
                key={"not-sent"}
                value={"Not sent"}
                onSelect={() => {
                  handleUpdateStatus(UpsellStatusEnum.NotSent);
                }}
                className="hover:cursor-pointer w-full"
              >
                <div className="flex items-center gap-2 text-subtitle-xs">
                  <div className="flex items-center justify-center size-6 min-w-6 min-h-6 rounded-full text-gray-600">
                    <CurrencyDollarIcon className="h-[13.3px] w-fit" />
                  </div>
                  <p>Not Sent</p>
                </div>
              </CommandItem>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0 active:bg-transparent">
              <CommandItem
                key={"sent"}
                value={"sent"}
                onSelect={() => {
                  handleUpdateStatus(UpsellStatusEnum.Awaiting);
                }}
                className="hover:cursor-pointer w-full"
              >
                <div className="flex items-center gap-2 text-subtitle-xs">
                  <div className="flex items-center justify-center size-6 min-w-6 min-h-6 rounded-full text-amber-600 bg-amber-100">
                    <CurrencyDollarIcon className="h-[13.3px] w-fit" />
                  </div>
                  <p>Sent</p>
                </div>
              </CommandItem>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0 active:bg-transparent">
              <CommandItem
                key={"guest-accepted"}
                value={"Guest accepted"}
                onSelect={() => {
                  handleUpdateStatus(UpsellStatusEnum.GuestAccepted);
                }}
                className="hover:cursor-pointer w-full"
              >
                <div className="flex items-center gap-2 text-subtitle-xs">
                  <div className="flex items-center justify-center size-6 min-w-6 min-h-6 rounded-full text-green-600 bg-success-subtle">
                    <CurrencyDollarIcon className="h-[13.3px] w-fit" />
                  </div>
                  <p>Accepted</p>
                </div>
              </CommandItem>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0 active:bg-transparent">
              <CommandItem
                key={"guest-declined"}
                value={"Guest declined"}
                onSelect={() => {
                  handleUpdateStatus(UpsellStatusEnum.GuestDeclined);
                }}
                className="hover:cursor-pointer w-full"
              >
                <div className="flex items-center gap-2 text-subtitle-xs">
                  <div className="flex items-center justify-center size-6 min-w-6 min-h-6 rounded-full text-error bg-error-subtle">
                    <CurrencyDollarIcon className="h-[13.3px] w-fit" />
                  </div>
                  <p>Declined</p>
                </div>
              </CommandItem>
            </DropdownMenuItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </DropdownMenuContent>
  );
};
