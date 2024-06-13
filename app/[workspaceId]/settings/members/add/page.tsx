"use server";

import { getWorkspace } from "@/app/actions";
import AddMemberContent from "./content";

export default async function AddMemberPage({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) {
  const workspace = await getWorkspace(workspaceId);

  if (!workspace || !workspace.success || !workspace.data) {
    return null;
  }

  return <AddMemberContent workspaceId={workspace.data.id} />;
}
