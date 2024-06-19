"use server";

import { getWorkspace } from "@/app/actions";
import AddConversationTagContent from "./content";

export default async function EditSavedReplyPage({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) {
  const workspace = await getWorkspace(workspaceId);

  if (!workspace || !workspace.success || !workspace.data) {
    return null;
  }

  return <AddConversationTagContent workspaceId={workspace.data?.id} />;
}
