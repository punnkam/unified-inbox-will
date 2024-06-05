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
          ? "text-icon-brand bg-primary border stroke-primary"
          : "text-icon-secondary hover:text-icon-secondary hover:bg-hover active:bg-pressed active:border active:stroke-primary"
      )}
    >
      {icon}
    </Link>
  );
};
