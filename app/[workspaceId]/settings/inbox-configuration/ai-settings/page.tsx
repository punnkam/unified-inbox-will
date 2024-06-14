import { fetchInboxGeneralSettings } from "@/app/actions";
import GeneralContent from "./content";

export default async function GeneralPage({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) {
  const inboxGeneralSettings = await fetchInboxGeneralSettings(workspaceId);

  if (!inboxGeneralSettings.success || !inboxGeneralSettings.data) {
    return null;
  }

  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex flex-col gap-3">
        <h1 className="text-title-2xl">AI settings</h1>
        <p className="text-subtitle-sm text-tertiary">
          Supercharge your operation with AI
        </p>
      </div>

      <div className="border-b border-primary"></div>
      <GeneralContent
        aiSettings={inboxGeneralSettings.data.aiSettings}
        workspaceId={workspaceId}
      />
    </div>
  );
}
