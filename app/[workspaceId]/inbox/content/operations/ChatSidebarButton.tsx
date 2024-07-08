import { LayoutRightIcon } from "@/components/icons/CustomIcons";
import { cn } from "@/lib/utils";

export const ChatSidebarButton = ({ selected }: { selected?: boolean }) => {
  return (
    <div
      className={cn(
        "size-11 min-w-11 min-h-11 flex items-center justify-center gap-2 rounded-lg hover:bg-hover hover:cursor-pointer",
        selected && "bg-primary border border-secondary"
      )}
    >
      <div className="size-6 min-w-6 min-h-6 flex items-center justify-center">
        <LayoutRightIcon className="text-icon-brand" />
      </div>
    </div>
  );
};
