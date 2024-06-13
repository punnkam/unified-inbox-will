import { ConversationTagType, conversationTagTypes } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";

export const TypeDropdown = ({
  data,
  handleChange,
}: {
  data: { type: ConversationTagType };
  handleChange: (
    key: keyof typeof data,
    value: (typeof data)[keyof typeof data]
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
          <div
            className={clsx(
              "h-3 w-3 rounded-sm",
              data.type.color === "error" && "bg-error",
              data.type.color === "success" && "bg-success",
              data.type.color === "active" && "bg-icon-active",
              data.type.color === "tertiary" && "bg-icon-tertiary"
            )}
          ></div>
          {data.type.type}
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {conversationTagTypes.map((type) => (
          <DropdownMenuItem
            key={type.id}
            onClick={() => handleChange("type", type)}
          >
            <div className="flex items-center gap-2">
              <div
                className={clsx(
                  "h-3 w-3 rounded-sm",
                  type.color === "error" && "bg-error",
                  type.color === "success" && "bg-success",
                  type.color === "active" && "bg-icon-active",
                  type.color === "tertiary" && "bg-icon-tertiary"
                )}
              ></div>
              {type.type}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
