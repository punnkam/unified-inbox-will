import { ColumnFiltersState } from "@tanstack/react-table";
import { AllFilters, FilterValue, allFilters } from "@/lib/realDataSchema";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { IconComponent } from "@/components/icons/IconComponent";
import { ConversationTable } from "@/lib/realDataSchema";
import { Dispatch, SetStateAction } from "react";
import { useTableContext } from "../../TableContext";

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
    <div
      className="flex gap-1 justify-center items-center text-link border border-info rounded-full px-3 "
      style={{ backgroundColor: "rgba(241, 246, 255, 0.5)" }}
    >
      <IconComponent icon={icon} classNames="size-3 text-info mr-[2px]" />
      <div className="flex items-center gap-[4px] whitespace-nowrap">
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
  clearFilters,
  removeFilter,
  table,
  view,
}: {
  clearFilters: (
    table: ConversationTable,
    columnFilters: ColumnFiltersState
  ) => void;
  removeFilter: (
    columnId: string,
    filterKey: string,
    setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>
  ) => void;
  table: ConversationTable;
  view?: "landing" | "chat";
}) => {
  const { columnFilters, setColumnFilters } = useTableContext();

  // Check if any of the filters should be displayed as tags (if not remove excess padding)
  const hasTags = columnFilters.some(
    (filter) =>
      typeof filter.value === "object" &&
      filter.value !== null &&
      Object.keys(filter.value).length > 0 &&
      Object.values(filter.value).some((filterValue) => filterValue.length > 0)
  );

  const filterCount = columnFilters.reduce((count, filter) => {
    if (typeof filter.value === "object" && filter.value !== null) {
      return (
        count +
        Object.values(filter.value).reduce(
          (subCount, filterValue) => subCount + filterValue.length,
          0
        )
      );
    }
    return count;
  }, 0);

  return (
    <>
      {view === "chat" && filterCount > 0 ? (
        <div className="absolute top-[1px] right-[2px] flex items-center justify-center size-[14px] border border-white rounded-full bg-icon-active text-primary-inverse text-[8px] font-medium">
          {filterCount}
        </div>
      ) : (
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
                        onRemove={() =>
                          removeFilter(filter.id, key, setColumnFilters)
                        }
                      />
                    );
                  }
                  return null;
                });
              }
              return null;
            })}

            <Button
              variant="ghost"
              size={"sm"}
              onClick={() => clearFilters(table, columnFilters)}
            >
              <p className="text-secondary text-subtitle-sm">Clear All</p>
            </Button>
          </div>
        )
      )}
    </>
  );
};
