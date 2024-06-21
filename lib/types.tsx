import {
  AnchorIcon,
  CarIcon,
  Dice1Icon,
  FaceIdIcon,
  GlobeIcon,
  HeartsIcon,
  HourGlassIcon,
  Menu5Icon,
  MoonStarIcon,
  MountainIcon,
  SendIcon,
  ShieldIcon,
  SnowflakeIcon,
  Star3Icon,
  StarsIcon,
  StopIcon,
  TreesIcon,
  WindIcon,
  ZapSquareIcon,
  UmbrellaIcon,
} from "@/components/icons/CustomIcons";

export type Member = {
  id?: number;
  teamIds?: number[];
  name?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  image?: string;
  workspaces?: {
    id: number;
    status: "Active" | "Pending";
    role: "Admin" | "Member" | "External Team";
  }[];
  personalNotifications?: PersonalNotifications;
};

export type Team = {
  id?: number;
  workspaceId: number;
  name: string;
  iconId: number;
  members: Member[];
};

export type Workspace = {
  id: number;
  slug: string;
  inboxConfiguration: {
    asignConversations: "Members" | "Teams";
    autoMarkAsDone: boolean;
    roundRobin: boolean;
    firstResponder: boolean;
  };
  aiSettings: {
    summarizeConversations: boolean;
    responseLanguage: "English" | "Guest Language";
    aiSignature: string;
    autoPilot: boolean;
    autoPilotSettings?: {
      messageType: "All" | "Inquiries";
      gaurdrails: {
        notEnoughInformation: boolean;
        isManaullyAnswered: boolean;
        taggedWithConversationTag: boolean;
      };
      schedule?: {
        day: {
          monday: {
            active: boolean;
            time: {
              start: string;
              end: string;
            };
          };
          tuesday: {
            active: boolean;
            time: {
              start: string;
              end: string;
            };
          };
          wednesday: {
            active: boolean;
            time: {
              start: string;
              end: string;
            };
          };
          thursday: {
            active: boolean;
            time: {
              start: string;
              end: string;
            };
          };
          friday: {
            active: boolean;
            time: {
              start: string;
              end: string;
            };
          };
          saturday: {
            active: boolean;
            time: {
              start: string;
              end: string;
            };
          };
          sunday: {
            active: boolean;
            time: {
              start: string;
              end: string;
            };
          };
        };
        timezone: string;
      };
    };
  };
  signature: string;
  generalSettings: {
    name?: string;
    logo?: string;
  };
};

export type ListingGroup = {
  id: number;
  workspaceId: number;
  name: string;
  color: "bg-cyan-500" | "bg-lime-500" | "bg-amber-500";
};

export type Listing = {
  id: number;
  workspaceId: number;
  active: boolean;
  title: string;
  address: string;
  image: string;
  autopilot: boolean;
  group?: number;
};

export type MemberWithTeamId = Member & { teamId: number };

export type MemberWithDeleteHandler = Member & {
  currentWorkspace?: {
    id: number;
    status: "Active" | "Pending";
    role: "Admin" | "Member" | "External Team";
  };
  onDelete: (member: MemberWithDeleteHandler) => {
    success: boolean;
    member: Member;
  };
};

export type MemberWithRemoveWorkspaceHandler = Member & {
  currentWorkspace: Workspace;
  onDelete: (member: MemberWithRemoveWorkspaceHandler) => {
    success: boolean;
    member: Member;
  };
  onInvite?: (member: MemberWithRemoveWorkspaceHandler) => {
    success: boolean;
    member: Member;
  };
};

export type TeamWithMemberDeleteHandler = Omit<Team, "members"> & {
  members: MemberWithDeleteHandler[];
};

export type ListingWithDeleteHandler = Listing & {
  onDelete: (listing: Listing) => {
    success: boolean;
    listing: Listing;
  };
  onActiveChange: (listing: Listing) => {
    success: boolean;
    listing: Listing;
  };
};

