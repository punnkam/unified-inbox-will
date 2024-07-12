import React from "react";

interface CountBadgeProps {
  count: number;
  selected: boolean;
}

const CountBadge: React.FC<CountBadgeProps> = ({ count, selected }) => {
  if (!count) return null;

  return (
    <div
      className={`rounded-lg text-subtitle-xs text-brand bg-primary h-6 w-[28px] flex items-center justify-center ${!selected ? 'border border-primary' : ''}`}
      style={{ boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.1)" }}
    >
      {count}
    </div>
  );
};

export default CountBadge;
