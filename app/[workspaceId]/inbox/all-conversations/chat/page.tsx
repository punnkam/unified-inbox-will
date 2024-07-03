import { InboxOperationsView } from "../../content/operations/InboxOperationsView";
import { fetchConversation } from "@/app/actions";

export default async function AllConversationsPage({
  params: { workspaceId },
  searchParams: { c },
}: {
  params: { workspaceId: string };
  searchParams: { c: string };
}) {
  console.log("workspaceId", workspaceId);
  console.log("conersationId", c);

  const data = await fetchConversation(c);

  if (!data || !data.success || !data.data) {
    return null;
  }

  return <InboxOperationsView conversationData={data.data} />;
}