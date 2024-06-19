import { fetchGeneralSettings } from "@/app/actions";
import GeneralContent from "./content";

export default async function PersonalNotificationsPage({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) {
  const response = await fetchGeneralSettings(workspaceId);

  if (!response.success || !response.data) {
    return null;
  }

  return (
    <GeneralContent
      workspaceId={workspaceId}
      generalSettings={response.data.generalSettings}
    />
  );
}
