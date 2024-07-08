"use client";

import { KeyboardShortcut } from "@/components/custom/KeyBoardShortcut";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  SlackIcon,
} from "@/components/icons/CustomIcons";
import {
  Conversation,
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

export const ChatWindow = ({
  conversationData,
}: {
  conversationData: Conversation;
}) => {
  // local state for messages
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const { setView } = useTableContext();

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

  useEffect(() => {
    if (lastMessageRef.current) {
      // Remove behavior smooth if you want to disable smooth scrolling animation on load
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="h-full flex flex-col">
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
            <ChatSidebarButton newNotes={true} />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="pt-6 flex-grow overflow-y-auto">
        <div className="flex flex-col gap-5 justify-between h-full">
          {/* Chat window */}
          <AnimatePresence initial={false}>
            <div className="h-full flex flex-col gap-5 px-8 overflow-auto">
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
                      className="flex flex-col gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      ref={index === array.length - 1 ? lastMessageRef : null}
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
  );
};
