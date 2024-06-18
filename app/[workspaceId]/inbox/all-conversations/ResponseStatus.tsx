import { cn } from "@/lib/utils";
import { HostAiIcon } from "@/components/icons/CustomIcons";

export const ResponseStatus = ({
  text,
  type,
  icon,
  showHosty,
}: {
  text: string;
  type: "Needs Reply" | "Response Available" | "Default" | "Done";
  icon?: React.ReactNode;
  showHosty?: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-[6px] border rounded-full text-secondary text-subtitle-2xs px-2 py-[6px]",
        type == "Needs Reply" && "bg-error-alt border-error-alt",
        type == "Response Available" && "bg-selected-subtle border-info",
        type == "Default" && "bg-disabled border-secondary-hover",
        type == "Done" && "bg-success-subtle border-success"
      )}
    >
      {showHosty && <HostAiIcon className="w-3 h-3" />}
      {icon && <div>{icon}</div>}
      {text}
    </div>
  );
};
