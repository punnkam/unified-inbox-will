import { Stars01Icon } from "@/components/icons/CustomIcons";

export const ConvoSummary = ({
  title,
  summary,
}: {
  title: string;
  summary: string;
}) => {
  return (
    <div className="flex flex-col gap-2 px-5 py-4 bg-primary rounded-lg border border-primary">
      <div className="flex items-center gap-1">
        <Stars01Icon className="text-icon-brand size-[18px]" />
        <p className="text-title-md">{title}</p>
      </div>
      <p className="text-body-xs text-secondary">{summary}</p>
    </div>
  );
};
