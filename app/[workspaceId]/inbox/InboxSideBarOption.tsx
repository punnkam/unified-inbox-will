import Link from "next/link";
import cn from "classnames";
import { colorMap } from "@/lib/types";
import { useSidebar } from "./SidebarContext";
import { useWindowSize } from "@/lib/hooks/useWindowSize";
import CountBadge from "@/components/custom/CountBadge";

export const InboxSideBarOption = ({
  path,
  name,
  selected,
  icon,
  image,
  count,
  color,
  emoji,
  className,
}: {
  path: string;
  name: string;
  selected: boolean;
  icon?: React.ReactNode;
  image?: string;
  emoji?: string;
  count?: number;
  color?: keyof typeof colorMap;
  className?: string;
}) => {
  const { toggleSidebar } = useSidebar();
  const size = useWindowSize();

  return (
    <Link href={path}>
      <div
        className={cn(
          "flex items-center justify-between w-full px-2 py-1 h-8 active:bg-pressed rounded-md gap-2",
          selected ? "bg-selected hover:bg-selected" : "hover:bg-hover",
          className
        )}
        onClick={() => {
          if (size.width! <= 705) {
            toggleSidebar();
          }
        }}
      >
        <div className="text-subtitle-sidebar flex items-center gap-2">
          {color && (
            <div className={cn(`w-2 h-2 rounded-full`, colorMap[color])}></div>
          )}

          {icon && (
            <div
              className={cn(
                "size-[18px] flex justify-center items-center",
                selected ? "text-icon-brand" : "text-icon-tertiary"
              )}
            >
              {icon}
            </div>
          )}

          {emoji && (
            <span role="img" aria-label="Emoji" className="text-body-2xs">
              {String.fromCodePoint(parseInt(emoji, 16))}
            </span>
          )}

          {image && (
            <img
              src={image}
              alt="icon"
              className="size-[18px] rounded-full object-cover"
            />
          )}
          <p>{name}</p>
        </div>
        {count !== undefined && (
          <CountBadge count={count} selected={selected} />
        )}
      </div>
    </Link>
  );
};
