import Link from "next/link";
import cn from "classnames";

export const InboxSideBarOption = ({
  path,
  name,
  selected,
  icon,
  image,
  count,
}: {
  path: string;
  name: string;
  selected: boolean;
  icon?: React.ReactNode;
  image?: string;
  emoji?: string;
  count?: number;
}) => {
  return (
    <Link href={path}>
      <div
        className={cn(
          "flex items-center justify-between w-full px-2 py-1 h-8 active:bg-pressed rounded-md gap-2",
          selected ? "bg-selected hover:bg-selected" : "hover:bg-hover"
        )}
      >
        <div className="text-subtitle-xs flex items-center gap-2">
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

          {image && (
            <img
              src={image}
              alt="icon"
              className="size-[18px] rounded-full object-cover"
            />
          )}
          <p>{name}</p>
        </div>
        {count && (
          <div
            className={cn(
              "rounded-lg text-subtitle-2xs size-6 flex items-center justify-center",
              selected ? "text-brand bg-primary" : "text-tertiary"
            )}
          >
            {count}
          </div>
        )}
      </div>
    </Link>
  );
};
