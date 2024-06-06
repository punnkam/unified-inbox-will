import TreesIcon from "@/components/icons/TreesIcon";
import MountainIcon from "@/components/icons/MountainIcon";

export type Member = {
  id: number;
  name: string;
  role: "Admin" | "Member" | "External Team";
  email: string;
  image: string;
  status: "Active" | "Pending";
  teamId?: number; // set the team id in code for deleting member from team
};

export type Team = {
  id: number;
  name: string;
  iconId?: number;
  members: Member[];
};

export const fakeMembersData: Member[] = [
  {
    id: 1,
    name: "James Doe",
    role: "Admin",
    email: "m@example.com",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Jack Doe",
    role: "Member",
    email: "jack@gmail.com",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "John Doe",
    role: "External Team",
    email: "john@gmail.com",
    status: "Active",
    image:
      "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
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
    iconId: 1,
    members: fakeMembersData,
  },
  {
    id: 2,
    name: "Team 2",
    iconId: 2,
    members: fakeMembersData,
  },
  {
    id: 3,
    name: "Team 3",
    iconId: 1,
    members: fakeMembersData,
  },
  {
    id: 4,
    name: "Team 4",
    iconId: 2,
    members: fakeMembersData,
  },
];

export const fakeIconsData = [
  {
    id: 1,
    name: "Trees",
    icon: <TreesIcon />,
  },
  {
    id: 2,
    name: "Mountain",
    icon: <MountainIcon />,
  },
];
