"use server";

import { fetchSavedReply } from "@/app/actions";
import SavedReplyContent from "./content";

export default async function EditSavedReplyPage({
  params: { savedReplyId },
}: {
  params: { savedReplyId: string };
}) {
  const savedReply = await fetchSavedReply(savedReplyId);

  if (!savedReply.success || !savedReply.data) {
    return null;
  }

  return <SavedReplyContent savedReply={savedReply.data} />;
}
