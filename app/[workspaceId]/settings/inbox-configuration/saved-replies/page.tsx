import { fetchSavedReplies } from "@/app/actions";
import SavedRepliesContent from "./content";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default async function SavedRepliesPage({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) {
  const savedReplies = await fetchSavedReplies(workspaceId);

  if (!savedReplies.success || !savedReplies.data) {
    return null;
  }

  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-3">
          <h1 className="text-title-2xl">Saved Replies</h1>
          <p className="text-subtitle-sm text-tertiary">
            Respond to guests faster and more consistently
          </p>
        </div>
        <Link href="./saved-replies/add">
          <Button size={"sm"}>
            <PlusIcon className="h-5 w-5 mr-2" />
            New saved reply
          </Button>
        </Link>
      </div>

      <div className="border-b border-primary"></div>
      <SavedRepliesContent savedReplies={savedReplies.data} />
    </div>
  );
}
