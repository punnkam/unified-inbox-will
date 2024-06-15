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
  Workspace,
  fakeSavedRepliesData,
  SavedReply,
  ConversationTag,
  fakeConversationTags,
  PersonalNotifications,
  Listing,
  ReservationLabel,
  fakeReservationLabels,
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

/*
 *  Teams page actions
 */

// Action to handle fetching teams and adding a delete handler to each member
export const fetchTeams = async (
  workspaceId: string
): Promise<{
  success: boolean;
  message: string;
  data?: TeamWithMemberDeleteHandler[];
}> => {
  // Get the current workspace data
  const workspace = fakeWorkspaceData.find(
    (workspace) => workspace.slug === workspaceId
  );

  if (!workspace) {
    return { success: false, message: "Workspace not found" };
  }

  // await new Promise((resolve) => setTimeout(resolve, 2000));

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
        console.log("Remove member", member, " from team", team.id!);

        // console.log("from team: ", team);

        // remove member from the team
        // This is where you would make an API call to delete the member from the team

        // Return true if the delete was successful
        // Return false if the delete failed
        return { success: true, member: member };
      },
    })),
  }));

  return {
    success: true,
    message: "Fetched teams",
    data: teamsWithDeleteHandler,
  };
};

export const fetchTeam = async (
  teamId: string
): Promise<{
  success: boolean;
  message: string;
  data?: { team: TeamWithMemberDeleteHandler; availableMembers: Member[] };
}> => {
  "use server";

  // Get the current team data
  const team = fakeTeamsData.find((team) => team.id === parseInt(teamId));

  if (!team) {
    return { success: false, message: "Team not found" };
  }

  const currentWorkspace = await getWorkspace(team.workspaceId);

  if (
    !currentWorkspace ||
    !currentWorkspace.success ||
    !currentWorkspace.data
  ) {
    return { success: false, message: "Workspace not found" };
  }

  // add a 2 second wait
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // This is where you would make an API call to fetch the team

  // Add a rmove member handler to each member on the team
  const teamWithDeleteHandler = {
    ...team,
    members: team.members.map((member) => ({
      ...member,
      teamId: parseInt(teamId),
      currentWorkspace: member.workspaces?.find(
        (workspace) => workspace.id === team.workspaceId
      ),
      onDelete: () => {
        "use server";
        // Handle remove here
        console.log("Remove member", member);

        // remove member from the team
        // This is where you would make an API call to delete the member from the team

        // Return true if the delete was successful
        // Return false if the delete failed
        return { success: true, member: member };
      },
    })),
  };

  // get all active members not in the team
  const availableMembers = fakeMembersData.filter(
    (member) =>
      // Check member is not in the specified team
      !member.teamIds?.includes(parseInt(teamId)) &&
      // Check member is in the current workspace and active
      member.workspaces?.some(
        (workspace) =>
          currentWorkspace.data?.id === workspace.id &&
          workspace.status === "Active"
      )
  );

  return {
    success: true,
    message: "Fetched team",
    data: {
      team: teamWithDeleteHandler,
      availableMembers: availableMembers,
    },
  };
};

export const saveTeam = async (team: {
  id?: number;
  workspaceId: number;
  name: string;
  iconId: number;
  members: number[];
}): Promise<{ success: boolean; message: string }> => {
  "use server";
  // add a 2 second wait
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (team.id) {
    // Update the team
    console.log("Updated team", team);

    // This is where you would make an API call to update the team

    return { success: true, message: "Saved" };
  } else {
    // if it is a new team - it will not have an id
    // Save the team
    console.log("Added team", team);

    // This is where you would make an API call to save the team

    return { success: true, message: "Added" };
  }
};

export const deleteTeam = async (
  teamId: number
): Promise<{ success: boolean; message: string }> => {
  "use server";
  // add a 2 second wait
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // Save the team
  console.log("Deleted team", teamId);

  // This is where you would make an API call to delete the team

  return { success: true, message: "Deleted" };
};

export const fetchAvailableMembers = async (
  workspaceId: number
): Promise<Member[]> => {
  // Get all members in the current workspace
  const members = fakeMembersData.filter((member) =>
    member.workspaces?.some(
      (workspace) =>
        workspace.id === workspaceId && workspace.status === "Active"
    )
  );

  return members;
};

/*
 *  Signature page actions
 */

export const fetchSignature = async (
  workspaceId: number
): Promise<{ success: boolean; message: string; data?: string }> => {
  "use server";

  const workspace = fakeWorkspaceData.find(
    (workspace) => workspace.id === workspaceId
  );

  if (!workspace) {
    return { success: false, message: "Workspace not found" };
  }

  // add a 2 second wait
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // This is where you would make an API call to fetch the signature

  return {
    success: true,
    message: "Fetched signature",
    data: workspace.signature,
  };
};

