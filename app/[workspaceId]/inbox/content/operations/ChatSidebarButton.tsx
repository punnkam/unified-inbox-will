import { LayoutRightIcon } from "@/components/icons/CustomIcons";
import { cn } from "@/lib/utils";

export const ChatSidebarButton = ({
  newNotes,
  selected,
}: {
  newNotes: boolean;
  selected?: boolean;
}) => {
  return (
    <div
      className={cn(
        "size-11 min-w-11 min-h-11 flex items-center justify-center gap-2 rounded-lg hover:bg-hover hover:cursor-pointer",
        selected && "bg-primary border border-secondary"
      )}
    >
      <div className="size-6 min-w-6 min-h-6 flex items-center justify-center relative">
        <LayoutRightIcon className="text-icon-brand" />
        {newNotes && (
          <div className="absolute top-0 left-0 size-[10px] bg-icon-active rounded-full border border-[#FAFBFC]"></div>
        )}
      </div>
    </div>
  );
};
