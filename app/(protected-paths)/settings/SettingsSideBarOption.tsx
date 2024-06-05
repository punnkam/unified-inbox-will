import Link from "next/link";
import cn from "classnames";

export const SettingsSideBarOption = ({
  path,
  name,
  selected,
}: {
  path: string;
  name: string;
  selected: boolean;
}) => {
  return (
    <Link href={path}>
      <p
        className={cn(
          "w-full px-6 py-2 text-subtitle-xs hover:bg-selected-subtle",
          selected && "bg-selected"
        )}
      >
        {name}
      </p>
    </Link>
  );
};