export const saveSignature = async (
  workspaceId: number,
  signature: string
): Promise<{ success: boolean; message: string }> => {
  "use server";

  // add a 2 second wait

  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log("Saved signature", signature + " for workspace " + workspaceId);

  // This is where you would make an API call to save the signature

  return { success: true, message: "Saved" };
};

/*
 *  Personal Notifications actions
 */

export const fetchPersonalNotifications = async (
  workspaceId: string,
  memberId: number
): Promise<{ success: boolean; message: string; data?: Member }> => {
  "use server";

  const workspace = fakeWorkspaceData.find(
    (workspace) => workspace.slug === workspaceId
  );

  if (!workspace) {
    return { success: false, message: "Workspace not found" };
  }

  // add a 2 second wait
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // This is where you would make an API call to fetch the personal notifications

  // get the member with the same id
  const member = fakeMembersData.find((member) => member.id === memberId);

  if (!member) {
    return { success: false, message: "Member not found" };
  }

  return {
    success: true,
    message: "Fetched personal notifications",
    data: member,
  };
};

export const savePersonalNotifications = async (
  memberId: number,
  personalNotifications: PersonalNotifications
): Promise<{ success: boolean; message: string }> => {
  "use server";

  // add a 2 second fake delay
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log(
    "Member: " + memberId + " - Saved personal notifications",
    personalNotifications
  );

  // This is where you would make an API call to save the personal notifications

  return { success: true, message: "Saved" };
};

/*
 *  General page actions
 */

export const fetchGeneralSettings = async (
  workspaceId: string
): Promise<{ success: boolean; message: string; data?: Workspace }> => {
  "use server";

  const workspace = fakeWorkspaceData.find(
    (workspace) => workspace.slug === workspaceId
  );

  if (!workspace) {
    return { success: false, message: "Workspace not found" };
  }

  // add a 2 second wait
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // This is where you would make an API call to fetch the general settings

  return {
    success: true,
    message: "Fetched general settings",
    data: workspace,
  };
};

