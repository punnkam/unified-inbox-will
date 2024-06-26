import { DataTable } from "../content/data-table";
import { columns } from "../content/columns";

import {
  fetchAllConversations,
  fetchAvailableMembers,
  fetchConversationTags,
} from "@/app/actions";
import { ConversationTag } from "@/lib/types";

export default async function AllConversationsPage({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) {
  const data = await fetchAllConversations(workspaceId);

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
    <DataTable
      title="All Conversations"
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
