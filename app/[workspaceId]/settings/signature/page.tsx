import SignatureContent from "./content";
import { fetchSignature, getWorkspace } from "@/app/actions";

export default async function SignaturePage({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) {
  const workspace = await getWorkspace(workspaceId);

  if (!workspace || !workspace.success || !workspace.data) {
    return null;
  }

  const signature = await fetchSignature(workspace.data.id);

  if (!signature || !signature.success || !signature.data) {
    return null;
  }

  return (
    <SignatureContent
      signature={signature.data}
      workspaceId={workspace.data.id}
    />
  );
}
