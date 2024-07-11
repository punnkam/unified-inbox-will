import clsx from "clsx";
import React from "react";

interface CountBadgeProps {
  count: number;
  selected: boolean;
  todo?: boolean;
}

const CountBadge: React.FC<CountBadgeProps> = ({ count, selected, todo }) => {
  if (!count) return null;

  return (
    <div
      className={clsx(
        `rounded-lg text-subtitle-xs text-brand h-6 w-[28px] flex items-center justify-center`,
        todo ? "bg-hover border border-primary" : "bg-primary",
        !selected && "border border-primary"
      )}
      style={{ boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.1)" }}
    >
      {count}
    </div>
  );
};

export default CountBadge;
