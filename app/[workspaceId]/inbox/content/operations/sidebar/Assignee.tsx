import { KeyboardShortcut } from "@/components/custom/KeyBoardShortcut";
import { Avatar } from "./Avatar";
import { Member, fakeMembersData } from "@/lib/realDataSchema";
import { AssignMemberComboBox } from "../../components/AssignMemberCombobox";

export const Assignee = ({
  assigneeData,
}: {
  assigneeData: Member | undefined;
}) => {
  // fetch the available members data from the workspace
  const availableMembers = fakeMembersData;

  // TODO API: handle assigning a member
  const handleAssign = (member: Member) => {
    console.log("assign", member);
  };

  return (
    <AssignMemberComboBox
      availableMembers={availableMembers}
      onAssign={handleAssign}
      alignPopover="center"
      customTrigger={
        <div className="flex items-center gap-3 px-5 py-4 border border-secondary rounded-lg">
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
