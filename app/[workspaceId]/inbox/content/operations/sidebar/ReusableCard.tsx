import {
  ArrowCircleBrokenRightIcon,
  CurrencyDollarIcon,
  FilledCheckCircleIcon,
  Loading02Icon,
  PhoneIcon,
  SkinnyCircleIcon,
  XCircleIcon,
} from "@/components/icons/CustomIcons";
import {
  Call,
  TaskItem,
  TaskStatusEnum,
  UpsellItem,
  UpsellStatusEnum,
} from "@/lib/realDataSchema";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useOpsRightSidebar } from "../../../OpsRightSidebarContext";
import { StatusDropdown } from "./StatusDropdown";
import { TaskStatusDropdown } from "./TaskDropdowns";

export const ReusableCard = ({
  title,
  description,
  type,
  upsellData,
  taskData,
  callData,
  onUpdateStatus,
  onUpdateTaskStatus,
}: {
  title: string;
  description: string;
  type?: "upsell" | "task" | "call";
  upsellData?: UpsellItem;
  taskData?: TaskItem;
  callData?: Call;
  onUpdateStatus?: (status: UpsellStatusEnum) => void;
  onUpdateTaskStatus?: (status: TaskStatusEnum) => void;
}) => {
  const [isIconHovered, setIsIconHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { selectedTab, setSelectedTab } = useOpsRightSidebar();

  const handleUpdateUpsellAcceptStatus = (status: UpsellStatusEnum) => {
    if (onUpdateStatus) {
      onUpdateStatus(status);
    }

    // Close the dropdown
    setIsDropdownOpen(false);
  };

  const handleUpdateTaskStatus = (status: TaskStatusEnum) => {
    if (onUpdateTaskStatus) {
      onUpdateTaskStatus(status);
    }

    // Close the dropdown
    setIsDropdownOpen(false);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-[10px] p-4 rounded-md border border-primary w-full transition-colors duration-200",
        isIconHovered
          ? "bg-primary"
          : "bg-primary hover:bg-hover active:bg-pressed hover:cursor-pointer"
      )}
      style={{ boxShadow: "0px 4px 50px 0px rgba(0, 0, 0, 0.03)" }}
      onClick={() => {
        if (type === "upsell") {
          setSelectedTab({ type: "upsell", data: upsellData });
        }
        if (type === "task") {
          setSelectedTab({ type: "task", data: taskData });
        }
        if (type === "call") {
          setSelectedTab({ type: "call", data: callData });
        }
      }}
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
                  upsellData?.status === UpsellStatusEnum.Awaiting &&
                    "bg-amber-100 text-amber-600",
                  upsellData?.status === UpsellStatusEnum.GuestAccepted &&
                    "bg-success-subtle text-green-600",
                  upsellData?.status === UpsellStatusEnum.GuestDeclined &&
                    "bg-error-subtle text-error",
                  upsellData?.status === UpsellStatusEnum.NotSent &&
                    "bg-gray-200 text-gray-600"
                )}
              >
                <CurrencyDollarIcon className="h-[16.5px] w-fit" />
              </div>
            </div>
          </DropdownMenuTrigger>
          <StatusDropdown
            align="start"
            onUpdateStatus={handleUpdateUpsellAcceptStatus}
          />
        </DropdownMenu>
      )}

      {type === "task" && (
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
              {taskData?.status === TaskStatusEnum.Cancelled && (
                <XCircleIcon className="text-icon-error" />
              )}
              {taskData?.status === TaskStatusEnum.Done && (
                <FilledCheckCircleIcon className="text-icon-success" />
              )}
              {taskData?.status === TaskStatusEnum.InProgress && (
                <ArrowCircleBrokenRightIcon className="text-icon-active" />
              )}
              {taskData?.status === TaskStatusEnum.Todo && (
                <SkinnyCircleIcon className="text-icon-secondary" />
              )}
              {taskData?.status === TaskStatusEnum.Backlog && (
                <Loading02Icon className="text-icon-tertiary" />
              )}
            </div>
          </DropdownMenuTrigger>
          <TaskStatusDropdown
            align="start"
            onUpdateStatus={handleUpdateTaskStatus}
          />
        </DropdownMenu>
      )}

      {type === "call" && (
        // show a phone icon
        <div className="flex items-center justify-center size-[25px] min-w-[25px] min-h-[25px] rounded-full bg-secondary">
          <PhoneIcon className="text-icon-brand size-[13.95px]" />
        </div>
      )}

      <div className="flex flex-col gap-1 truncate">
        <p className="text-subtitle-xs">{title}</p>
        <p className="text-body-xs text-secondary truncate">{description}</p>
      </div>
    </div>
  );
};
