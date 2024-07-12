"use client";

import { KeyboardShortcut } from "@/components/custom/KeyBoardShortcut";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  File05Icon,
  PhoneIcon,
  SlackIcon,
} from "@/components/icons/CustomIcons";
import {
  Conversation,
  ConversationTag,
  MessageItem,
  UnifiedConversationType,
} from "@/lib/realDataSchema";
import { NotesButton } from "./NotesButton";
import { ChatSidebarButton } from "./ChatSidebarButton";
import { Button } from "@/components/ui/button";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "sonner";
import { ChatInput } from "./ChatInput";
import { AnimatePresence, motion } from "framer-motion";
import { InboundMessage } from "./InboundMessage";
import { OutboundMessage } from "./OutboundMessage";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { useTableContext } from "../../TableContext";
import { OperationsRightSidebar } from "./OperationsRightSidebar";
import { AiReply } from "./AiReply";
import { InChatActivity } from "../components/InChatActivity";
import { useOpsRightSidebar } from "../../OpsRightSidebarContext";

export const ChatWindow = ({
  conversationData,
}: {
  conversationData: Conversation;
}) => {
  // local state for messages
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [selectedTagId, setSelectedTagId] = useState<number | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const { setView } = useTableContext();
  const { setSelectedTab } = useOpsRightSidebar();

  const addMessage = (newMessage: MessageItem) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  // API: handle on backend if needed
  const handleTrainAI = () => {
    // TODO: I assume this should open a modal or something
    console.log("TODO: handle training your AI click");
    toast.success("Training your AI");
  };

  // API: handle on backend
  const handleMarkAsDone = () => {
    console.log("TODO: handle mark as done click");
    toast.success("Marked as done");
  };

  useHotkeys("K", handleTrainAI);
  useHotkeys("E", handleMarkAsDone);

  // Use useEffect to load the messages state
  useEffect(() => {
    setMessages(conversationData.allMessages || []);
  }, [conversationData]);

  // Use useEffect to update the context view
  useEffect(() => {
    // update the context view so we can handle loading states and sidebar
    setView("chat");
  }, [setView]);

  // Scroll to the bottom of the chat on mount/new messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // handle when a tag is clicked
  const handleTagClick = (tagId: ConversationTag["id"]) => {
    setSelectedTagId(tagId || null);

    //fidn the message with the selected tag id
    const message = messages?.find((m) => m.tags?.find((t) => t.id === tagId));

    console.log("Tag clicked convo id: ", tagId, message);

    if (message) {
      document.getElementById("message-" + message.id)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  };

  return (
    <div className="h-full flex">
      <div
        className="h-full flex-grow flex flex-col z-10"
        style={{ boxShadow: "0px 4px 50px 0px rgba(0, 0, 0, 0.05)" }}
      >
        {/* Header */}
        <div className="px-8 py-5 flex items-center justify-between bg-primary-subtle border-b border-primary">
          {/* Guest name + Image */}
          <div className="flex items-center gap-3">
            <img
              src={conversationData.guest.imageUrl!}
              alt={conversationData.guest.name || "Guest"}
              className="size-10 min-w-10 min-h-10 rounded-full object-cover"
            />
            <p className="text-title-xl">
              {conversationData.guest.name || "Guest"}
            </p>
          </div>

          {/* Right side of header */}
          <div className="flex items-center gap-3">
            {/* TODO: (Slack) I assume this is supposed to be some kind of a dropdown (it is not in designs) */}
            <div className="p-3">
              <div className="flex items-center gap-2">
                <SlackIcon className="size-[16px]" />
                <div className="flex items-center gap-2">
                  <p className="text-subtitle-sm text-secondary">Slack</p>
                  <KeyboardShortcut shortcut="T" />
                  {/* <div className="size-[16px]"> */}
                  <ChevronDownIcon />
                  {/* </div> */}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-r border-secondary h-[28px]"></div>

            <div className="flex gap-2">
              {/* TODO: Add logic for when the new notes is true + when selected */}
              <NotesButton newNotes={true} />
              <ChatSidebarButton selected={true} />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="pt-6 flex-grow overflow-y-auto">
          <div className="flex flex-col gap-5 justify-between h-full pb-2">
            {/* Chat window */}
            <AnimatePresence initial={false}>
              <div
                className="h-full flex flex-col gap-5 px-8 overflow-auto"
                ref={chatContainerRef}
              >
                {messages?.reduce<React.ReactNode[]>(
                  (acc, message, index, array) => {
                    const previousMessage = array[index - 1];
                    const messageDate = new Date(message.timestamp * 1000);
                    const previousMessageDate = previousMessage
                      ? new Date(previousMessage.timestamp * 1000)
                      : null;

                    const messageDay = messageDate.toLocaleDateString();
                    const previousMessageDay = previousMessageDate
                      ? previousMessageDate.toLocaleDateString()
                      : "";

                    if (messageDay !== previousMessageDay) {
                      const today = new Date().toLocaleDateString();
                      const yesterday = new Date(
                        Date.now() - 86400000
                      ).toLocaleDateString();
                      let dayHeader =
                        messageDay === today
                          ? "Today"
                          : messageDay === yesterday
                          ? "Yesterday"
                          : format(messageDate, "MMMM dd, yyyy");

                      acc.push(
                        <motion.div
                          key={message.id + "-date"}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-center text-bold-section text-secondary uppercase"
                        >
                          {dayHeader}
                        </motion.div>
                      );
                    }

                    acc.push(
                      <motion.div
                        key={message.id}
                        id={`message-${message.id}`}
                        className="flex flex-col gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {message.author === "guest" ? (
                          <InboundMessage
                            message={message}
                            guestData={conversationData.guest}
                            type={
                              message.type || conversationData.conversationType!
                            }
                          />
                        ) : (
                          <OutboundMessage
                            message={message}
                            type={
                              message.type || conversationData.conversationType!
                            }
                          />
                        )}
                      </motion.div>
                    );

                    return acc;
                  },
                  []
                )}

                {/* show an AI reply */}
                <AiReply
                  reply="Facilisis eu ut molestie elit eget. Sit odio volutpat augue elementum porttitor. Facilisis quis integer orci adipiscing lobortis. Massa habitasse sed aliquam."
                  onSendMessage={addMessage}
                  messages={
                    messages.filter((message) => message.author === "guest")
                    // .slice(0, 1)
                  }
                  AiStep="initial"
                  guestData={conversationData.guest}
                />

                <InChatActivity
                  title="Call Ended."
                  time="12:32 PM"
                  description="You and rob called for 20 min."
                  image={conversationData.guest.imageUrl!}
                  icon={<PhoneIcon />}
                  action="View call"
                  onAction={() => {
                    setSelectedTab({ type: "calls", data: null });
                  }}
                />

                <InChatActivity
                  title="Note Created"
                  time="12:32 PM"
                  description="Punn and Will added"
                  image={conversationData.guest.imageUrl!}
                  icon={<File05Icon className="h-5" />}
                  action="notes"
                  onAction={() => {
                    setSelectedTab({ type: "notes", data: null });
                  }}
                />
              </div>
            </AnimatePresence>

            {/* Bottom */}
            <div>
              {/* Chat input */}
              <div className="py-2 px-8">
                <ChatInput
                  initialMessageType={
                    conversationData.conversationType ||
                    UnifiedConversationType.Email
                  }
                  onSendMessage={addMessage}
                />
              </div>

              {/* Result of the ancient battle of the bottom bar - Jared vs Eli */}
              <div className="px-8 py-4">
                <div className="flex items-center justify-between">
                  {/* Teach your AI button */}
                  <div
                    className="h-9 text-secondary py-2 flex items-center gap-2 text-subtitle-xs hover:cursor-pointer hover:text-primary"
                    onClick={handleTrainAI}
                  >
                    Teach your AI
                    <KeyboardShortcut shortcut="K" />
                  </div>

                  {/* Mark as done button */}
                  <Button
                    variant="outline"
                    size={"sm"}
                    className="flex items-center gap-2"
                    onClick={handleMarkAsDone}
                  >
                    <CheckCircleIcon className="text-icon-success" />
                    Mark as done
                    <KeyboardShortcut shortcut="E" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OperationsRightSidebar
        conversationData={conversationData}
        onTagClick={handleTagClick}
        selectedTagId={selectedTagId}
        addMessage={addMessage}
      />
    </div>
  );
};
