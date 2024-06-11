import { ArrowNarrowLeft } from "@/components/icons/CustomIcons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import EditSlackContent from "./content";
import { fetchSlackConnections } from "@/app/actions";

export default async function EditSlackPage({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) {
  const slackConnections = await fetchSlackConnections(workspaceId);

  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex flex-col gap-4">
        <Link href="../integrations">
          <Button
            variant="link"
            className="text-tertiary flex items-center gap-2 p-2"
          >
            <ArrowNarrowLeft />
            All Integrations
          </Button>
        </Link>
        <h1 className="text-title-2xl">Slack</h1>
      </div>

      <div className="border-b border-primary"></div>

      <EditSlackContent connection={slackConnections[0]} />
    </div>
  );
}
