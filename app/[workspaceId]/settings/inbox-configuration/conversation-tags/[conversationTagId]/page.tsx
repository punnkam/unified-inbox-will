"use server";

import { fetchConversationTag } from "@/app/actions";
import EditConversationTagContent from "./content";

export default async function EditSavedReplyPage({
  params: { conversationTagId },
}: {
  params: { conversationTagId: string };
}) {
  const conversationTag = await fetchConversationTag(conversationTagId);

  if (!conversationTag.success || !conversationTag.data) {
    return null;
  }

  return <EditConversationTagContent conversationTag={conversationTag.data} />;
}
