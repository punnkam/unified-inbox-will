"use client";

import {
  Edit05Icon,
  GraduationHatIcon,
  HostAiIcon,
} from "@/components/icons/CustomIcons";
import { Button } from "@/components/ui/button";
import { MessageItem, UnifiedConversationType } from "@/lib/realDataSchema";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const AiReply = ({
  reply,
  onSendMessage,
}: {
  reply: string;
  onSendMessage: (message: MessageItem) => void;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleDismiss = () => {
    // TODO: handle dismiss in API
    setIsOpen(false);
  };

  const handleSend = () => {
    // TODO: handle send in API
    setIsOpen(false);

    // Create a new message object for AI reply (using airbnb as type for now)
    onSendMessage({
      id: Date.now().toString(),
      timestamp: Math.floor(Date.now() / 1000),
      author: "host",
      text: reply,
      isIncoming: false,
      isSeen: false,
      status: "delivered",
      type: UnifiedConversationType.Airbnb,
    });
  };

  return (
    <div
      className={cn(
        "self-end flex flex-col gap-5 p-4 border border-primary rounded-xl w-[384px]",
        !isOpen && "hidden"
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[6px]">
            <HostAiIcon className="size-[17px]" />
            <p className="text-subtitle-sm">Proposed reply</p>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <GraduationHatIcon className="h-[13.46px] text-icon-tertiary hover:text-icon-primary cursor-pointer" />
            </div>
            <div>
              <Edit05Icon className="h-[13.41px] text-icon-tertiary hover:text-icon-primary cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {/* Replying to */}
          <p className="text-subtitle-sm text-tertiary">
            Replying to:{" "}
            <span className="text-body-xs">Thank you so much for the info</span>
          </p>
          <p className="text-body-sm text-primary">{reply}</p>
        </div>
      </div>

      {/* Reply actions */}
      <div className="flex gap-3">
        <Button
          variant="secondary"
          size="sm"
          className="w-full"
          onClick={handleDismiss}
        >
          Dismiss
        </Button>
        <Button
          variant="default"
          size="sm"
          className="w-full"
          onClick={handleSend}
        >
          Send
        </Button>
      </div>
    </div>
  );
};
