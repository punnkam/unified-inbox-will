import { Button } from "@/components/ui/button";
import { ConvoSummary } from "./sidebar/ConvoSummary";
import { PauseSqareIcon, PhoneIcon } from "@/components/icons/CustomIcons";
import { Avatar } from "./sidebar/Avatar";
import { Conversation, ConversationTag } from "@/lib/realDataSchema";
import { Assignee } from "./sidebar/Assignee";
import { ConversationTagItem } from "./sidebar/ConversationTag";
import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area";

export const OperationsLeftSidebar = ({
  conversationData,
  onTagClick,
  selectedTagId,
}: {
  conversationData: Conversation;
  onTagClick: (tagId: ConversationTag["id"]) => void;
  selectedTagId: number | null;
}) => {
  // handleTagClick is called when a tag is clicked
  const handleTagClick = (tag: ConversationTag) => {
    // call the onTagClick function for parent to handle
    onTagClick(tag.id);
  };

  return (
    <ScrollArea className="w-[400px] min-w-[400px] bg-primary-subtle pb-6 overflow-y-auto">
      <div className="pt-3 pb-6 border-b border-primary">
        <p className="px-6 py-5 text-title-0.5xl">At a glance</p>

        <div className="flex flex-col gap-2 px-6">
          {/* Guest Journey Card */}
          <div className="px-5 py-4 flex flex-col gap-4 bg-primary rounded-lg border border-primary">
            <div className="flex items-center justify-between">
              <p className="text-title-md">During Stay</p>
              <p className="text-subtitle-xs text-secondary">Aug 12 - Sep 23</p>
            </div>

            {/* Guest Journey Progress */}
            <div className="flex gap-3">
              {/* Before */}
              <div className="flex flex-col gap-2 w-full">
                <div className="h-1 w-full bg-brand rounded-sm" />
                <p className="text-bold-section text-brand uppercase">Before</p>
              </div>

              {/* During */}
              <div className="flex flex-col gap-2 w-full">
                <div className="h-1 w-full bg-brand rounded-sm" />
                <p className="text-bold-section text-brand uppercase">During</p>
              </div>

              {/* After */}
              <div className="flex flex-col gap-2 w-full">
                <div className="h-1 w-full bg-[#EFEFEF] rounded-sm" />
                <p className="text-bold-section text-disabled uppercase">
                  After
                </p>
              </div>
            </div>
          </div>

          {/* Conversation Summary */}
          <ConvoSummary
            title="Robb is doing pretty well."
            summary="The Lannister scouts thought Robb only had twenty thousand troops in his batallion."
          />
        </div>
      </div>

      {/* Conversation */}
      <div className="flex flex-col gap-4 pt-6 pb-8">
        <div className="flex items-center gap-[10px] px-6">
          <div className="flex items-center justify-between w-full">
            <p className="text-title-0.5xl">Conversation</p>

            {/* Avatar in chat */}
            <Avatar
              size={"small"}
              image={
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              greenDot={true}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant={"ghost"} size={"iconMd"}>
              <PhoneIcon className="text-icon-brand size-[15px]" />
            </Button>
            <Button variant={"ghost"} size={"iconMd"}>
              <PauseSqareIcon className="text-icon-brand size-[15px]" />
            </Button>
          </div>
        </div>

        {/* Conversation Stuff */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 px-6">
            <p className="text-body-xs text-secondary">Assignee</p>

            {/* Assignee */}
            <Assignee
              assigneeData={conversationData.assigneeData}
              conversationId={conversationData.id}
            />
          </div>

          {conversationData.tags && (
            <div className="flex flex-col gap-2 px-6">
              <p className="text-body-xs text-secondary">Conversation Tags</p>

              {/* Conversation Tags */}
              {conversationData.tags!.map((tag) => (
                <ConversationTagItem
                  key={tag.id}
                  tag={tag}
                  onTagClick={handleTagClick}
                  selected={selectedTagId === tag.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};
