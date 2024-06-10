"use server";

import {
  Member,
  MemberWithRemoveWorkspaceHandler,
  fakeMembersData,
  fakeTeamsData,
  fakeWorkspaceData,
} from "@/lib/types";

export const fetchMembers = async (
  workspaceId: string
): Promise<MemberWithRemoveWorkspaceHandler[]> => {
  // Get the current workspace data
  const workspace = fakeWorkspaceData.find(
    (workspace) => workspace.slug === workspaceId
  );

  if (!workspace) {
    return [];
  }

  // Get members in the current workspace
  const members = fakeMembersData
    .filter((member) => {
      return (
        member.workspaces &&
        member.workspaces.some((w) => w.id === workspace.id)
      );
    })
    .map((member) => ({ ...member, currentWorkspace: workspace }));

  const membersWithDeleteHandler = members.map((member) => ({
    ...member,
    onDelete: () => {
      "use server";
      // Handle delete here
      //   console.log("Delete member", member);

      //   console.log("User workspace", workspace);

      // remove member from all teams in the workspace
      // This is where you would make an API call to delete the member from teams + workspace

      // Return true if the delete was successful
      // Return false if the delete failed
      return { success: true, member: member };
    },
  }));

  return membersWithDeleteHandler;
};
