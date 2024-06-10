"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  fakeMembersData,
  Member,
  fakeIconsData,
  MemberWithDeleteHandler,
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

export default function EditTeamPage({
  params: { teamId },
}: {
  params: { teamId: string };
}) {
  const [data, setData] = useState({
    name: "",
    iconId: 0,
    members: [] as number[], // array of member ids
  });
  const [tableMembers, setTableMembers] = useState(
    [] as MemberWithDeleteHandler[]
  );

  const [avaliableMembers, setAvaliableMembers] = useState([] as Member[]);
  const [loading, setLoading] = useState({
    save: false,
    delete: false,
  });

  // used at handleSave
  const router = useRouter();

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
    setAvaliableMembers((prev) => [...prev, member]);
  };

  const handleAddMember = (member: Member) => {
    // Update the state data
    setData((prev) => ({
      ...prev,
      members: [...prev.members, member.id],
    }));

    // add to the table state (with the delete handler)
    setTableMembers((prev) => [
      ...prev,
      {
        ...member,
        onDelete: () => handleDeleteMember(member),
      },
    ]);

    // Update the avaliable members
    setAvaliableMembers((prev) => prev.filter((m) => m.id !== member.id));
  };

  const handleSave = () => {
    // console.log(data);

    setLoading({ ...loading, save: true });

    // Call your API here
    setTimeout(() => {
      // no id exists yet bc the team is new
      // in production, you would add the team to the database and return the id, then push the user to the edit page

      toast.success("Added team: " + JSON.stringify(data));

      // push the user to the edit page (hardcoded as 1, since we have no id yet and dont have a db)
      // router.push("/settings/teams/1/edit");

      setLoading({ ...loading, save: false });
    }, 1000);
  };

  useEffect(() => {
    // Fetch the team data
    console.log("Fetching team data for team", teamId);

    // Call your API here
    const data = fetchData();

    setAvaliableMembers(data.avaliableMembers);
  }, []);

  function fetchData() {
    // get all active members not in the team
    const avaliableMembers = fakeMembersData.filter(
      (member) => member.status === "Active"
    );

    return {
      avaliableMembers: avaliableMembers,
    };
  }

  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex flex-col gap-4">
        <Link href="/settings/teams">
          <Button
            variant="link"
            className="text-tertiary flex items-center gap-2 p-2"
          >
            <ArrowNarrowLeft />
            All Teams
          </Button>
        </Link>
        <h1 className="text-title-2xl">Add team</h1>
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
              <Button variant="outline" className="w-10 h-10 px-0">
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
            placeholder="Team Name"
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
          avaliableMembers={avaliableMembers}
          onAddMemberToTeam={handleAddMember}
        />
      </div>

      <div className="w-full flex justify-end items-center py-5">
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
