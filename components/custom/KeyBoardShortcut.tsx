import { cn } from "@/lib/utils";

export const KeyboardShortcut = ({
  shortcut,
  className,
}: {
  shortcut: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        `flex items-center justify-center border border-secondary rounded-[3.2px] shadow-sm size-4 overflow-y-clip`,
        className
      )}
    >
      <p className="text-[10.5px] text-secondary h-full">{shortcut}</p>
    </div>
  );
};
