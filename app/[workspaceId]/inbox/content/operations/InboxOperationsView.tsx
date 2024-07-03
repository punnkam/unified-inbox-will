"use client";

import { useEffect } from "react";
import { Conversation } from "@/lib/realDataSchema";
import { useTableContext } from "../../TableContext";

export const InboxOperationsView = ({
  conversationData,
}: {
  conversationData: Conversation;
}) => {
  const { setView } = useTableContext();

  // Use useEffect to update the context view
  useEffect(() => {
    // update the context view so we can handle loading states and sidebar
    setView("chat");
  }, [setView]);

  return (
    <div className="h-full">
      <p>hi</p>
    </div>
  );
};
