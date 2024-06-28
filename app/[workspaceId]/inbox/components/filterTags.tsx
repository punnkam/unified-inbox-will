import { ColumnFiltersState } from "@tanstack/react-table";
import { AllFilters, FilterValue, allFilters } from "@/lib/realDataSchema";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { IconComponent } from "@/components/icons/IconComponent";

export const Tag = ({
  title,
  icon,
  value,
  onRemove,
}: {
  title: string;
  icon: React.JSXElementConstructor<React.SVGProps<SVGSVGElement>>;
  value: string;
  onRemove: () => void;
}) => {
  return (
    <div className="flex gap-1 justify-center items-center bg-blue-500/10 text-link border border-info rounded-full px-2 py-1 ">
      <IconComponent icon={icon} classNames="size-3 text-info" />
      <div className="flex items-center gap-1 whitespace-nowrap">
        <p className="text-body-sm">{title}:</p>
        <p className="text-subtitle-sm">{value}</p>
      </div>
      <XIcon
        className="h-4 w-4 text-icon-active hover:cursor-pointer"
        onClick={onRemove}
      />
    </div>
  );
};

export const FilterTags = ({
  columnFilters,
  clearFilters,
  removeFilter,
}: {
  columnFilters: ColumnFiltersState;
  clearFilters: () => void;
  removeFilter: (columnId: string, filterKey: string) => void;
}) => {
  // Check if any of the filters should be displayed as tags (if not remove excess padding)
  const hasTags = columnFilters.some(
    (filter) =>
      typeof filter.value === "object" &&
      filter.value !== null &&
      Object.keys(filter.value).length > 0 &&
      Object.values(filter.value).some((filterValue) => filterValue.length > 0)
  );

  return (
    hasTags && (
      <div className={`flex gap-2 flex-wrap px-9 pt-4 pb-2`}>
        {columnFilters.map((filter) => {
          if (
            typeof filter.value === "object" &&
            filter.value !== null &&
            Object.keys(filter.value).length > 0
          ) {
            return Object.entries(
              filter.value as { [key in keyof AllFilters]: FilterValue[] }
            ).map(([key, values]) => {
              if (values.length > 0) {
                const displayValue =
                  values.length > 2
                    ? `${values.length} selected`
                    : values
                        .map((value) =>
                          typeof value === "object" ? value.name : value
                        )
                        .join(", ");
                return (
                  <Tag
                    key={filter.id}
                    title={allFilters[key as keyof AllFilters]!.title}
                    icon={allFilters[key as keyof AllFilters]!.icon}
                    value={displayValue}
                    onRemove={() => removeFilter(filter.id, key)}
                  />
                );
              }
              return null;
            });
          }
          return null;
        })}

        <Button variant="ghost" size={"sm"} onClick={() => clearFilters()}>
          <p className="text-secondary text-subtitle-sm">Clear All</p>
        </Button>
      </div>
    )
  );
};
