import { fetchMember, getWorkspace } from "@/app/actions";
import EditMemberContent from "./content";

export default async function AddMemberPage({
  params: { workspaceId, memberId },
}: {
  params: { workspaceId: string; memberId: string };
}) {
  const workspace = await getWorkspace(workspaceId);

  if (!workspace || !workspace.success || !workspace.data) {
    return null;
  }

  const member = await fetchMember(parseInt(memberId));

  if (!member || !member.success || !member.data) {
    return null;
  }

  return (
    <EditMemberContent workspaceId={workspace.data.id} member={member.data} />
  );
}
