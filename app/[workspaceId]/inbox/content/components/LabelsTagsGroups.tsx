import { HostAiIcon } from "@/components/icons/CustomIcons";
import { cn } from "@/lib/utils";

// must have this defined in component for tailwind to parse
export const colorMap = {
  cyan: "bg-cyan-600",
  amber: "bg-amber-500",
  green: "bg-lime-500",
};

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
  color?: keyof typeof colorMap;
}) => {
  return (
    <div className="flex items-center gap-1 rounded-full px-2 py-1 border border-secondary-hover w-fit h-[25px]">
      {icon && (
        <div className="h-full flex items-center justify-center">{icon}</div>
      )}

      {showHosty && <HostAiIcon className="w-3 h-3" />}

      {avatar && (
        <img
          src={avatar}
          alt="icon"
          className="w-4 h-4 min-w-4 min-h-4 rounded-full object-cover"
        />
      )}

      {emoji && (
        <span role="img" aria-label="Emoji" className="text-body-2xs">
          {String.fromCodePoint(parseInt(emoji, 16))}
        </span>
      )}

      {color && <div className={cn(`w-2 h-2 rounded-full`, colorMap[color])} />}

      <p className="text-body-xs whitespace-nowrap truncate h-full">{text}</p>
    </div>
  );
};
