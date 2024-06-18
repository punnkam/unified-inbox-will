import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { ConversationTagType, fakeIconsData } from "@/lib/types";
import clsx from "clsx";
import { IconComponent } from "@/components/icons/IconComponent";

export const Badge = ({
  subscipton,
  number,
  title,
  badge,
  icon,
  iconType,
}: {
  subscipton?: string;
  number: number;
  title: string;
  badge?: string;
  icon?: number;
  iconType?: ConversationTagType["color"];
}) => {
  const foundIcon = fakeIconsData.find((iconSearch) => iconSearch.id === icon);

  return (
    <div className="p-4 flex flex-col gap-5 border border-primary rounded-xl bg-primary w-full">
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

        <Button variant={"ghost"} size={"iconSm"}>
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-4 w-4 text-icon-tertiary" />
        </Button>
      </div>
      <div>
        <p className="text-body-5xl font-normal">{number}</p>
        <p className="text-body-sm font-normal text-tertiary">{subscipton}</p>
      </div>
    </div>
  );
};
