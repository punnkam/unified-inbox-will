import { ConversationTag } from "@/lib/types";
import { ConversationTagComponent } from "./conversationTag";

export default function ConversationTagsContent({
  conversationTags,
}: {
  conversationTags: ConversationTag[];
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {conversationTags.map((reply) => (
        <ConversationTagComponent key={reply.id} conversationTag={reply} />
      ))}
    </div>
  );
}
