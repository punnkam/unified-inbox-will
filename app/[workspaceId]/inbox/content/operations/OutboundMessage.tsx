import { messageTypes } from "./MessageTypeDropdown";
import { MessageItem, UnifiedConversationType } from "@/lib/realDataSchema";
import { format } from "date-fns";
import { LabelsTagsGroups } from "../components/LabelsTagsGroups";
import { sanitizeHTML } from "@/lib/utils";

export const OutboundMessage = ({
  message,
  type,
}: {
  message: MessageItem;
  type: UnifiedConversationType;
}) => {
  // Find the image based on the message type
  const messageType = messageTypes.find((msgType) => msgType.type === type);

  // sanitize the html
  const sanitizedHtml = sanitizeHTML(message.text);

  return (
    <div className="self-end flex flex-col gap-4 p-4 bg-selected-subtle min-w-[260px] max-w-[540px] w-fit rounded-l-xl rounded-b-xl">
      <div className="flex gap-4 justify-between">
        <div className="flex items-center gap-3">
          {/* Profile picture */}
          <div className="relative">
            <img
              src={
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt={"placeholder for user image"}
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
            <div className="flex items-center gap-1">
              <p className="text-subtitle-md h-5">Robb Stark</p>
              <p className="text-subtitle-md text-tertiary">(Cole Rubin)</p>
            </div>
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
        <LabelsTagsGroups
          text="Sent by HostAI"
          showHosty={true}
          className="bg-primary border-0"
        />
      </div>
      <p
        className="text-subtitle-sm min-h-5"
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />
    </div>
  );
};
