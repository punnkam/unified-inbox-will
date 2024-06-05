import Link from "next/link";
import cn from "classnames";

export const SideBarIcon = ({
  path,
  icon,
  selected,
}: {
  path: string;
  icon: React.ReactNode;
  selected: boolean;
}) => {
  return (
    <Link
      href={path}
      className={cn(
        "w-10 h-10 rounded-lg flex items-center justify-center",
        selected
          ? "text-icon-brand border bg-primary stroke-primary"
          : "text-icon-secondary hover:text-icon-brand hover:bg-primary hover:border hover:stroke-primary"
      )}
    >
      {icon}
    </Link>
  );
};
