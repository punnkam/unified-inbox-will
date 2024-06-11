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
  id: number;
  name: string;
  email: string;
  image: string;
  workspaces?: {
    id: number;
    status: "Active" | "Pending";
    role: "Admin" | "Member" | "External Team";
  }[];
  teamIds?: number[];
};

export type Team = {
  id: number;
  workspaceId?: number;
  name: string;
  iconId: number;
  members: Member[];
};

export type Workspace = {
  id: number;
  slug: string;
};

export type Listing = {
  id: number;
  workspaceId: number;
  active: boolean;
  title: string;
  address: string;
  image: string;
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
  },
];

export let fakeListingsData: Listing[] = [
  {
    id: 1,
    workspaceId: 1,
    active: true,
    title: "Cozy 2 Bedroom Apartment",
    address: "1234 Elm Street",
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    workspaceId: 1,
    active: true,
    title: "Modern 1 Bedroom Apartment",
    address: "5678 Oak Street",
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    workspaceId: 1,
    active: false,
    title: "Spacious 3 Bedroom House",
    address: "91011 Pine Street",
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const fakeIconsData = [
  {
    id: 0,
    name: "Snowflake",
    icon: <SnowflakeIcon />,
  },
  {
    id: 1,
    name: "Car",
    icon: <CarIcon />,
  },
  {
    id: 2,
    name: "Moon",
    icon: <MoonStarIcon />,
  },
  {
    id: 3,
    name: "Anchor",
    icon: <AnchorIcon />,
  },
  {
    id: 4,
    name: "Umbrella",
    icon: <UmbrellaIcon />,
  },
  {
    id: 5,
    name: "Globe",
    icon: <GlobeIcon />,
  },
  {
    id: 6,
    name: "FaceId",
    icon: <FaceIdIcon />,
  },
  {
    id: 7,
    name: "Wind",
    icon: <WindIcon />,
  },
  {
    id: 8,
    name: "DiceOne",
    icon: <Dice1Icon />,
  },
  {
    id: 9,
    name: "Hourglass",
    icon: <HourGlassIcon />,
  },
  {
    id: 10,
    name: "Mountain",
    icon: <MountainIcon />,
  },
  {
    id: 11,
    name: "Send",
    icon: <SendIcon />,
  },
  {
    id: 12,
    name: "Stars",
    icon: <StarsIcon />,
  },
  {
    id: 13,
    name: "Menu",
    icon: <Menu5Icon />,
  },
  {
    id: 14,
    name: "Hearts",
    icon: <HeartsIcon />,
  },
  {
    id: 15,
    name: "ZapSquare",
    icon: <ZapSquareIcon />,
  },
  {
    id: 16,
    name: "Star3",
    icon: <Star3Icon />,
  },
  {
    id: 17,
    name: "Trees",
    icon: <TreesIcon />,
  },
  {
    id: 18,
    name: "Stop",
    icon: <StopIcon />,
  },
  {
    id: 19,
    name: "Shield",
    icon: <ShieldIcon />,
  },
];
