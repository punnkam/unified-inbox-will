import { fetchConversationTags } from "@/app/actions";
import ConversationTagsContent from "./content";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function GeneralPage({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) {
  const conversationTags = await fetchConversationTags(workspaceId);

  if (!conversationTags.success || !conversationTags.data) {
    return null;
  }

  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-3">
          <h1 className="text-title-2xl">Conversation tags</h1>
          <p className="text-subtitle-sm text-tertiary">
            Tag guest messages to escalate to your team
          </p>
        </div>
        <Link href="./conversation-tags/add">
          <Button size={"sm"}>
            <PlusIcon className="h-5 w-5 mr-2" />
            New tag
          </Button>
        </Link>
      </div>

      <div className="border-b border-primary"></div>
      <ConversationTagsContent conversationTags={conversationTags.data} />
    </div>
  );
}
