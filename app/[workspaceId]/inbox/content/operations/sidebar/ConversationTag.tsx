import { ConversationTag } from "@/lib/realDataSchema";
import { fakeIconsData } from "@/lib/types";
import { IconComponent } from "@/components/icons/IconComponent";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const ConversationTagItem = ({
  tag,
  onTagClick,
  selected,
}: {
  tag: ConversationTag;
  onTagClick: (tag: ConversationTag) => void;
  selected: boolean;
}) => {
  // find the icon from id
  const icon = fakeIconsData.find((icon) => icon.id === tag.iconId);

  // pass the tag id to the parent
  const handleTagClick = () => {
    onTagClick(tag);
  };

  // When the user clicks the action on the tag
  const handleAction = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // stop the event from bubbling up to the parent
    e.stopPropagation();

    // TODO API: handle action (dismiss tag)

    toast.success(`Tag action convoTag id: ${tag.id}`);
    console.log("Action clicked convo id: ", tag.id);
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-1 px-5 py-4 bg-primary border border-primary rounded-lg hover:cursor-pointer hover:bg-hover active:bg-pressed",
        selected && "border-secondary-hover"
      )}
      onClick={handleTagClick}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          {icon && (
            <div className="flex items-center justify-center">
              <IconComponent
                icon={icon.icon}
                classNames="text-icon-secondary max-h-[15px]"
              />
            </div>
          )}
          <p className="text-subtitle-sm">{tag.name}</p>
        </div>
        <div
          className="text-subtitle-xs text-link hover:text-link-bold hover:cursor-pointer"
          onClick={handleAction}
        >
          Dismiss
        </div>
      </div>
      <p className="text-body-xs text-secondary break-all">{tag.description}</p>
    </div>
  );
};
