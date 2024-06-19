import { fetchAiSettings } from "@/app/actions";
import { ArrowNarrowLeft } from "@/components/icons/CustomIcons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ScheduleContent from "./content";

export default async function SchedulePage({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) {
  const aiSettings = await fetchAiSettings(workspaceId);

  if (!aiSettings.success || !aiSettings.data) {
    return null;
  }

  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex flex-col gap-4">
        <Link href="../autopilot">
          <Button
            variant="link"
            className="text-tertiary flex items-center gap-2 p-2"
          >
            <ArrowNarrowLeft />
            Autopilot
          </Button>
        </Link>
        <h1 className="text-title-2xl">Autopilot schedule </h1>
      </div>

      <div className="border-b border-primary"></div>

      <ScheduleContent aiSettings={aiSettings.data} workspaceId={workspaceId} />
    </div>
  );
}