export type PersonalNotifications = {
  pushNotifications: boolean;
  email: boolean;
  newGuestMessages: boolean;
  conversationTag: boolean;
  assignedToGuestConversation: boolean;
  mentionedInConversationNote: boolean;
  newDetectedUpsells: boolean;
  expiringUpsells: boolean;
  newTasks: boolean;
  assignedTask: boolean;
  taskMarkedAsDone: boolean;
};

export type SlackConnection = {
  id: number;
  workspaceId: number;
  connected: boolean;
  name: string;
  image: string;
  connectionDate: string;
  options?: {
    guestMessaging: boolean;
    upsells: boolean;
    tasks: boolean;
    copySetupToListingGroups: boolean;
  };
};

export type BreezewayLabel = "Cleaning" | "Maintenance" | "Inspections";

export type BreezewayConnection = {
  id: number;
  workspaceId: number;
  connected: boolean;
  name: string;
  image: string;
  connectionDate: string;
  clientId: string;
  clientSecret: string;
  options?: {
    labelledMaintenance: BreezewayLabel;
    labelledCleaning: BreezewayLabel;
    labelledSafety: BreezewayLabel;
    labelledSupplies: BreezewayLabel;
    labelledOther: BreezewayLabel;
  };
};

export type SavedReply = {
  id?: number;
  workspaceId: number;
  name: string;
  reply: string;
};

export type ConversationTagType = {
  id: number;
  type: "Urgent" | "Money" | "Calendar" | "Other";
  color: "error" | "success" | "active" | "tertiary";
};

export const conversationTagTypes: ConversationTagType[] = [
  { id: 1, type: "Urgent", color: "error" },
  { id: 2, type: "Money", color: "success" },
  { id: 3, type: "Calendar", color: "active" },
  { id: 4, type: "Other", color: "tertiary" },
];

export type ConversationTag = {
  id?: number;
  workspaceId: number;
  iconId?: number;
  name: string;
  description: string;
  type: ConversationTagType;
  actionItem: "Mark as done" | "Create task";
  inboxDashboard?: boolean;
};

export const fakeConversationTags: ConversationTag[] = [
  {
    id: 1,
    workspaceId: 1,
    iconId: 0,
    name: "Early Check-In",
    description: "This conversation needs immediate attention",
    type: conversationTagTypes[0],
    actionItem: "Mark as done",
    inboxDashboard: true,
  },
  {
    id: 2,
    workspaceId: 1,
    iconId: 1,
    name: "Late Checkout",
    description: "This conversation is about money",
    type: conversationTagTypes[1],
    actionItem: "Create task",
    inboxDashboard: true,
  },
  {
    id: 3,
    workspaceId: 1,
    iconId: 2,
    name: "Forgotten item",
    description: "This conversation is about scheduling",
    type: conversationTagTypes[2],
    actionItem: "Create task",
    inboxDashboard: true,
  },
  {
    id: 4,
    workspaceId: 1,
    iconId: 3,
    name: "Other thing",
    description: "This conversation is about something else",
    type: conversationTagTypes[3],
    actionItem: "Mark as done",
  },
];

export type ReservationLabel = {
  id?: number;
  workspaceId: number;
  name: string;
  description: string;
  emojiId: string;
  autoLabel: boolean;
};

export const fakeReservationLabels: ReservationLabel[] = [
  {
    id: 1,
    workspaceId: 1,
    name: "Family",
    description: "Guest who is bringing kids",
    emojiId: "1f46b",
    autoLabel: false,
  },
  {
    id: 2,
    workspaceId: 1,
    name: "Whale",
    description: "Guest whose stay length is > 7 nights",
    emojiId: "1f911",
    autoLabel: false,
  },
  {
    id: 3,
    workspaceId: 1,
    name: "Couple",
    description: "Guest who is on a romantic trip",
    emojiId: "1f496",
    autoLabel: false,
  },
];

