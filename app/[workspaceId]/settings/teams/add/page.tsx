import AddTeamContent from "./content";
import { fetchAvailableMembers, getWorkspace } from "@/app/actions";

export default async function EditTeamPage({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) {
  const workspace = await getWorkspace(workspaceId);

  if (!workspace || !workspace.success || !workspace.data) {
    return null;
  }

  const availableMembers = await fetchAvailableMembers(workspace.data.id);

  return (
    <AddTeamContent
      workspace={workspace.data}
      availableMembersData={availableMembers}
    />
  );
}
