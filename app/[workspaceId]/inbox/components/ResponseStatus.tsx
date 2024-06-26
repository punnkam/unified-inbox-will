import { cn } from "@/lib/utils";
import { HostAiIcon } from "@/components/icons/CustomIcons";
import { Conversation } from "@/lib/types";
import {
  CheckCircleIcon,
  Home02Icon,
  CalendarPlus,
  SlashCircleIcon,
} from "@/components/icons/CustomIcons";

const IconMap = {
  Current: {
    icon: <Home02Icon />,
    classes: "text-link bg-blue-500/10",
  },
  Inquiry: {
    icon: <CalendarPlus />,
    classes: "text-amber-600 bg-amber-600/10",
  },
  Past: {
    icon: <CheckCircleIcon />,
    classes: "text-secondary bg-secondary",
  },
  Cancelled: {
    icon: <SlashCircleIcon />,
    classes: "text-error bg-red-500/10",
  },
};

export const ResponseStatus = ({
  type,
}: {
  type: Conversation["reservationStatus"];
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full text-subtitle-xs px-2 py-1",
        IconMap[type].classes
      )}
    >
      <div className="">{IconMap[type].icon}</div>
      {type}
    </div>
  );
};
