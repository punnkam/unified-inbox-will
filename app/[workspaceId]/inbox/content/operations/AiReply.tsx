"use client";

import {
  ArrowNarrowLeft,
  CalendarCheckIcon,
  Edit05Icon,
  GraduationHatIcon,
  HostAiGraduationIcon,
  HostAiIcon,
} from "@/components/icons/CustomIcons";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Guest,
  MessageItem,
  UnifiedConversationType,
} from "@/lib/realDataSchema";
import { cn, sanitizeHTML } from "@/lib/utils";
import { Dialog } from "@radix-ui/react-dialog";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";
import { messageTypes } from "./MessageTypeDropdown";

export const AiReply = ({
  reply,
  onSendMessage,
  messages,
  guestData,
  AiStep,
}: {
  reply: string;
  onSendMessage: (message: MessageItem) => void;
  messages: MessageItem[];
  guestData: Guest;
  AiStep?: "initial" | "edit" | "teach" | "pre-approve";
}) => {
  const [replyState, setReplyState] = useState(reply);
  const [editReply, setEditReply] = useState(reply);
  const [teachReply, setTeachReply] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [step, setStep] = useState<
    "initial" | "edit" | "teach" | "pre-approve"
  >(AiStep || "initial");
  const [messagesModalOpen, setMessagesModalOpen] = useState(false);

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
      text: replyState,
      isIncoming: false,
      isSeen: false,
      status: "delivered",
      type: UnifiedConversationType.Airbnb,
    });
  };

  const handleDismissApprove = () => {
    // TODO: handle dismiss in API
    setIsOpen(false);
    toast.success("Reservation dismissed");
  };

  const handleApprove = () => {
    // TODO: handle approve in API
    setIsOpen(false);
    toast.success("Reservation approved");
  };

  const handleTeach = () => {
    // TODO: handle teach in API
    console.log("Teaching HostAI", teachReply);
    setIsOpen(false);
    toast.success("Teaching HostAI");
  };

  //   do not show the modal if there are no messages being replied to
  if (!messages || messages.length == 0) return null;

  return (
    <div
      className={cn(
        "self-end flex flex-col gap-5 p-4 border border-primary rounded-xl w-[384px]",
        !isOpen && "hidden"
      )}
    >
      {step === "initial" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[6px]">
              <HostAiIcon className="size-[17px]" />
              <p className="text-subtitle-sm">Proposed reply</p>
            </div>
            <div className="flex items-center gap-3">
              <div>
                <GraduationHatIcon
                  className="h-[13.46px] text-icon-tertiary hover:text-icon-primary cursor-pointer"
                  onClick={() => setStep("teach")}
                />
              </div>
              <div>
                <Edit05Icon
                  className="h-[13.41px] text-icon-tertiary hover:text-icon-primary cursor-pointer"
                  onClick={() => setStep("edit")}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {/* Replying to */}
            <p className="text-subtitle-xs text-tertiary">
              Replying to:{" "}
              {messages.length == 1 ? (
                <span className="text-body-xs">
                  {messages[0].text.slice(0, 40) +
                    (messages[0].text.length > 40 ? "..." : "")}
                </span>
              ) : (
                <span
                  className="text-body-xs underline hover:cursor-pointer hover:text-primary"
                  onClick={() => setMessagesModalOpen(true)}
                >
                  {messages.length + " messages"}
                </span>
              )}
            </p>
            <p className="text-body-sm text-primary">{replyState}</p>
          </div>
        </div>
      )}

      {step === "edit" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[6px]">
              <ArrowNarrowLeft
                className="h-[7px] text-icon-tertiary hover:text-icon-primary cursor-pointer"
                onClick={() => {
                  setStep("initial");
                }}
              />
              <HostAiIcon className="size-[17px]" />
              <p className="text-subtitle-sm">Edit reply</p>
            </div>
            {/* TODO: add variable list here */}
            <p className="text-secondary text-subtitle-sm">Add variables</p>
          </div>
          <Textarea
            placeholder="Edit your reply here"
            value={editReply}
            onChange={(e) => setEditReply(e.target.value)}
            className="h-28 text-body-sm resize-none"
          />
        </div>
      )}

      {step === "teach" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-[6px]">
            <ArrowNarrowLeft
              className="h-[7px] text-icon-tertiary hover:text-icon-primary cursor-pointer"
              onClick={() => {
                setStep("initial");
              }}
            />
            <HostAiGraduationIcon className="size-fit" />
            <p className="text-subtitle-sm">Teach</p>
          </div>
          <Textarea
            placeholder="Teach HostAI how to improve this message"
            value={teachReply}
            onChange={(e) => setTeachReply(e.target.value)}
            className="h-28 text-body-sm resize-none"
          />
        </div>
      )}

      {step === "pre-approve" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-[6px]">
            <div className="flex items-center justify-center rounded-full bg-success-subtle size-5">
              <CalendarCheckIcon className="size-fit text-icon-success" />
            </div>
            <p className="text-subtitle-sm">Pre-approve reservation</p>
          </div>
          <p className="text-body-sm">This reservation isn’t confirmed.</p>
        </div>
      )}

      {/* Reply actions */}
      {step === "initial" && (
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
      )}
      {step === "edit" && (
        <Button
          variant="default"
          size="sm"
          className="w-full"
          onClick={() => {
            setReplyState(editReply);
            setStep("initial");
          }}
        >
          Save
        </Button>
      )}
      {step === "teach" && (
        <Button
          variant="default"
          size="sm"
          className="w-full"
          onClick={handleTeach}
        >
          Teach
        </Button>
      )}
      {step === "pre-approve" && (
        <div className="flex gap-3">
          <Button
            variant="secondary"
            size="sm"
            className="w-full"
            onClick={handleDismissApprove}
          >
            Dismiss
          </Button>
          <Button
            variant="default"
            size="sm"
            className="w-full"
            onClick={handleApprove}
          >
            Pre-approve
          </Button>
        </div>
      )}

      {/* messages modal */}
      <Dialog open={messagesModalOpen} onOpenChange={setMessagesModalOpen}>
        <DialogContent className="flex flex-col gap-4">
          <DialogHeader>Replying to</DialogHeader>

          <div className="border-b border-primary" />

          <div className="flex flex-col gap-4 overflow-y-auto h-[70vh]">
            {messages.map((message) => {
              // Find the image based on the message type
              const messageType = messageTypes.find(
                (msgType) => msgType.type === message.type
              );

              // sanitize the html
              const sanitizedHtml = sanitizeHTML(message.text);

              return (
                <div className="flex flex-col gap-4" key={message.id}>
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
                          <img
                            src={messageType.image}
                            alt={message.type}
                            className="w-4 h-4"
                          />
                        </div>
                      )}
                    </div>

                    {/* Name */}
                    <div className="flex flex-col gap-1">
                      <p className="text-subtitle-md h-5">{guestData.name}</p>
                      <div className="flex items-center gap-[6px]">
                        <p className="text-body-xs text-tertiary">
                          Listing Time:{" "}
                          <span className="text-secondary">
                            {format(message.timestamp, "h:mm a")}
                          </span>
                        </p>
                        <div className="size-[3px] bg-icon-tertiary rounded-full"></div>
                        <p className="text-body-xs text-tertiary">
                          Your Time:{" "}
                          <span className="text-secondary">
                            {format(message.timestamp, "h:mm a")}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <p
                    className="text-body-sm"
                    dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
                  />

                  <div className="border-b border-primary" />
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
