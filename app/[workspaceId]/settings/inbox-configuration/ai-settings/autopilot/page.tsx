import { fetchAiSettings } from "@/app/actions";
import { ArrowNarrowLeft } from "@/components/icons/CustomIcons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AutopilotContent from "./content";

export default async function AutopilotPage({
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
        <Link href="../ai-settings">
          <Button
            variant="link"
            className="text-tertiary flex items-center gap-2 p-2"
          >
            <ArrowNarrowLeft />
            AI settings
          </Button>
        </Link>
        <h1 className="text-title-2xl">Autopilot</h1>
      </div>

      <div className="border-b border-primary"></div>

      <AutopilotContent
        aiSettings={aiSettings.data}
        workspaceId={workspaceId}
      />
    </div>
  );
}