export const fakeMembersData: Member[] = [
  {
    id: 1,
    workspaces: [
      { id: 2, status: "Pending", role: "Member" },
      { id: 1, status: "Active", role: "Admin" },
    ],
    teamIds: [1, 3],
    name: "James Doe",
    email: "m@example.com",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    personalNotifications: {
      pushNotifications: true,
      email: false,
      newGuestMessages: true,
      conversationTag: false,
      assignedToGuestConversation: true,
      mentionedInConversationNote: false,
      newDetectedUpsells: true,
      expiringUpsells: true,
      newTasks: false,
      assignedTask: true,
      taskMarkedAsDone: false,
    },
  },
  {
    id: 2,
    workspaces: [{ id: 1, status: "Active", role: "Member" }],
    teamIds: [2, 4],
    name: "Jack Doe",
    email: "jack@gmail.com",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    workspaces: [{ id: 1, status: "Active", role: "External Team" }],
    teamIds: [1, 2, 3, 4],
    name: "John Doe",
    email: "john@gmail.com",
    image:
      "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    workspaces: [{ id: 1, status: "Pending", role: "Member" }],
    teamIds: [],
    name: "Jose Doe",
    email: "jose@gmail.com",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const fakeTeamsData: Team[] = [
  {
    id: 1,
    workspaceId: 1,
    name: "Team 1",
    iconId: 0,
    members: fakeMembersData.filter(
      (member) =>
        member.teamIds?.includes(1) &&
        member.workspaces?.filter(
          (workspace) => workspace.id === 1 && workspace.status === "Active"
        )
    ),
  },
  {
    id: 2,
    workspaceId: 1,
    name: "Team 2",
    iconId: 2,
    members: fakeMembersData.filter(
      (member) =>
        member.teamIds?.includes(2) &&
        member.workspaces?.filter(
          (workspace) => workspace.id === 1 && workspace.status === "Active"
        )
    ),
  },
  {
    id: 3,
    workspaceId: 2,
    name: "Team 3",
    iconId: 1,
    members: fakeMembersData.filter(
      (member) =>
        member.teamIds?.includes(3) &&
        member.workspaces?.filter(
          (workspace) => workspace.id === 1 && workspace.status === "Active"
        )
    ),
  },
  {
    id: 4,
    workspaceId: 1,
    name: "Team 4",
    iconId: 19,
    members: fakeMembersData.filter(
      (member) =>
        member.teamIds?.includes(4) &&
        member.workspaces?.filter(
          (workspace) => workspace.id === 1 && workspace.status === "Active"
        )
    ),
  },
];

export const fakeWorkspaceData: Workspace[] = [
  {
    id: 1,
    slug: "will",
    inboxConfiguration: {
      asignConversations: "Members",
      autoMarkAsDone: true,
      roundRobin: true,
      firstResponder: true,
    },
    aiSettings: {
      summarizeConversations: true,
      responseLanguage: "English",
      aiSignature: "hi there from AI",
      autoPilot: false,
      autoPilotSettings: {
        messageType: "All",
        gaurdrails: {
          notEnoughInformation: true,
          isManaullyAnswered: false,
          taggedWithConversationTag: false,
        },
        schedule: {
          day: {
            monday: {
              active: true,
              time: {
                start: "09:00",
                end: "17:00",
              },
            },
            tuesday: {
              active: true,
              time: {
                start: "09:00",
                end: "17:00",
              },
            },
            wednesday: {
              active: true,
              time: {
                start: "09:00",
                end: "17:00",
              },
            },
            thursday: {
              active: true,
              time: {
                start: "09:00",
                end: "17:00",
              },
            },
            friday: {
              active: true,
              time: {
                start: "09:00",
                end: "17:00",
              },
            },
            saturday: {
              active: false,
              time: {
                start: "09:00",
                end: "17:00",
              },
            },
            sunday: {
              active: false,
              time: {
                start: "09:00",
                end: "17:00",
              },
            },
          },
          timezone: "America/New_York",
        },
      },
    },
    signature: "hi there",
    generalSettings: {
      name: "Will's Workspace",
    },
  },
];

export const fakeListingsData: Listing[] = [
  {
    id: 1,
    workspaceId: 1,
    active: true,
    title: "Cozy 2 Bedroom Apartment",
    address: "1234 Elm Street",
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    autopilot: true,
    group: 3,
  },
  {
    id: 2,
    workspaceId: 1,
    active: true,
    title: "Modern 1 Bedroom Apartment",
    address: "5678 Oak Street",
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    autopilot: false,
  },
  {
    id: 3,
    workspaceId: 1,
    active: false,
    title: "Spacious 3 Bedroom House",
    address: "91011 Pine Street",
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    autopilot: true,
    group: 2,
  },
  {
    id: 4,
    workspaceId: 1,
    active: false,
    title: "Spacious 3 Bedroom House",
    address: "91011 Pine Street",
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    autopilot: true,
    group: 1,
  },
  {
    id: 5,
    workspaceId: 1,
    active: false,
    title: "Spacious 3 Bedroom House",
    address: "91011 Pine Street",
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    autopilot: false,
    group: 2,
  },
  {
    id: 6,
    workspaceId: 1,
    active: false,
    title: "Spacious 3 Bedroom House",
    address: "91011 Pine Street",
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    autopilot: true,
    group: 3,
  },
];

export const fakeSlackConnectionsData: SlackConnection[] = [
  {
    id: 1,
    workspaceId: 1,
    connected: true,
    name: "Canbnb",
    image:
      "https://images.unsplash.com/photo-1516876437184-593fda40c7ce?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    connectionDate: "2024-06-01",
    options: {
      guestMessaging: true,
      upsells: true,
      tasks: false,
      copySetupToListingGroups: false,
    },
  },
];

export const fakeSavedRepliesData: SavedReply[] = [
  {
    id: 1,
    workspaceId: 1,
    name: "Check-in instructions",
    reply: `Hello [guest name],
    This message is being sent out to the property to remindall guests that smoking, vaping, etc. is strictly prohibited inside your unit Any smoking must take place no less than 40 feet away from the building.
    Thank you,
    Andrew`,
  },
  {
    id: 2,
    workspaceId: 1,
    name: "Check-out instructions",
    reply: `Hello [guest name],
    This message is being sent out to the property to remindall guests that smoking, vaping, etc. is strictly prohibited inside your unit Any smoking must take place no less than 40 feet away from the building.
    Thank you,
    Andrew`,
  },
  {
    id: 3,
    workspaceId: 1,
    name: "Wifi password",
    reply: `Hello [guest name],
    This message is being sent out to the property to remindall guests that smoking, vaping, etc. is strictly prohibited inside your unit Any smoking must take place no less than 40 feet away from the building.
    Thank you,
    Andrew`,
  },
];

export const fakeBreezewayConnectionsData: BreezewayConnection[] = [
  {
    id: 1,
    workspaceId: 1,
    connected: true,
    name: "Canbnb",
    image:
      "https://images.unsplash.com/photo-1516876437184-593fda40c7ce?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    connectionDate: "2024-02-01",
    clientId: "12345",
    clientSecret: "67890",
    options: {
      labelledMaintenance: "Maintenance",
      labelledCleaning: "Cleaning",
      labelledSafety: "Inspections",
      labelledSupplies: "Maintenance",
      labelledOther: "Cleaning",
    },
  },
];

export const fakeIconsData = [
  {
    id: 0,
    name: "Snowflake",
    icon: SnowflakeIcon,
  },
  {
    id: 1,
    name: "Car",
    icon: CarIcon,
  },
  {
    id: 2,
    name: "Moon",
    icon: MoonStarIcon,
  },
  {
    id: 3,
    name: "Anchor",
    icon: AnchorIcon,
  },
  {
    id: 4,
    name: "Umbrella",
    icon: UmbrellaIcon,
  },
  {
    id: 5,
    name: "Globe",
    icon: GlobeIcon,
  },
  {
    id: 6,
    name: "FaceId",
    icon: FaceIdIcon,
  },
  {
    id: 7,
    name: "Wind",
    icon: WindIcon,
  },
  {
    id: 8,
    name: "DiceOne",
    icon: Dice1Icon,
  },
  {
    id: 9,
    name: "Hourglass",
    icon: HourGlassIcon,
  },
  {
    id: 10,
    name: "Mountain",
    icon: MountainIcon,
  },
  {
    id: 11,
    name: "Send",
    icon: SendIcon,
  },
  {
    id: 12,
    name: "Stars",
    icon: StarsIcon,
  },
  {
    id: 13,
    name: "Menu",
    icon: Menu5Icon,
  },
  {
    id: 14,
    name: "Hearts",
    icon: HeartsIcon,
  },
  {
    id: 15,
    name: "ZapSquare",
    icon: ZapSquareIcon,
  },
  {
    id: 16,
    name: "Star3",
    icon: Star3Icon,
  },
  {
    id: 17,
    name: "Trees",
    icon: TreesIcon,
  },
  {
    id: 18,
    name: "Stop",
    icon: StopIcon,
  },
  {
    id: 19,
    name: "Shield",
    icon: ShieldIcon,
  },
];

export const variablesList = [
  { key: "Listing Name", value: "{listingName}" },
  { key: "Listing City", value: "{listingCity}" },
  { key: "Listing State", value: "{listingState}" },
  { key: "Listing Country", value: "{listingCountry}" },
  { key: "Listing Property Type", value: "{listingPropertyType}" },
  { key: "Listing Address", value: "{listingAddress}" },
  {
    key: "Listing Check In Instructions",
    value: "{listingCheckInInstructions}",
  },
  {
    key: "Listing Check Out Instructions",
    value: "{listingCheckOutInstructions}",
  },
  { key: "Listing Cancellation Policy", value: "{listingCancellationPolicy}" },
  { key: "Listing House Rules", value: "{listingHouseRules}" },
  { key: "Listing Guidebook Url", value: "{listingGuidebookUrl}" },
  { key: "Reservation Channel Name", value: "{reservationChannelName}" },
  { key: "Reservation Arrival Date", value: "{reservationArrivalDate}" },
  { key: "Reservation Departure Date", value: "{reservationDepartureDate}" },
  {
    key: "Reservation Arrival Date Time",
    value: "{reservationArrivalDateTime}",
  },
  {
    key: "Reservation Departure Date Time",
    value: "{reservationDepartureDateTime}",
  },
  { key: "Reservation Guest Full Name", value: "{reservationGuestFullName}" },
  { key: "Reservation Guest First Name", value: "{reservationGuestFirstName}" },
  { key: "Reservation Guest Email", value: "{reservationGuestEmail}" },
  { key: "Reservation Guest Phone", value: "{reservationGuestPhone}" },
  { key: "Reservation Guest Portal Url", value: "{reservationGuestPortalUrl}" },
];

export const timezones = [
  {
    id: 1,
    name: "Europe/London (UTC +01:00)",
    value: "Europe/London",
  },
  {
    id: 2,
    name: "Europe/Paris (UTC +02:00)",
    value: "Europe/Paris",
  },
  {
    id: 3,
    name: "Europe/Moscow (UTC +03:00)",
    value: "Europe/Moscow",
  },
  {
    id: 4,
    name: "Asia/Dubai (UTC +04:00)",
    value: "Asia/Dubai",
  },
  {
    id: 5,
    name: "Asia/Kolkata (UTC +05:30)",
    value: "Asia/Kolkata",
  },
  {
    id: 6,
    name: "Asia/Bangkok (UTC +07:00)",
    value: "Asia/Bangkok",
  },
  {
    id: 7,
    name: "Asia/Shanghai (UTC +08:00)",
    value: "Asia/Shanghai",
  },
  {
    id: 8,
    name: "Asia/Tokyo (UTC +09:00)",
    value: "Asia/Tokyo",
  },
  {
    id: 9,
    name: "Australia/Sydney (UTC +10:00)",
    value: "Australia/Sydney",
  },
  {
    id: 10,
    name: "Pacific/Auckland (UTC +12:00)",
    value: "Pacific/Auckland",
  },
  {
    id: 11,
    name: "America/New_York (UTC -04:00)",
    value: "America/New_York",
  },
  {
    id: 12,
    name: "America/Chicago (UTC -05:00)",
    value: "America/Chicago",
  },
  {
    id: 13,
    name: "America/Denver (UTC -06:00)",
    value: "America/Denver",
  },
  {
    id: 14,
    name: "America/Los_Angeles (UTC -07:00)",
    value: "America/Los_Angeles",
  },
  {
    id: 15,
    name: "America/Anchorage (UTC -08:00)",
    value: "America/Anchorage",
  },
  {
    id: 16,
    name: "Pacific/Honolulu (UTC -10:00)",
    value: "Pacific/Honolulu",
  },
];

export const timeOptions = [
  { id: 1, name: "12:00 AM", value: "00:00" },
  { id: 2, name: "1:00 AM", value: "01:00" },
  { id: 3, name: "2:00 AM", value: "02:00" },
  { id: 4, name: "3:00 AM", value: "03:00" },
  { id: 5, name: "4:00 AM", value: "04:00" },
  { id: 6, name: "5:00 AM", value: "05:00" },
  { id: 7, name: "6:00 AM", value: "06:00" },
  { id: 8, name: "7:00 AM", value: "07:00" },
  { id: 9, name: "8:00 AM", value: "08:00" },
  { id: 10, name: "9:00 AM", value: "09:00" },
  { id: 11, name: "10:00 AM", value: "10:00" },
  { id: 12, name: "11:00 AM", value: "11:00" },
  { id: 13, name: "12:00 PM", value: "12:00" },
  { id: 14, name: "1:00 PM", value: "13:00" },
  { id: 15, name: "2:00 PM", value: "14:00" },
  { id: 16, name: "3:00 PM", value: "15:00" },
  { id: 17, name: "4:00 PM", value: "16:00" },
  { id: 18, name: "5:00 PM", value: "17:00" },
  { id: 19, name: "6:00 PM", value: "18:00" },
  { id: 20, name: "7:00 PM", value: "19:00" },
  { id: 21, name: "8:00 PM", value: "20:00" },
  { id: 22, name: "9:00 PM", value: "21:00" },
  { id: 23, name: "10:00 PM", value: "22:00" },
  { id: 24, name: "11:00 PM", value: "23:00" },
];

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export const daysOfWeek: { key: DayOfWeek; label: string }[] = [
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" },
];

export type Conversation = {
  id: number;
  workspaceId: number;
  name: string;
  messages: {
    from: "Guest" | "Host" | "AI";
    message: string;
    date: string;
  }[];
  guestImage?: string;
  guestName?: string;
  messageStatus: "Todo" | "Done";
  channel: "Slack" | "WhatsApp";
  reservationLabelIds?: number[];
  conversationTagIds?: number[];
  replyStatus: "Needs Reply" | "Response Available" | "Done";
  unread: boolean;
  tripListingId: number;
  tripStatus: "Current" | "Inquiry" | "Past" | "Cancelled";
  tripStartDate: string;
  tripEndDate: string;
  assignedTo?: number;
};

export const fakeConversationData: Conversation[] = [
  {
    id: 1,
    workspaceId: 1,
    name: "Check-in instructions",
    messages: [
      {
        from: "Guest",
        message: "What time is check-in?",
        date: "2024-01-01",
      },
      {
        from: "Host",
        message:
          "Check-in is at 3pm Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.",
        date: "2024-01-01",
      },
    ],
    guestImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    guestName: "John Doe",
    messageStatus: "Todo",
    channel: "Slack",
    reservationLabelIds: [1],
    conversationTagIds: [3],
    replyStatus: "Response Available",
    unread: true,
    tripListingId: 1,
    tripStatus: "Cancelled",
    tripStartDate: "2024-06-22",
    tripEndDate: "2024-01-08",
    assignedTo: 1,
  },
  {
    id: 2,
    workspaceId: 1,
    name: "Check-out instructions",
    messages: [
      {
        from: "Guest",
        message: "What time is check-out?",
        date: "2024-01-08",
      },
      {
        from: "Host",
        message:
          "Check-out is at 11am Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.",
        date: "2024-01-08",
      },
    ],
    guestImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    guestName: "Jane Doe",
    messageStatus: "Todo",
    channel: "Slack",
    reservationLabelIds: [2, 1],
    conversationTagIds: [1],
    replyStatus: "Needs Reply",
    unread: true,
    tripListingId: 2,
    tripStatus: "Current",
    tripStartDate: "2024-06-20",
    tripEndDate: "2024-01-08",
    assignedTo: 2,
  },
  {
    id: 3,
    workspaceId: 1,
    name: "Wifi password",
    messages: [
      {
        from: "Guest",
        message: "What's the wifi password?",
        date: "2024-01-01",
      },
      {
        from: "Host",
        message:
          "The wifi password is 123456 Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.",
        date: "2024-01-01",
      },
    ],
    guestImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    guestName: "Jack Doe",
    messageStatus: "Todo",
    channel: "WhatsApp",
    reservationLabelIds: [3],
    conversationTagIds: [2],
    replyStatus: "Needs Reply",
    unread: false,
    tripListingId: 3,
    tripStatus: "Inquiry",
    tripStartDate: "2024-06-25",
    tripEndDate: "2024-01-08",
    assignedTo: 3,
  },
  {
    id: 3,
    workspaceId: 1,
    name: "Wifi password",
    messages: [
      {
        from: "Guest",
        message: "What's the wifi password?",
        date: "2024-01-01",
      },
      {
        from: "Host",
        message:
          "The wifi password is 123456 Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.",
        date: "2024-01-01",
      },
    ],
    guestImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    guestName: "Jack Doe",
    messageStatus: "Todo",
    channel: "WhatsApp",
    reservationLabelIds: [3],
    conversationTagIds: [2],
    replyStatus: "Done",
    unread: false,
    tripListingId: 3,
    tripStatus: "Past",
    tripStartDate: "2024-06-21",
    tripEndDate: "2024-01-08",
    assignedTo: 3,
  },
];

export type ConversationWithAllData = Conversation & {
  tripListing: Listing;
  reservationLabels?: (ReservationLabel | undefined)[];
  conversationTags?: (ConversationTag | undefined)[];
  listingGroupData?: ListingGroup;
  assigneeData?: Member;
};

export const fakeListingGroupsData: ListingGroup[] = [
  {
    id: 1,
    workspaceId: 1,
    name: "Joshua Tree",
    color: "bg-amber-500",
  },
  {
    id: 2,
    workspaceId: 1,
    name: "Group 2",
    color: "bg-lime-500",
  },
  {
    id: 3,
    workspaceId: 1,
    name: "Group 3",
    color: "bg-amber-500",
  },
];

export const apiConversationData: ConversationWithAllData[] =
  fakeConversationData.map((conversation) => {
    const tripListing = fakeListingsData.find(
      (listing) => listing.id === conversation.tripListingId
    ) as Listing;

    const reservationLabels = conversation.reservationLabelIds?.map((labelId) =>
      fakeReservationLabels.find((label) => label.id === labelId)
    );

    const conversationTags = conversation.conversationTagIds?.map((tagId) =>
      fakeConversationTags.find((tag) => tag.id === tagId)
    );

    const listingGroupData = fakeListingGroupsData.find(
      (group) => group.id === tripListing.group
    );

    const assigneeData = fakeMembersData.find(
      (member) => member.id === conversation.assignedTo
    );

    return {
      ...conversation,
      tripListing,
      reservationLabels,
      conversationTags,
      listingGroupData,
      assigneeData,
    };
  });

export type optionWithData = {
  id: number;
  name: string;
  image?: string;
  icon?: React.JSXElementConstructor<React.SVGProps<SVGSVGElement>>;
};

export type FilterValue = string | number | optionWithData;

export type AllFilters = {
  reservationLabels?: {
    column: "messages";
    title: "Reservation labels";
    icon: React.JSXElementConstructor<React.SVGProps<SVGSVGElement>>;
    options: FilterValue[];
  };
  conversationTags?: {
    column: "messages";
    title: "Conversation tags";
    icon: React.JSXElementConstructor<React.SVGProps<SVGSVGElement>>;
    options: FilterValue[];
  };
  // listingGroups: ListingGroup[];
  responseStatus?: {
    column: "messages";
    title: "Response status";
    icon: React.JSXElementConstructor<React.SVGProps<SVGSVGElement>>;
    options: FilterValue[];
  };
  tripStatus?: {
    column: "user";
    title: "Trip status";
    icon: React.JSXElementConstructor<React.SVGProps<SVGSVGElement>>;
    options: FilterValue[];
  };

  checkInDate?: {
    column: "user";
    title: "Check-in date";
    icon: React.JSXElementConstructor<React.SVGProps<SVGSVGElement>>;
    options: FilterValue[];
  };
  assignee?: {
    column: "assigneeGroup";
    title: "Assignee";
    icon: React.JSXElementConstructor<React.SVGProps<SVGSVGElement>>;
    options: FilterValue[];
  };
};

export const allFilters: AllFilters = {
  reservationLabels: {
    column: "messages",
    title: "Reservation labels",
    icon: AnchorIcon,
    options: fakeReservationLabels.map((label) => label.name),
  },
  conversationTags: {
    column: "messages",
    title: "Conversation tags",
    icon: HeartsIcon,
    options: fakeConversationTags.map((tag) => tag.name),
  },
  responseStatus: {
    column: "messages",
    title: "Response status",
    icon: Dice1Icon,
    options: ["Needs Reply", "Response Available", "Done"],
  },
  tripStatus: {
    column: "user",
    title: "Trip status",
    icon: HourGlassIcon,
    options: ["Current", "Inquiry", "Past", "Cancelled"],
  },
  checkInDate: {
    column: "user",
    title: "Check-in date",
    icon: GlobeIcon,
    options: [
      "Current Guest",
      "Checking in today",
      "Checking in tomorrow",
      "Checking in this week",
    ],
  },
  assignee: {
    column: "assigneeGroup",
    title: "Assignee",
    icon: ShieldIcon,
    options: fakeMembersData.map((member) => ({
      name: member.name!,
      image: member.image!,
      id: member.id!,
    })),
  },
};

export type appliedFilters = {
  tripStatus?: ("Current" | "Inquiry" | "Past" | "Cancelled")[];
  checkInDate?: (
    | "Current Guest"
    | "Checking in today"
    | "Checking in tomorrow"
    | "Checking in this week"
  )[];
  reservationLabels?: string[];
  conversationTags?: string[];
  responseStatus?: ("Needs Reply" | "Response Available" | "Done")[];
  assignee?: {
    name: string;
    image: string;
    id: number;
  }[];
};
