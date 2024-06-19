import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { MemberWithRemoveWorkspaceHandler } from "@/lib/types";
import { fetchMembers } from "@/app/actions";

async function getData(
  workspaceId: string
): Promise<MemberWithRemoveWorkspaceHandler[]> {
  // Get the current workspace member data
  const data = await fetchMembers(workspaceId);

  if (!data) {
    return [];
  }

  return data;
}

export default async function MembersPage({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) {
  const data = await getData(workspaceId);

  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-3">
          <h1 className="text-title-2xl">Members</h1>
          <p className="text-subtitle-sm text-tertiary">
            Add and manage your members
          </p>
        </div>
        <Link href="./members/add">
          <Button variant="default">
            <PlusIcon className="h-5 w-5 mr-2" />
            Add
          </Button>
        </Link>
      </div>

      <div className="border-b border-primary"></div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
