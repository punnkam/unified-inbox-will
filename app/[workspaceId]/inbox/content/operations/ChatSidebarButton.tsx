import { LayoutRightIcon } from "@/components/icons/CustomIcons";
import { cn } from "@/lib/utils";
import { useOpsRightSidebar } from "../../OpsRightSidebarContext";

export const ChatSidebarButton = ({ selected }: { selected?: boolean }) => {
  const { toggleSidebar, isOpen } = useOpsRightSidebar();
  return (
    <div
      className={cn(
        "size-11 min-w-11 min-h-11 flex items-center justify-center gap-2 rounded-lg hover:bg-hover hover:cursor-pointer",
        isOpen && "bg-primary border border-secondary"
      )}
      onClick={toggleSidebar}
    >
      <div className="size-6 min-w-6 min-h-6 flex items-center justify-center">
        <LayoutRightIcon className="text-icon-brand" />
      </div>
    </div>
  );
};
