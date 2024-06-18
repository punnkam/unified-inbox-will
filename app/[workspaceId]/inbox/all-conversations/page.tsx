import { DataTable } from "./data-table";
import { columns } from "./columns";

import { fetchAllConversations } from "@/app/actions";

export default async function AllConversationsPage({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) {
  const data = await fetchAllConversations(workspaceId);

  if (!data || !data.success || !data.data) {
    return null;
  }

  return <DataTable columns={columns} data={data.data} />;
}
