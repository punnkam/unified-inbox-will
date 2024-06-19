import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Link from "next/link";
import { ListingWithDeleteHandler } from "@/lib/types";
import { fetchListings } from "@/app/actions";
import { ArrowNarrowLeft } from "@/components/icons/CustomIcons";

async function getData(
  workspaceId: string
): Promise<ListingWithDeleteHandler[]> {
  // Get the current workspace member data
  const data = await fetchListings(workspaceId);

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
      <div className="flex flex-col gap-4">
        <Link href="../general">
          <Button
            variant="link"
            className="text-tertiary flex items-center gap-2 p-2"
          >
            <ArrowNarrowLeft />
            General
          </Button>
        </Link>
        <h1 className="text-title-2xl">Listings</h1>
      </div>

      <div className="border-b border-primary"></div>
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-subtitle-sm">
            Add and remove listings from HostAI
          </p>
          <p className="text-tertiary text-body-xs font-normal">
            Only active listings will be charged
          </p>
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
