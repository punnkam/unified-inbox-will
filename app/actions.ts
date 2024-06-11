"use server";

import {
  Member,
  MemberWithRemoveWorkspaceHandler,
  fakeMembersData,
  fakeTeamsData,
  fakeWorkspaceData,
  TeamWithMemberDeleteHandler,
} from "@/lib/types";

// Action to handle fetching members and adding a delete handler to each member
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
      console.log("Delete member", member);

      //   console.log("User workspace", workspace);

      // remove member from all teams in the workspace
      // This is where you would make an API call to delete the member from teams + workspace

      // Return true if the delete was successful
      // Return false if the delete failed
      return { success: true, member: member };
    },
    onInvite: () => {
      "use server";
      // Handle invite here
      console.log("Invite member", member);

      //   console.log("User workspace", workspace);

      // This is where you would make an API call to invite the member to the workspace

      // Return true if the invite was successful
      // Return false if the invite failed
      return { success: true, member: member };
    },
  }));

  return membersWithDeleteHandler;
};

// Action to handle fetching teams and adding a delete handler to each member
export const fetchTeams = async (
  workspaceId: string
): Promise<TeamWithMemberDeleteHandler[]> => {
  // Get the current workspace data
  const workspace = fakeWorkspaceData.find(
    (workspace) => workspace.slug === workspaceId
  );

  if (!workspace) {
    return [];
  }

  // Get teams in the current workspace
  const teams = fakeTeamsData.filter(
    (team) => team.workspaceId === workspace.id
  );

  // Add a rmove member handler to each member on each team
  const teamsWithDeleteHandler = teams.map((team) => ({
    ...team,
    members: team.members.map((member) => ({
      ...member,
      currentWorkspace: member.workspaces?.find(
        (workspace) => workspace.id === workspace.id
      ),
      onDelete: () => {
        "use server";
        // Handle remove here
        //   console.log("Remove member", member);

        // console.log("from team: ", team);

        // remove member from the team
        // This is where you would make an API call to delete the member from the team

        // Return true if the delete was successful
        // Return false if the delete failed
        return { success: true, member: member };
      },
    })),
  }));

  return teamsWithDeleteHandler;
};
