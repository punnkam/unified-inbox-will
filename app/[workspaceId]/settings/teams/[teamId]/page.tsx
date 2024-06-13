import EditTeamContent from "./content";
import { fetchTeam } from "@/app/actions";

export default async function EditTeamPage({
  params: { workspaceId, teamId },
}: {
  params: { workspaceId: string; teamId: string };
}) {
  const team = await fetchTeam(teamId);

  if (!team || !team.success || !team.data) {
    return null;
  }

  return (
    <EditTeamContent
      team={team.data.team}
      availableMembersData={team.data.availableMembers}
    />
  );
}
