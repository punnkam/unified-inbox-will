import { cn } from "@/lib/utils";

export const KeyboardShortcut = ({
  shortcut,
  className,
  size = "medium",
}: {
  shortcut: string;
  className?: string;
  size?: "small" | "medium" | "large";
}) => {
  return (
    <div
      className={cn(
        `flex items-center justify-center border border-secondary rounded-[3.2px] overflow-y-clip`,
        size === "small" && "size-3 min-w-3 min-h-3",
        size === "medium" && "size-4 min-w-4 min-h-4",
        size === "large" && "size-5 min-w-5 min-h-5",
        className
      )}
      style={{ boxShadow: "0px 6.25px 5px 0px rgba(0, 0, 0, 0.03)" }}
    >
      <p
        className={cn(
          "text-[10.5px] text-secondary h-auto",
          size === "small" && "text-[10px]",
          size === "medium" && "text-[10.5px]",
          size === "large" && "text-[13.13px]"
        )}
      >
        {shortcut}
      </p>
    </div>
  );
};