export const saveGeneralSettings = async (
  workspaceId: string,
  workspace: Workspace["generalSettings"]
): Promise<{ success: boolean; message: string }> => {
  "use server";

  const workspaceData = fakeWorkspaceData.find(
    (workspace) => workspace.slug === workspaceId
  );

  if (!workspaceData) {
    return { success: false, message: "Workspace not found" };
  }

  // add a 2 second wait
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log(
    "Saved workspace: " + workspaceData.id + " general settings",
    workspace
  );

  // This is where you would make an API call to save the general settings

  return { success: true, message: "Saved" };
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

/*
 *   Members page actions
 */

export const saveMember = async (
  member: Member
): Promise<{ success: boolean; message: string }> => {
  "use server";
  // add a 2 second wait
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (member.id) {
    // Update the member
    console.log("Updated member", member);

    // This is where you would make an API call to update the member
    return { success: true, message: "Saved" };
  } else {
    // if it is a new member - it will not have an id
    // Save the member
    console.log("Saved member", member);

    // This is where you would make an API call to save the member
    return { success: true, message: "Saved" };
  }
};

export const fetchMember = async (
  memberId: number
): Promise<{ success: boolean; message: string; data?: Member }> => {
  "use server";
  // add a 2 second wait
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // This is where you would make an API call to fetch the member

  // get the member with the same id
  const member = fakeMembersData.find((member) => member.id === memberId);

  if (!member) {
    return { success: false, message: "Member not found" };
  }

  return {
    success: true,
    message: "Fetched member",
    data: member,
  };
};

/*
 *   Integrations page actions
 */

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

export const createBreezewayConnection = async (
  clientId: string,
  clientSecret: string
): Promise<{ success: boolean; message: string }> => {
  "use server";
  // add a 2 second wait
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Save the slack connection
  console.log("Created breezeway connection", clientId, clientSecret);

  // This is where you would make an API call to save the slack connection

  return { success: true, message: "Created" };
};

export const saveBreezewayConnection = async (
  connection: BreezewayConnection
): Promise<{ success: boolean; message: string }> => {
  "use server";
  // add a 2 second wait
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Save the slack connection
  console.log("Saved breezeway connection", connection);

  // This is where you would make an API call to save the slack connection

  return { success: true, message: "Saved" };
};

export const removeBreezewayConnection = async (
  connection: BreezewayConnection
): Promise<{ success: boolean; message: string }> => {
  "use server";
  // add a 2 second wait
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Save the slack connection
  console.log("Removed breezeway connection", connection);

  // This is where you would make an API call to save the slack connection

  return { success: true, message: "Removed" };
};

/*
 *  Inbox configuration page actions
 */

export const fetchInboxGeneralSettings = async (
  workspaceId: string
): Promise<{ success: boolean; message: string; data?: Workspace }> => {
  "use server";

  const workspace = fakeWorkspaceData.find(
    (workspace) => workspace.slug === workspaceId
  );

  if (!workspace) {
    return { success: false, message: "Workspace not found" };
  }

  // add a 2 second wait
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // This is where you would make an API call to fetch the inbox general settings

  return {
    success: true,
    message: "Fetched inbox general settings",
    data: workspace,
  };
};

export const saveInboxGeneralSettings = async (
  workspace: Workspace
): Promise<{ success: boolean; message: string }> => {
  "use server";
  // add a 2 second wait
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Save the inbox general settings
  console.log("Saved inbox general settings", workspace);

  // This is where you would make an API call to save the inbox general settings

  return { success: true, message: "Saved" };
};

/*
 * AI settings page actions
 */

export const fetchAiSettings = async (
  workspaceId: string
): Promise<{
  success: boolean;
  message: string;
  data?: Workspace["aiSettings"];
}> => {
  "use server";

  const workspace = fakeWorkspaceData.find(
    (workspace) => workspace.slug === workspaceId
  );

  if (!workspace) {
    return { success: false, message: "Workspace not found" };
  }

  // add a 2 second wait
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // This is where you would make an API call to fetch the AI settings

  return {
    success: true,
    message: "Fetched AI settings",
    data: workspace.aiSettings,
  };
};

export const saveAiSettings = async (
  workspaceId: string,
  aiSettings: Workspace["aiSettings"]
): Promise<{ success: boolean; message: string }> => {
  "use server";
  // add a 2 second wait
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const workspace = await getWorkspace(workspaceId);

  if (!workspace || !workspace.success || !workspace.data) {
    return { success: false, message: "Workspace not found" };
  }

  console.log("workspace", workspace.data.id);

  // Save the AI settings
  console.log("Saved AI settings", aiSettings);

  // This is where you would make an API call to save the AI settings

  return { success: true, message: "Saved" };
};

export const saveAutopilotListings = async (
  listings: Listing[]
): Promise<{ success: boolean; message: string }> => {
  "use server";
  // add a 2 second wait
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Save the autopilot listings
  console.log("Saved autopilot listings", listings);

  listings.forEach((listing) => {
    console.log("Listing id: ", listing.id);
    console.log("Autopilot: ", listing.autopilot);
  });

  // This is where you would make an API call to save the autopilot listings

  return { success: true, message: "Saved" };
};

/*
 * Saved replies page actions
 */

export const fetchSavedReplies = async (
  workspaceId: string
): Promise<{ success: boolean; message: string; data?: SavedReply[] }> => {
  "use server";

  const workspace = fakeWorkspaceData.find(
    (workspace) => workspace.slug === workspaceId
  );

  if (!workspace) {
    return { success: false, message: "Workspace not found" };
  }

  // add a 2 second wait
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // This is where you would make an API call to fetch the saved replies

  // get the saved replies with the same workspaceId
  const savedReplies = fakeSavedRepliesData.filter(
    (savedReply) => savedReply.workspaceId === workspace.id
  );

  return {
    success: true,
    message: "Fetched saved replies",
    data: savedReplies,
  };
};

export const fetchSavedReply = async (
  savedReplyId: string
): Promise<{ success: boolean; message: string; data?: SavedReply }> => {
  "use server";

  // add a 2 second wait
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // This is where you would make an API call to fetch the saved reply

  // get the saved reply with the same id
  const savedReply = fakeSavedRepliesData.find(
    (savedReply) => savedReply.id === parseInt(savedReplyId)
  );

  return {
    success: true,
    message: "Fetched saved reply",
    data: savedReply,
  };
};

export const deleteSavedReply = async (
  savedReply: SavedReply
): Promise<{ success: boolean; message: string }> => {
  "use server";
  // add a 2 second wait
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Save the saved reply
  console.log("Deleted saved reply", savedReply);

  // This is where you would make an API call to delete the saved reply

  return { success: true, message: "Deleted" };
};

export const saveSavedReply = async (
  savedReply: SavedReply
): Promise<{ success: boolean; message: string }> => {
  "use server";
  // add a 2 second wait
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (savedReply.id) {
    // Update the saved reply
    console.log("Updated saved reply", savedReply);
  } else {
    // if it is a new reply - it will not have an id
    // Save the saved reply
    console.log("Saved new reply", savedReply);
  }

  // This is where you would make an API call to save the saved reply

  return { success: true, message: "Saved" };
};

/*
 * Conversation tags actions
 */

export const fetchConversationTags = async (
  workspaceId: string
): Promise<{ success: boolean; message: string; data?: ConversationTag[] }> => {
  "use server";

  const workspace = fakeWorkspaceData.find(
    (workspace) => workspace.slug === workspaceId
  );

  if (!workspace) {
    return { success: false, message: "Workspace not found" };
  }

  // add a 2 second wait
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // This is where you would make an API call to fetch the conversation tags

  // get the conversation tags with the same workspaceId
  const conversationTags = fakeConversationTags.filter(
    (conversationTag) => conversationTag.workspaceId === workspace.id
  );

  return {
    success: true,
    message: "Fetched conversation tags",
    data: conversationTags,
  };
};

export const fetchConversationTag = async (
  conversationTagId: string
): Promise<{ success: boolean; message: string; data?: ConversationTag }> => {
  "use server";

  // add a 2 second wait
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // This is where you would make an API call to fetch the conversation tag

  // get the conversation tag with the same id
  const conversationTag = fakeConversationTags.find(
    (conversationTag) => conversationTag.id === parseInt(conversationTagId)
  );

  if (!conversationTag) {
    return { success: false, message: "Conversation tag not found" };
  }

  return {
    success: true,
    message: "Fetched conversation tag",
    data: conversationTag,
  };
};

export const deleteConversationTag = async (
  conversationTag: ConversationTag
): Promise<{ success: boolean; message: string }> => {
  "use server";
  // add a 2 second wait
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Save the conversation tag
  console.log("Deleted conversation tag", conversationTag);

  // This is where you would make an API call to delete the conversation tag

  return { success: true, message: "Deleted" };
};

export const saveConversationTag = async (
  conversationTag: ConversationTag
): Promise<{ success: boolean; message: string }> => {
  "use server";
  // add a 2 second wait
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (conversationTag.id) {
    // Update the conversation tag
    console.log("Updated conversation tag", conversationTag);
  } else {
    // if it is a new tag - it will not have an id
    // Save the conversation tag
    console.log("Saved new tag", conversationTag);
  }

  // This is where you would make an API call to save the conversation tag

  return { success: true, message: "Saved" };
};

/*
 * Reservation Label page actions
 */

export const fetchReservationLabels = async (
  workspaceId: string
): Promise<{
  success: boolean;
  message: string;
  data?: ReservationLabel[];
}> => {
  "use server";

  const workspace = fakeWorkspaceData.find(
    (workspace) => workspace.slug === workspaceId
  );

  if (!workspace) {
    return { success: false, message: "Workspace not found" };
  }

  // add a 2 second wait
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // This is where you would make an API call to fetch the reservation labels

  // get the reservation labels with the same workspaceId
  const reservationLabels = fakeReservationLabels.filter(
    (reservationLabel) => reservationLabel.workspaceId === workspace.id
  );

  return {
    success: true,
    message: "Fetched reservation labels",
    data: reservationLabels,
  };
};

export const fetchReservationLabel = async (
  reservationLabelId: string
): Promise<{ success: boolean; message: string; data?: ReservationLabel }> => {
  "use server";

  // add a 2 second wait
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // This is where you would make an API call to fetch the reservation label

  // get the reservation label with the same id
  const reservationLabel = fakeReservationLabels.find(
    (reservationLabel) => reservationLabel.id === parseInt(reservationLabelId)
  );

  if (!reservationLabel) {
    return { success: false, message: "Reservation label not found" };
  }

  return {
    success: true,
    message: "Fetched reservation label",
    data: reservationLabel,
  };
};

export const deleteReservationLabel = async (
  reservationLabel: ReservationLabel
): Promise<{ success: boolean; message: string }> => {
  "use server";
  // add a 2 second wait
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Save the reservation label
  console.log("Deleted reservation label", reservationLabel);

  // This is where you would make an API call to delete the reservation label

  return { success: true, message: "Deleted" };
};

export const saveReservationLabel = async (
  reservationLabel: ReservationLabel
): Promise<{ success: boolean; message: string }> => {
  "use server";
  // add a 2 second wait
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (reservationLabel.id) {
    // Update the reservation label
    console.log("Updated reservation label", reservationLabel);
  } else {
    // if it is a new label - it will not have an id
    // Save the reservation label
    console.log("Saved new label", reservationLabel);
  }

  // This is where you would make an API call to save the reservation label

  return { success: true, message: "Saved" };
};

/*
 * Misc Workspace actions
 */

export const getWorkspace = async (
  workspaceId: string | number
): Promise<{ success: boolean; message: string; data?: Workspace }> => {
  "use server";

  const workspace = fakeWorkspaceData.find(
    (workspace) =>
      workspace.slug === workspaceId || workspace.id === workspaceId
  );

  if (!workspace) {
    return { success: false, message: "Workspace not found" };
  }

  return {
    success: true,
    message: "Fetched workspace",
    data: workspace,
  };
};
