import { messageTypes } from "./MessageTypeDropdown";
import {
  Guest,
  MessageItem,
  UnifiedConversationType,
} from "@/lib/realDataSchema";
import { sanitizeHTML } from "@/lib/utils";
import { format } from "date-fns";

export const InboundMessage = ({
  message,
  guestData,
  type,
}: {
  message: MessageItem;
  guestData: Guest;
  type: UnifiedConversationType;
}) => {
  // Find the image based on the message type
  const messageType = messageTypes.find((msgType) => msgType.type === type);

  // sanitize the html
  const sanitizedHtml = sanitizeHTML(message.text);

  return (
    <div className="flex flex-col gap-4 p-4 bg-primary-subtle min-w-[260px] max-w-[540px] w-fit rounded-r-xl rounded-b-xl">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          {/* Profile picture */}
          <div className="relative">
            <img
              src={guestData.imageUrl!}
              alt={guestData.name || "Guest"}
              className="size-9 min-w-9 min-h-9 rounded-full object-cover"
            />
            {message.isIncoming && messageType && (
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
      </div>
      <p
        className="text-subtitle-sm min-h-5"
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />
    </div>
  );
};
