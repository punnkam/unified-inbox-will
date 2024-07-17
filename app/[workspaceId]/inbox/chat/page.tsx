// TODO:Convert this all to a 'use client' page to simulate pages router

import { ChatWindow } from "../content/operations/ChatWindow";
import { fetchConversation } from "@/app/actions";

export default async function AllConversationsPage({
  params: { workspaceId },
  searchParams: { c },
}: {
  params: { workspaceId: string };
  searchParams: { c: string };
}) {
  const data = await fetchConversation(c);

  if (!data || !data.success || !data.data) {
    return null;
  }

  return <ChatWindow conversationData={data.data} />;
}
