import { KeyboardShortcut } from "@/components/custom/KeyBoardShortcut";
import { Avatar } from "./Avatar";
import { Conversation, Member, fakeMembersData } from "@/lib/realDataSchema";
import { AssignMemberComboBox } from "../../components/AssignMemberCombobox";
import { cn } from "@/lib/utils";

export const Assignee = ({
  assigneeData,
  conversationId,
}: {
  assigneeData: Member | undefined;
  conversationId: Conversation["id"];
}) => {
  // fetch the available members data from the workspace
  const availableMembers = fakeMembersData;

  // TODO API: handle assigning a member
  const handleAssign = (member: Member) => {
    console.log("assign", member);
    console.log("conversationId", conversationId);
  };

  return (
    <AssignMemberComboBox
      availableMembers={availableMembers}
      onAssign={handleAssign}
      alignPopover="center"
      customTrigger={
        <div
          className={cn(
            "flex items-center gap-3 px-5 py-4 border border-secondary rounded-lg",
            assigneeData && "bg-primary"
          )}
        >
          <Avatar size={"medium"} image={assigneeData && assigneeData.image} />
          <div className="flex items-center justify-between w-full">
            <p className="text-subtitle-sm">
              {assigneeData ? assigneeData.name : "Unassigned"}
            </p>
            <KeyboardShortcut shortcut="A" size={"large"} />
          </div>
        </div>
      }
    />
  );
};
