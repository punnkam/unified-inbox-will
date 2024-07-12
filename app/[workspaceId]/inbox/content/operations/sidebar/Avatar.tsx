import { cn } from "@/lib/utils";
import { User03Icon } from "@/components/icons/CustomIcons";

export const Avatar = ({
  size,
  image,
  greenDot,
}: {
  size: "xxs" | "xs" | "small" | "medium" | "large";
  image?: string;
  greenDot?: boolean;
}) => {
  const sizeClass =
    size === "xxs"
      ? "size-[18px] min-w-[18px] min-h-[18px]"
      : size === "xs"
      ? "size-[20px] min-w-[20px] min-h-[20px]"
      : size === "small"
      ? "size-6 min-w-6 min-h-6"
      : size === "medium"
      ? "size-9 min-w-9 min-h-9"
      : "size-10 min-w-10 min-h-10";

  return (
    <div className="relative h-fit">
      {image ? (
        <img
          src={image}
          alt="Guest Image"
          className={cn("rounded-full object-cover", sizeClass)}
        />
      ) : (
        <div
          className={cn(
            "rounded-full bg-secondary flex items-center justify-center",
            sizeClass
          )}
        >
          <User03Icon className="size-fit text-icon-tertiary" />
        </div>
      )}
      {greenDot && size === "small" && (
        <div className="absolute bottom-[1px] right-0 size-[6px] rounded-full bg-icon-success"></div>
      )}
      {greenDot && size === "medium" && (
        <div className="absolute bottom-[1px] right-0 size-[9px] rounded-full bg-icon-success"></div>
      )}
      {greenDot && size === "large" && (
        <div className="absolute bottom-[1px] right-0 size-[10px] rounded-full bg-icon-success"></div>
      )}
    </div>
  );
};
