import { CurrencyDollarIcon } from "@/components/icons/CustomIcons";
import { UpsellStatusEnum } from "@/lib/realDataSchema";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const ReusableCard = ({
  title,
  description,
  type,
  upsellAcceptStatus,
}: {
  title: string;
  description: string;
  type: "upsell" | "task" | "phone";
  upsellAcceptStatus?: UpsellStatusEnum;
}) => {
  const [isIconHovered, setIsIconHovered] = useState(false);

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
      )}

      <div className="flex flex-col gap-1 truncate">
        <p className="text-subtitle-xs">{title}</p>
        <p className="text-body-xs text-secondary truncate">{description}</p>
      </div>
    </div>
  );
};
