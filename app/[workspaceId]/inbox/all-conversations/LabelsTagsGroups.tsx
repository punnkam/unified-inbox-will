import { HostAiIcon } from "@/components/icons/CustomIcons";
import { cn } from "@/lib/utils";

export const LabelsTagsGroups = ({
  text,
  avatar,
  icon,
  emoji,
  showHosty,
  color,
}: {
  text: string;
  avatar?: string;
  icon?: React.ReactNode;
  emoji?: string;
  showHosty?: boolean;
  color?: string;
}) => {
  return (
    <div className="flex items-center gap-1 rounded-full px-2 py-1 border border-secondary-hover w-fit">
      {icon && <div>{icon}</div>}

      {showHosty && <HostAiIcon className="w-3 h-3" />}

      {avatar && (
        <img
          src={avatar}
          alt="icon"
          className="w-4 h-4 rounded-full object-cover"
        />
      )}

      {emoji && (
        <span role="img" aria-label="Emoji" className="text-body-2xs">
          {String.fromCodePoint(parseInt(emoji, 16))}
        </span>
      )}

      {color && <div className={cn(`w-2 h-2 rounded-full`, color)}></div>}

      <p className="text-body-xs">{text}</p>
    </div>
  );
};
