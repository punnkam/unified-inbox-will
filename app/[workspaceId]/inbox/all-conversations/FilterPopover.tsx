"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuInboxContent,
} from "@/components/ui/dropdown-menu";
import { ColumnFiltersState } from "@tanstack/react-table";
import { FilterLinesIcon } from "@/components/icons/CustomIcons";
import { XIcon } from "lucide-react";
import { allFilters, AllFilters, FilterValue } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { IconComponent } from "@/components/icons/IconComponent";

type FilterValues = { [key: string]: FilterValue[] };

export const FilterPopover = ({
  columnFilters,
  setColumnFilters,
  clearFilters,
}: {
  columnFilters: ColumnFiltersState;
  setColumnFilters: (columnId: string, value: any) => void;
  clearFilters: () => void;
}) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (
    filter: keyof AllFilters,
    label: FilterValue,
    columnId: string
  ) => {
    // Find the current filter parent and current values for the column
    const currentFilter = columnFilters.find((f) => f.id === columnId)
      ?.value as FilterValues | undefined;

    // Determine the new filter values for the specified filter parent
    const newFilterValues = currentFilter?.[filter]
      ? currentFilter[filter].includes(label)
        ? // If the value is already included, remove it
          currentFilter[filter].filter((item) => item !== label)
        : // If the value is not included, add it
          [...currentFilter[filter], label]
      : // If there are no current filters for this filter parent, start a new array with the label
        [label];

    // Create a new filter object with the updated filter values
    const newFilter = { [filter]: newFilterValues };

    // Update the column filters by merging the current filter object with the new filter object
    setColumnFilters(columnId, { ...currentFilter, ...newFilter });
  };

  return (
    <div>
      <DropdownMenu open={open} onOpenChange={() => setOpen(!open)}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size={"md"} className="w-fit">
            <FilterLinesIcon className="text-icon-secondary size-[15px] mr-2" />
            Filters
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuInboxContent align="end">
          <div className="p-4 flex items-center justify-between w-[284px] border-b border-primary">
            <p className="text-subtitle-sm">Add filter</p>
            <XIcon
              className="h-4 w-4 text-icon-tertiary hover:text-icon-secondary hover:cursor-pointer"
              onClick={() => {
                clearFilters();
                setOpen(false);
              }}
            />
          </div>
          <div className="p-2">
            {Object.keys(allFilters).map((filter) => {
              const filterKey = filter as keyof AllFilters;
              const title = allFilters[filterKey]!.title;
              const icon = allFilters[filterKey]!.icon;
              const columnId = allFilters[filterKey]?.column || "";
              const filterOptions = allFilters[filterKey]!.options;

              const currentFilter = columnFilters.find(
                (appliedFilter) => appliedFilter.id === columnId
              )?.value as FilterValues;
              const selectedCount = currentFilter?.[filterKey]?.length || 0;

              return (
                <DropdownMenuSub key={filterKey}>
                  <DropdownMenuSubTrigger className="p-2 hover:bg-hover rounded-md cursor-pointer">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <span className="size-6 flex items-center justify-center">
                          <IconComponent
                            icon={icon}
                            classNames="text-icon-tertiary size-[15px]"
                          />
                        </span>
                        <p className="text-subtitle-xs">{title}</p>
                      </div>
                      {selectedCount > 0 && (
                        <span className="text-subtitle-2xs text-disabled">
                          {selectedCount} selected
                        </span>
                      )}
                    </div>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="p-0">
                    <Command>
                      <CommandInput
                        placeholder={`Search ${title.toLowerCase()}`}
                        autoFocus={true}
                      />
                      <CommandList>
                        <CommandEmpty>No label found.</CommandEmpty>
                        <CommandGroup>
                          {filterOptions.map((label) => {
                            // check if label & data is an object (ugly typscript)

                            const checked = (
                              currentFilter?.[filterKey] as FilterValue[]
                            )?.some((item: FilterValue) => {
                              if (
                                typeof item !== "string" &&
                                typeof item !== "number"
                              ) {
                                return item.id === label.id;
                              }
                            });

                            return (
                              <CommandItem
                                key={label.id!}
                                value={label.name}
                                onSelect={() =>
                                  handleSelect(filterKey, label, columnId)
                                }
                                className="flex items-center gap-2 text-subtitle-sm hover:cursor-pointer"
                              >
                                <Checkbox checked={checked} />
                                <img
                                  src={label.image}
                                  className="w-6 h-6 rounded-full object-cover"
                                />
                                {label.name}
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              );
            })}
          </div>
        </DropdownMenuInboxContent>
      </DropdownMenu>
    </div>
  );
};
