import { columns } from "../content/inbox-landing/columns";
import {
  fetchAvailableMembers,
  fetchConversationTags,
  fetchReservationLabel,
  fetchReservationLabelConversations,
} from "@/app/actions";
import { ConversationTag } from "@/lib/types";
import { redirect } from "next/navigation";
import { InboxLandingView } from "../content/inbox-landing/InboxLandingView";

export default async function AllConversationsPage({
  params: { workspaceId },
  searchParams: { label },
}: {
  params: { workspaceId: string };
  searchParams: { label: string };
}) {
  const reservationLabelData = await fetchReservationLabel(label);

  if (
    !reservationLabelData ||
    !reservationLabelData.success ||
    !reservationLabelData.data
  ) {
    // redirect to all conversations if the reservation label is not found
    redirect("../all-conversations");
  }

  // fetch the conversations with the current reservation label
  const data = await fetchReservationLabelConversations(workspaceId, label);

  if (!data || !data.success || !data.data) {
    return null;
  }

  let conversationLabels = await fetchConversationTags(workspaceId);

  if (
    !conversationLabels ||
    !conversationLabels.success ||
    !conversationLabels.data
  ) {
    return null;
  }

  // Filter out conversation tags that are not inboxDashboard
  conversationLabels.data = conversationLabels.data.filter(
    (label) => label.inboxDashboard
  );

  // Map through conversation tags to add the number of uses
  conversationLabels.data = conversationLabels.data.map((label) => {
    const numberOfUses = data.data?.reduce(
      (count, conversation) =>
        count +
        (conversation.tags?.map((tag) => tag?.id).includes(label.id) ? 1 : 0),
      0
    );
    return { ...label, numberOfUses: numberOfUses };
  });

  const availableMembers = await fetchAvailableMembers(workspaceId);

  return (
    <InboxLandingView
      title={reservationLabelData.data.name}
      columns={columns}
      data={data.data}
      conversationLabels={
        conversationLabels.data as (ConversationTag & {
          numberOfUses: number;
        })[]
      }
      availableMembers={availableMembers}
    />
  );
}
