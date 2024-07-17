import { File05Icon } from "@/components/icons/CustomIcons";
import { cn } from "@/lib/utils";
import { useOpsRightSidebar } from "../../OpsRightSidebarContext";

export const NotesButton = ({
  newNotes,
  selected,
}: {
  newNotes: boolean;
  selected?: boolean;
}) => {
  const { isOpen, toggleSidebar } = useOpsRightSidebar();

  return (
    <div
      className={cn(
        "size-11 min-w-11 min-h-11 flex items-center justify-center gap-2 rounded-lg hover:bg-hover hover:cursor-pointer",
        selected && "bg-primary border border-secondary"
      )}
      onClick={() => {
        // open the sidebar if it is closed so the user can see the buttons
        if (!isOpen) toggleSidebar();
      }}
    >
      <div className="size-6 min-w-6 min-h-6 flex items-center justify-center relative">
        <File05Icon className="text-icon-brand w-[16px] h-5" />
        {newNotes && (
          <div className="absolute top-0 left-[1px] size-[10px] bg-icon-active rounded-full border border-[#FAFBFC]"></div>
        )}
      </div>
    </div>
  );
};
