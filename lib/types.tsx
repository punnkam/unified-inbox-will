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
  role: "Admin" | "Member" | "External Team";
  email: string;
  image: string;
  status: "Active" | "Pending";
  teamIds?: number[];
};

export type Team = {
  id: number;
  name: string;
  iconId: number;
  members: Member[];
};

export type MemberWithTeamId = Member & { teamId: number };

export type MemberWithDeleteHandler = Member & {
  onDelete: (member: Member) => void;
};

export type TeamWithMemberWithTeamId = Omit<Team, "members"> & {
  members: MemberWithTeamId[];
};

export const fakeMembersData: Member[] = [
  {
    id: 1,
    teamIds: [1, 3],
    name: "James Doe",
    role: "Admin",
    email: "m@example.com",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    teamIds: [2, 4],
    name: "Jack Doe",
    role: "Member",
    email: "jack@gmail.com",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    teamIds: [1, 2, 3],
    name: "John Doe",
    role: "External Team",
    email: "john@gmail.com",
    status: "Active",
    image:
      "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    teamIds: [1, 3, 4],
    name: "Jose Doe",
    role: "Member",
    email: "jose@gmail.com",
    status: "Pending",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const fakeTeamsData: Team[] = [
  {
    id: 1,
    name: "Team 1",
    iconId: 0,
    members: fakeMembersData.filter(
      (member) => member.teamIds?.includes(1) && member.status === "Active"
    ),
  },
  {
    id: 2,
    name: "Team 2",
    iconId: 2,
    members: fakeMembersData.filter(
      (member) => member.teamIds?.includes(2) && member.status === "Active"
    ),
  },
  {
    id: 3,
    name: "Team 3",
    iconId: 1,
    members: fakeMembersData.filter(
      (member) => member.teamIds?.includes(3) && member.status === "Active"
    ),
  },
  {
    id: 4,
    name: "Team 4",
    iconId: 19,
    members: fakeMembersData.filter(
      (member) => member.teamIds?.includes(4) && member.status === "Active"
    ),
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
