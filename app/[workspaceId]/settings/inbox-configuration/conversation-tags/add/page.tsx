"use server";

import { getWorkspace } from "@/app/actions";
import SavedReplyContent from "./content";

export default async function EditSavedReplyPage({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) {
  const workspace = await getWorkspace(workspaceId);

  if (!workspace || !workspace.success || !workspace.data) {
    return null;
  }

  return <SavedReplyContent workspaceId={workspace.data?.id} />;
}
