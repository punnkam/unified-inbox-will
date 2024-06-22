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
import { FilterLinesIcon, Pin02Icon } from "@/components/icons/CustomIcons";
import { XIcon } from "lucide-react";
import { allFilters, AllFilters, FilterValue } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
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
  const [pinned, setPinned] = useState<FilterValues>({});
  const [filterTitles, setFilterTitles] = useState<{ [key: string]: string }>(
    {}
  );

  // Find/Set the pinned filters on mount - to avoid infinate rerenders
  useEffect(() => {
    const pinnedFilters: FilterValues = {};
    const titles: { [key: string]: string } = {};

    Object.entries(allFilters).forEach(([key, filter]) => {
      titles[key] = filter.title;
      filter.options.forEach((option) => {
        if (typeof option === "object" && option.pinned) {
          if (!pinnedFilters[key]) {
            pinnedFilters[key] = [];
          }
          pinnedFilters[key].push(option);
        }
      });
    });

    setPinned(pinnedFilters);
    setFilterTitles(titles);
  }, []);

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

  // updates the local state for pinned filters - you would also want to call a backend here to save the pin
  const handlePinToggle = (filterId: string, label: FilterValue) => {
    setPinned((prevPinned) => {
      const updatedPinned = { ...prevPinned };
      if (!updatedPinned[filterId]) {
        updatedPinned[filterId] = [];
      }
      const isPinned = updatedPinned[filterId].some(
        (item) => item.id === label.id
      );
      if (isPinned) {
        updatedPinned[filterId] = updatedPinned[filterId].filter(
          (item) => item.id !== label.id
        );
      } else {
        updatedPinned[filterId].push(label);
      }
      return updatedPinned;
    });
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
            <DropdownMenuSub key="pinned">
              <DropdownMenuSubTrigger className="p-2 hover:bg-hover rounded-md cursor-pointer">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <span className="size-6 flex items-center justify-center">
                      <Pin02Icon className="text-icon-tertiary size-[15px]" />
                    </span>
                    <p className="text-subtitle-xs">Pinned filters</p>
                  </div>
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="p-0">
                <Command>
                  <CommandInput
                    placeholder={`Search pinned`}
                    autoFocus={true}
                  />
                  <CommandList>
                    <CommandEmpty>No pinned filters.</CommandEmpty>
                    <CommandGroup className="py-0">
                      {pinned &&
                        Object.entries(pinned).map(
                          ([pinnedCategory, filters]) =>
                            filters.length > 0 && (
                              <div
                                key={pinnedCategory}
                                className="flex flex-col gap-1 pt-2 pb-[10px]"
                              >
                                <p className="text-body-3xs text-tertiary px-2">
                                  {filterTitles[pinnedCategory]}
                                </p>
                                {filters.map((filter) => {
                                  // Get the column Id
                                  const columnId =
                                    allFilters[
                                      pinnedCategory as keyof AllFilters
                                    ]!.column;

                                  const currentFilter = columnFilters.find(
                                    (appliedFilter) =>
                                      appliedFilter.id === columnId
                                  )?.value as FilterValues;

                                  // Check if the filter is already applied
                                  const isChecked = currentFilter?.[
                                    pinnedCategory as keyof FilterValues
                                  ]?.some((item) => item.id === filter.id);

                                  return (
                                    <CommandItem
                                      key={filter.id!}
                                      value={filter.name}
                                      onSelect={() =>
                                        handleSelect(
                                          pinnedCategory as keyof AllFilters,
                                          filter,
                                          columnId
                                        )
                                      }
                                      className="flex items-center justify-between"
                                    >
                                      <div className="flex items-center gap-2 text-subtitle-sm hover:cursor-pointer">
                                        <Checkbox checked={isChecked} />
                                        {filter.image && (
                                          <img
                                            src={filter.image}
                                            className="w-6 h-6 rounded-full object-cover"
                                          />
                                        )}
                                        {filter.name}
                                      </div>
                                      <Pin02Icon
                                        className="text-icon-tertiary size-[15px] hover:cursor-pointer fill-icon-tertiary"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handlePinToggle(
                                            pinnedCategory,
                                            filter
                                          );
                                        }}
                                      />
                                    </CommandItem>
                                  );
                                })}
                              </div>
                            )
                        )}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

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
                        <CommandEmpty>No filter found.</CommandEmpty>
                        <CommandGroup>
                          {filterOptions.map((label) => {
                            const isChecked = (item: FilterValue) => {
                              if (
                                typeof item === "object" &&
                                typeof label === "object"
                              ) {
                                return item.id === label.id;
                              }
                              return item === label;
                            };
                            const checked =
                              currentFilter?.[filterKey]?.some(isChecked);

                            return (
                              <CommandItem
                                key={label.id!}
                                value={label.name}
                                onSelect={() =>
                                  handleSelect(filterKey, label, columnId)
                                }
                                className="flex items-center justify-between group"
                              >
                                <div className="flex items-center gap-2 text-subtitle-sm hover:cursor-pointer">
                                  <Checkbox checked={checked} />
                                  {label.image && (
                                    <img
                                      src={label.image}
                                      className="w-6 h-6 rounded-full object-cover"
                                    />
                                  )}
                                  {label.name}
                                </div>
                                <Pin02Icon
                                  className={`${
                                    pinned[filterKey]?.some(
                                      (item) => item.id === label.id
                                    )
                                      ? "fill-icon-tertiary"
                                      : "hidden group-hover:block"
                                  } text-icon-tertiary size-[15px] hover:cursor-pointer`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handlePinToggle(filterKey, label);
                                  }}
                                />
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
