import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon, FilePlusIcon } from "@/components/icons/CustomIcons";

export const ActionDropdown = ({
  actionItem,
  handleChange,
}: {
  actionItem: "Mark as done" | "Create task";
  handleChange: (
    key: "actionItem",
    value: "Mark as done" | "Create task"
  ) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          className="flex items-center gap-2 place-self-start"
        >
          {actionItem === "Mark as done" ? (
            <CheckCircleIcon className="text-icon-secondary" />
          ) : (
            <FilePlusIcon className="text-icon-secondary" />
          )}
          {actionItem}
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          onClick={() => handleChange("actionItem", "Mark as done")}
        >
          <CheckCircleIcon className="mr-2 text-icon-secondary" />
          Mark as done
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleChange("actionItem", "Create task")}
        >
          <FilePlusIcon className="mr-2 text-icon-secondary" />
          Create Task
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
