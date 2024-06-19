import { fetchPersonalNotifications } from "@/app/actions";
import PersonalNotificationsContent from "./content";

export default async function PersonalNotificationsPage({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) {
  const memberId = 1;

  // workspaceId - MemberId
  const data = await fetchPersonalNotifications(workspaceId, memberId);

  if (!data || !data.success || !data.data) {
    return null;
  }

  return (
    <PersonalNotificationsContent
      memberId={memberId}
      memberNotificationSettings={data.data.personalNotifications}
    />
  );
}
