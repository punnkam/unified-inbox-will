import { CurrencyDollarIcon } from "@/components/icons/CustomIcons";
import { UpsellStatusEnum } from "@/lib/realDataSchema";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ReusableCard = ({
  title,
  description,
  type,
  upsellAcceptStatus,
  onUpdateStatus,
}: {
  title: string;
  description: string;
  type: "upsell" | "task" | "phone";
  upsellAcceptStatus?: UpsellStatusEnum;
  onUpdateStatus?: (status: UpsellStatusEnum) => void;
}) => {
  const [isIconHovered, setIsIconHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleUpdateUpsellAcceptStatus = (status: UpsellStatusEnum) => {
    if (onUpdateStatus) {
      onUpdateStatus(status);
    }

    // Close the dropdown
    setIsDropdownOpen(false);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-[10px] p-4 rounded-md border border-secondary w-full transition-colors duration-200",
        isIconHovered
          ? "bg-primary"
          : "bg-primary hover:bg-hover active:bg-pressed hover:cursor-pointer"
      )}
      style={{ boxShadow: "0px 4px 50px 0px rgba(0, 0, 0, 0.03)" }}
    >
      {type === "upsell" && (
        <DropdownMenu
          open={isDropdownOpen}
          onOpenChange={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <DropdownMenuTrigger asChild>
            <div
              className="flex items-center justify-center size-[30px] min-w-[30px] min-h-[30px] rounded-md hover:bg-hover hover:cursor-pointer active:bg-pressed"
              onMouseEnter={() => setIsIconHovered(true)}
              onMouseLeave={() => setIsIconHovered(false)}
            >
              <div
                className={cn(
                  "flex items-center justify-center size-[25px] min-w-[25px] min-h-[25px] rounded-full",
                  upsellAcceptStatus === UpsellStatusEnum.Awaiting &&
                    "bg-amber-100 text-amber-600",
                  upsellAcceptStatus === UpsellStatusEnum.GuestAccepted &&
                    "bg-success-subtle text-green-600",
                  upsellAcceptStatus === UpsellStatusEnum.GuestDeclined &&
                    "bg-error-subtle text-error",
                  upsellAcceptStatus === UpsellStatusEnum.NotSent &&
                    "bg-gray-200 text-gray-600"
                )}
              >
                <CurrencyDollarIcon className="h-[16.5px] w-fit" />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="text-subtitle-xs p-0">
            <Command>
              <CommandInput placeholder={`Search`} autoFocus={true} />
              <CommandList>
                <CommandEmpty>No matches.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    key={"not-sent"}
                    value={"Not sent"}
                    onSelect={() => {
                      handleUpdateUpsellAcceptStatus(UpsellStatusEnum.NotSent);
                    }}
                    className="hover:cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-subtitle-xs">
                      <div className="flex items-center justify-center size-6 min-w-6 min-h-6 rounded-full text-gray-600">
                        <CurrencyDollarIcon className="h-[13.3px] w-fit" />
                      </div>
                      <p>Not Sent</p>
                    </div>
                  </CommandItem>
                  <CommandItem
                    key={"sent"}
                    value={"sent"}
                    onSelect={() => {
                      handleUpdateUpsellAcceptStatus(UpsellStatusEnum.Awaiting);
                    }}
                    className="hover:cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-subtitle-xs">
                      <div className="flex items-center justify-center size-6 min-w-6 min-h-6 rounded-full text-amber-600 bg-amber-100">
                        <CurrencyDollarIcon className="h-[13.3px] w-fit" />
                      </div>
                      <p>Sent</p>
                    </div>
                  </CommandItem>
                  <CommandItem
                    key={"guest-accepted"}
                    value={"Guest accepted"}
                    onSelect={() => {
                      handleUpdateUpsellAcceptStatus(
                        UpsellStatusEnum.GuestAccepted
                      );
                    }}
                    className="hover:cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-subtitle-xs">
                      <div className="flex items-center justify-center size-6 min-w-6 min-h-6 rounded-full text-green-600 bg-success-subtle">
                        <CurrencyDollarIcon className="h-[13.3px] w-fit" />
                      </div>
                      <p>Accepted</p>
                    </div>
                  </CommandItem>
                  <CommandItem
                    key={"guest-declined"}
                    value={"Guest declined"}
                    onSelect={() => {
                      handleUpdateUpsellAcceptStatus(
                        UpsellStatusEnum.GuestDeclined
                      );
                    }}
                    className="hover:cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-subtitle-xs">
                      <div className="flex items-center justify-center size-6 min-w-6 min-h-6 rounded-full text-error bg-error-subtle">
                        <CurrencyDollarIcon className="h-[13.3px] w-fit" />
                      </div>
                      <p>Declined</p>
                    </div>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <div className="flex flex-col gap-1 truncate">
        <p className="text-subtitle-xs">{title}</p>
        <p className="text-body-xs text-secondary truncate">{description}</p>
      </div>
    </div>
  );
};
