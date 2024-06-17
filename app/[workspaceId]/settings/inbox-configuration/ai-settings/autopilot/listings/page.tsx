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

export default async function AiListingsPage({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) {
  const data = await getData(workspaceId);

  const groups: number[] = [];

  // get all unique groups
  data.map((listing) => {
    if (listing.group && !groups.includes(listing.group!)) {
      groups.push(listing.group!);
    }
  });

  // sort so lowest group is first
  groups.sort((a, b) => a - b);

  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex flex-col gap-4">
        <Link href="./">
          <Button
            variant="link"
            className="text-tertiary flex items-center gap-2 p-2"
          >
            <ArrowNarrowLeft />
            Autopilot
          </Button>
        </Link>
        <h1 className="text-title-2xl">Listings on autopilot</h1>
      </div>

      <div className="border-b border-primary"></div>

      <DataTable columns={columns} data={data} groups={groups} />
    </div>
  );
}
