import { messageTypes } from "./MessageTypeDropdown";
import {
  Guest,
  MessageItem,
  UnifiedConversationType,
} from "@/lib/realDataSchema";
import { sanitizeHTML } from "@/lib/utils";
import { format } from "date-fns";
import { LabelsTagsGroups } from "../components/LabelsTagsGroups";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const InboundMessage = ({
  message,
  guestData,
  type,
}: {
  message: MessageItem;
  guestData: Guest;
  type: UnifiedConversationType;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Find the image based on the message type
  const messageType = messageTypes.find((msgType) => msgType.type === type);

  // sanitize the html
  const sanitizedHtml = sanitizeHTML(message.text);

  return (
    <div className="flex flex-col gap-4 py-4 bg-primary-subtle min-w-[260px] max-w-[540px] w-fit rounded-r-xl rounded-b-xl">
      <div className="flex items-start gap-4 px-4 justify-between">
        <div className="flex items-center gap-3">
          {/* Profile picture */}
          <div className="relative">
            <img
              src={guestData.imageUrl!}
              alt={guestData.name || "Guest"}
              className="size-9 min-w-9 min-h-9 rounded-full object-cover"
            />
            {messageType && (
              <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 flex items-center justify-center bg-[#27D045] rounded-full">
                <img src={messageType.image} alt={type} className="w-4 h-4" />
              </div>
            )}
          </div>

          {/* Name */}
          <div className="flex flex-col gap-1">
            <p className="text-subtitle-md h-5">{guestData.name}</p>
            <div className="flex items-center gap-1">
              <p className="text-body-xs text-tertiary">
                LT{" "}
                <span className="text-secondary">
                  {format(message.timestamp, "h:mm a")}
                </span>
              </p>
              <p className="text-body-xs text-tertiary">
                YT{" "}
                <span className="text-secondary">
                  {format(message.timestamp, "h:mm a")}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          {message.tags && message.tags.length > 0 && (
            <>
              <LabelsTagsGroups
                key={message.tags[0].id}
                text={message.tags[0].name}
                icon={message.tags[0].iconId}
                className="bg-primary border-0"
              />
              {message.tags.length > 1 && (
                <p className="text-body-xs text-primary px-2 py-1">
                  +{message.tags.length - 1} more
                </p>
              )}
            </>
          )}
        </div>
      </div>
      {type === UnifiedConversationType.Email ? (
        <div className="flex flex-col gap-4 justify-between">
          <div className="flex flex-wrap items-center gap-1 px-4">
            <p className="text-body-xs text-tertiary">
              To{" "}
              <span className="text-secondary">
                {message.emailData?.to.join(", ")}
              </span>
            </p>
            {message.emailData?.cc && message.emailData?.cc.length > 0 && (
              <p className="text-body-xs text-tertiary">
                Cc{" "}
                <span className="text-secondary">
                  {message.emailData?.cc.join(", ")}
                </span>
              </p>
            )}
            {message.emailData?.bcc && message.emailData?.bcc.length > 0 && (
              <p className="text-body-xs text-tertiary">
                Bcc{" "}
                <span className="text-secondary">
                  {message.emailData?.bcc.join(", ")}
                </span>
              </p>
            )}
          </div>
          <div className="border-b border-primary"></div>
          <div className="flex flex-col px-4 gap-4">
            <p className="text-subtitle-sm">{message.emailData?.subject}</p>
            <div
              className={`relative overflow-hidden transition-all duration-300 ease-in-out ${
                isExpanded ? "max-h-full" : "max-h-[200px]"
              }`}
            >
              <p
                className="text-body-sm min-h-5"
                dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
              />
              {!isExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-primary-subtle to-transparent" />
              )}
            </div>
            <Button
              size="xs"
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="self-center !h-6"
            >
              {isExpanded ? "See less" : "See more"}
            </Button>
          </div>
        </div>
      ) : (
        <p
          className="text-body-sm min-h-5 px-4"
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
      )}
    </div>
  );
};
