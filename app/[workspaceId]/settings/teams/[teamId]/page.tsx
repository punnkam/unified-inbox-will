"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  fakeTeamsData,
  fakeMembersData,
  Member,
  fakeIconsData,
  MemberWithDeleteHandler,
  fakeWorkspaceData,
} from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowNarrowLeft } from "@/components/icons/CustomIcons";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function EditTeamPage({
  params: { workspaceId, teamId },
}: {
  params: { workspaceId: string; teamId: string };
}) {
  const [data, setData] = useState({
    id: parseInt(teamId),
    name: "",
    iconId: 0,
    members: [] as number[],
  });
  const [tableMembers, setTableMembers] = useState(
    [] as MemberWithDeleteHandler[]
  );
  const [availableMembers, setAvailableMembers] = useState([] as Member[]);
  const [loading, setLoading] = useState({
    save: false,
    delete: false,
  });
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  // Get the current workspace data
  const currentWorkspace = fakeWorkspaceData.find(
    (workspace) => workspace.slug === workspaceId
  );

  if (!currentWorkspace) {
    return null;
  }

  const handleChange = (key: keyof typeof data, value: any) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDeleteMember = (member: Member) => {
    // Update the data
    setData((prev) => ({
      ...prev,
      members: prev.members.filter((m) => m !== member.id),
    }));

    // remove from the table state (with the delete handler)
    setTableMembers((prev) => prev.filter((m) => m.id !== member.id));

    // Update the avaliable members
    setAvailableMembers((prev) => [...prev, member]);

    return { success: true, member: member };
  };

  const handleAddMember = (member: Member) => {
    const workspace = member.workspaces?.find(
      (workspace) => workspace.id === currentWorkspace.id
    );

    const memberWithDeleteHandler: MemberWithDeleteHandler = {
      ...member,
      ...(workspace && {
        currentWorkspace: {
          id: workspace.id,
          status: workspace.status,
          role: workspace.role,
        },
      }),
      onDelete: () => handleDeleteMember(member),
    };

    // Update the state data
    setData((prev) => ({
      ...prev,
      members: [...prev.members, member.id],
    }));

    // add to the table state (with the delete handler)
    setTableMembers((prev) => [...prev, memberWithDeleteHandler]);

    // Update the available members
    setAvailableMembers((prev) => prev.filter((m) => m.id !== member.id));
  };

  const handleSave = () => {
    // console.log(data);

    setLoading({ ...loading, save: true });

    // Call your API here
    setTimeout(() => {
      toast.success("Saved team: " + JSON.stringify(data));

      // refresh the page to get the updated data
      router.refresh();

      setLoading({ ...loading, save: false });
    }, 1000);
  };

  useEffect(() => {
    // Fetch the team data
    console.log("Fetching team data for team", teamId);

    // Call your API here
    const team = fetchTeam(teamId);

    if (!team) {
      toast.error("Team not found");
      return;
    }

    setAvailableMembers(team.availableMembers);

    setData({
      id: parseInt(teamId),
      name: team.name,
      iconId: team.iconId,
      members: team.members.map((member) => member.id),
    });

    // add to the table state (with the delete handler)
    setTableMembers(
      team.members.map((member) => ({
        ...member,
        onDelete: () => handleDeleteMember(member),
      }))
    );
  }, []);

  function fetchTeam(teamId: string) {
    const team = fakeTeamsData.find((team) => team.id === parseInt(teamId));

    if (!team) {
      return null;
    }

    // add the teamId to the members (for the delete functionality)
    const teamMembersWithId = team?.members.map((member) => {
      const workspace = member.workspaces?.find(
        (workspace) => workspace.id === currentWorkspace?.id
      );

      return {
        ...member,
        teamId: parseInt(teamId),
        ...(workspace && {
          currentWorkspace: {
            id: workspace.id,
            status: workspace.status,
            role: workspace.role,
          },
        }),
      };
    });

    // get all active members not in the team
    const availableMembers = fakeMembersData.filter(
      (member) =>
        // Check member is not in the specified team
        !member.teamIds?.includes(parseInt(teamId)) &&
        // Check member is in the current workspace and active
        member.workspaces?.some(
          (workspace) =>
            currentWorkspace?.id === workspace.id &&
            workspace.status === "Active"
        )
    );

    return {
      name: team.name,
      iconId: team.iconId || 0,
      members: teamMembersWithId,
      availableMembers: availableMembers,
    };
  }

  const handleDeleteTeam = () => {
    setLoading({ ...loading, delete: true });

    // Call your API here
    setTimeout(() => {
      toast.success("Team deleted id: " + teamId);

      // redirect to the teams page

      setLoading({ ...loading, delete: false });

      router.push("/settings/teams");
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex flex-col gap-4">
        <Link href="../teams">
          <Button
            variant="link"
            className="text-tertiary flex items-center gap-2 p-2"
          >
            <ArrowNarrowLeft />
            All Teams
          </Button>
        </Link>
        <h1 className="text-title-2xl">Edit team</h1>
      </div>

      <div className="border-b border-primary"></div>

      <div className="flex flex-col gap-3">
        <div>
          <label htmlFor="team-name" className="text-subtitle-sm text-primary">
            Team
          </label>
          <p className="text-tertiary text-body-xs font-normal">
            Name the team and choose icon
          </p>
        </div>
        <div className="flex gap-2">
          {/* TODO this isnt opening, but If i have a button in the trigger then a hydration fails */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-10 h-10" size={"icon"}>
                {fakeIconsData.find((icon) => icon.id === data.iconId)?.icon ||
                  fakeIconsData[0].icon}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="grid grid-cols-5">
              {fakeIconsData.map((icon) => (
                <DropdownMenuItem key={icon.id} className="w-fit p-0">
                  <Button
                    variant="ghost"
                    className="h-10 w-10 px-0 text-icon-disabled hover:text-icon-tertiary"
                    size={"icon"}
                    onClick={() => {
                      handleChange("iconId", icon.id);
                    }}
                  >
                    {icon.icon}
                  </Button>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Input
            id="team-name"
            placeholder="jared@hostai.app"
            value={data.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <p className="text-subtitle-sm text-primary">Team Members</p>
          <p className="text-tertiary text-body-xs font-normal">
            Manage your team members
          </p>
        </div>

        <DataTable
          columns={columns}
          data={tableMembers}
          availableMembers={availableMembers}
          onAddMemberToTeam={handleAddMember}
        />
      </div>

      <div className="w-full flex justify-between items-center py-5">
        <AlertDialog open={isOpen}>
          <Button
            variant="destructive"
            onClick={() => setIsOpen(true)}
            disabled={loading.delete}
          >
            <span className="sr-only">Open delete team modal</span>
            {loading.delete ? "Deleting team..." : "Delete team"}
          </Button>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this team?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action is permanent and cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button
                variant={"secondary"}
                size={"sm"}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  handleDeleteTeam();
                  setIsOpen(false);
                }}
              >
                Delete team
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button
          size={"md"}
          onClick={handleSave}
          disabled={!data.name || loading.save}
        >
          {loading.save ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}
