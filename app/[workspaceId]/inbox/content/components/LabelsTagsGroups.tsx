import { HostAiIcon } from "@/components/icons/CustomIcons";
import { IconComponent } from "@/components/icons/IconComponent";
import { fakeIconsData } from "@/lib/types";
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
  className,
}: {
  text?: string;
  avatar?: string;
  icon?: React.ReactNode | number;
  emoji?: string;
  showHosty?: boolean;
  color?: keyof typeof colorMap;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full px-2 py-1 border border-secondary-hover w-fit h-[25px]",
        className
      )}
    >
      {typeof icon === "number" ? (
        <div className="h-full flex items-center justify-center">
          {fakeIconsData.find((iconData) => iconData.id === icon)?.icon && (
            <IconComponent
              icon={
                fakeIconsData.find((iconData) => iconData.id === icon)!.icon
              }
              classNames="size-3 text-tertiary"
            />
          )}
        </div>
      ) : (
        icon && (
          <div className="h-full flex items-center justify-center">{icon}</div>
        )
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

      {text && (
        <p className="text-body-xs whitespace-nowrap truncate h-full">{text}</p>
      )}
    </div>
  );
};
