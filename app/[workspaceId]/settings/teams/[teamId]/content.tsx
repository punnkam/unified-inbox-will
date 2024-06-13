"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import {
  Member,
  fakeIconsData,
  MemberWithDeleteHandler,
  TeamWithMemberDeleteHandler,
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
import { IconComponent } from "@/components/icons/IconComponent";
import { saveTeam, deleteTeam } from "@/app/actions";

export default function EditTeamContent({
  team,
  availableMembersData,
}: {
  team: TeamWithMemberDeleteHandler;
  availableMembersData: Member[];
}) {
  // set the initial data state
  const [data, setData] = useState({
    id: team.id,
    workspaceId: team.workspaceId,
    name: team.name,
    iconId: team.iconId,
    members: team.members.map((member) => member.id!),
  });

  // Add the current team members to the table state
  const [tableMembers, setTableMembers] = useState<MemberWithDeleteHandler[]>(
    team.members.map((member) => ({
      ...member,
      onDelete: () => handleDeleteMember(member),
    }))
  );

  // set the initial available members state
  const [availableMembers, setAvailableMembers] =
    useState(availableMembersData);

  const [loading, setLoading] = useState({
    save: false,
    delete: false,
  });

  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleChange = (key: keyof typeof data, value: any) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // client side changing table state
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

  // client side changing table state
  const handleAddMember = (member: Member) => {
    const workspace = member.workspaces?.find(
      (workspace) => workspace.id === team.workspaceId
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
      members: [...prev.members, member.id!],
    }));

    // add to the table state (with the delete handler)
    setTableMembers((prev) => [...prev, memberWithDeleteHandler]);

    // Update the available members
    setAvailableMembers((prev) => prev.filter((m) => m.id !== member.id));
  };

  // send the data to the server
  const handleSave = async () => {
    // console.log(data);

    setLoading({ ...loading, save: true });

    const response = await saveTeam(data);

    if (!response.success) {
      toast.error("Error saving team");
      setLoading({ ...loading, save: false });
      return;
    }

    setLoading({ ...loading, save: false });

    toast.success("Team saved successfully");
    router.refresh();
  };

  // send the data to the server
  const handleDeleteTeam = async () => {
    setLoading({ ...loading, delete: true });

    const response = await deleteTeam(data.id!);

    if (!response.success) {
      toast.error("Error deleting team");
      setLoading({ ...loading, delete: false });
      return;
    }

    setLoading({ ...loading, delete: false });

    toast.success("Team deleted successfully");
    router.push("../teams");
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-10 h-10" size={"icon"}>
                <IconComponent
                  icon={
                    fakeIconsData.find((icon) => icon.id === data.iconId)
                      ?.icon || fakeIconsData[0].icon
                  }
                />
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
                    <IconComponent icon={icon.icon} />
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
