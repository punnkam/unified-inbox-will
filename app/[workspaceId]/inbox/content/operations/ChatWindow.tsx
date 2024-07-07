import { KeyboardShortcut } from "@/components/custom/KeyBoardShortcut";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  SlackIcon,
} from "@/components/icons/CustomIcons";
import { Conversation, UnifiedConversationType } from "@/lib/realDataSchema";
import { NotesButton } from "./NotesButton";
import { ChatSidebarButton } from "./ChatSidebarButton";
import { Button } from "@/components/ui/button";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "sonner";
import { ChatInput } from "./ChatInput";
import { AnimatePresence } from "framer-motion";

export const ChatWindow = ({
  conversationData,
}: {
  conversationData: Conversation;
}) => {
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
      <div className="pt-6 flex-grow">
        <div className="flex flex-col gap-5 justify-between h-full">
          {/* Chat window */}
          <div className="h-full">hi</div>

          {/* Bottom */}
          <div>
            {/* Chat input */}
            <div className="py-2 px-8">
              <AnimatePresence>
                <ChatInput
                  initialMessageType={
                    conversationData.conversationType ||
                    UnifiedConversationType.Email
                  }
                />
              </AnimatePresence>
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
