"use server";

import {
  Member,
  MemberWithRemoveWorkspaceHandler,
  fakeMembersData,
  fakeTeamsData,
  fakeWorkspaceData,
  TeamWithMemberDeleteHandler,
  ListingWithDeleteHandler,
  fakeListingsData,
  fakeSlackConnectionsData,
  SlackConnection,
  BreezewayConnection,
  fakeBreezewayConnectionsData,
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

// Action to handle fetching all listings in a workspace
export const fetchListings = async (
  workspaceId: string
): Promise<ListingWithDeleteHandler[]> => {
  // Get the current workspace data
  const workspace = fakeWorkspaceData.find(
    (workspace) => workspace.slug === workspaceId
  );

  if (!workspace) {
    return [];
  }

  // Get all listings in the current workspace
  const listings = fakeListingsData.filter(
    (listing) => listing.workspaceId === workspace.id
  );

  // Add a delete handler to each listing
  const listingsWithDeleteHandler = listings.map((listing) => ({
    ...listing,
    onDelete: () => {
      "use server";
      // Handle delete here
      console.log("Delete listing", listing);

      // This is where you would make an API call to delete the listing

      // Return true if the delete was successful
      // Return false if the delete failed
      return { success: true, listing: listing };
    },
    onActiveChange: () => {
      "use server";
      // Handle active change here
      console.log("Change active", listing);

      const currentActiveState = listing.active;

      // This is where you would make an API call to change the active state of the listing
      // Change the active state of the listing
      listing.active = !currentActiveState;

      console.log("Changed active to", listing.active);

      // Return true if the change was successful
      // Return false if the change failed
      return { success: true, listing: listing };
    },
  }));

  return listingsWithDeleteHandler;
};

export const fetchSlackConnections = async (
  workspaceId: string
): Promise<SlackConnection[]> => {
  // add a 2 second wait
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  // Get the current workspace data
  const workspace = fakeWorkspaceData.find(
    (workspace) => workspace.slug === workspaceId
  );

  if (!workspace) {
    return [];
  }

  // Get all slack connections in the current workspace
  const slackConnections = fakeSlackConnectionsData.filter(
    (slackConnection) => slackConnection.workspaceId === workspace.id
  );

  return slackConnections;
};

export const fetchBreezewayConnections = async (
  workspaceId: string
): Promise<BreezewayConnection[]> => {
  // add a 2 second wait
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  // Get the current workspace data
  const workspace = fakeWorkspaceData.find(
    (workspace) => workspace.slug === workspaceId
  );

  if (!workspace) {
    return [];
  }

  // Get all slack connections in the current workspace
  const breezewayConnection = fakeBreezewayConnectionsData.filter(
    (breezewayConnection) => breezewayConnection.workspaceId === workspace.id
  );

  return breezewayConnection;
};

export const saveSlackConnection = async (
  connection: SlackConnection
): Promise<{ success: boolean; message: string }> => {
  "use server";
  // add a 2 second wait
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Save the slack connection
  console.log("Saved slack connection", connection);

  // This is where you would make an API call to save the slack connection

  return { success: true, message: "Saved" };
};

export const removeSlackConnection = async (
  connection: SlackConnection
): Promise<{ success: boolean; message: string }> => {
  "use server";
  // add a 2 second wait
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Save the slack connection
  console.log("Removed slack connection", connection);

  // This is where you would make an API call to save the slack connection

  return { success: true, message: "Removed" };
};
