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
import { XIcon, ChevronLeft, ChevronRight } from "lucide-react";
import {
  allFilters,
  AllFilters,
  FilterValue,
  optionWithData,
  FilterValues,
} from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { IconComponent } from "@/components/icons/IconComponent";
import { handleSelect } from "@/lib/utils";

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
  const [listingsStep, setListingsStep] = useState<"listings" | "group">(
    "listings"
  );
  const [selectedGroup, setSelectedGroup] = useState<optionWithData | null>(
    null
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
                      <Pin02Icon className="text-icon-tertiary size-3" />
                    </span>
                    <p className="text-subtitle-xs">Pinned filters</p>
                  </div>
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="p-0 w-[248px]">
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
                                  const columnId =
                                    allFilters[
                                      pinnedCategory as keyof AllFilters
                                    ]!.column;

                                  const currentFilter = columnFilters.find(
                                    (appliedFilter) =>
                                      appliedFilter.id === columnId
                                  )?.value as FilterValues;

                                  const isChecked = currentFilter?.[
                                    pinnedCategory as keyof FilterValues
                                  ]?.some((item) => item.id === filter.id);

                                  return (
                                    <CommandItem
                                      key={filter.id!}
                                      value={filter.name}
                                      className="flex items-center justify-between gap-2 p-2"
                                    >
                                      <div className="flex items-center gap-2 text-subtitle-xs hover:cursor-pointer truncate">
                                        <Checkbox
                                          checked={isChecked}
                                          onCheckedChange={() => {
                                            handleSelect({
                                              filter:
                                                pinnedCategory as keyof AllFilters,
                                              label: filter,
                                              columnId,
                                              columnFilters,
                                              setColumnFilters,
                                            });
                                          }}
                                        />
                                        {filter.icon && (
                                          <div className="flex items-center justify-center size-6">
                                            <IconComponent
                                              icon={filter.icon}
                                              classNames="text-icon-tertiary size-3"
                                            />
                                          </div>
                                        )}

                                        {filter.image && (
                                          <img
                                            src={filter.image}
                                            className="w-6 h-6 rounded-full object-cover"
                                          />
                                        )}
                                        <p className="truncate">
                                          {filter.name}
                                        </p>
                                      </div>
                                      <Pin02Icon
                                        className="text-icon-tertiary size-3 hover:cursor-pointer fill-icon-tertiary"
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

              // dont show the listing groups in popover
              if (filterKey === "listingGroups") {
                return null;
              }

              if (filterKey === "listings") {
                return (
                  <DropdownMenuSub
                    key={filterKey}
                    // when closed/opened reset state to start back at all listings
                    onOpenChange={() => {
                      setListingsStep("listings");
                      setSelectedGroup(null);
                    }}
                  >
                    <DropdownMenuSubTrigger className="p-2 hover:bg-hover rounded-md cursor-pointer">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span className="size-6 flex items-center justify-center">
                            <IconComponent
                              icon={icon}
                              classNames="text-icon-tertiary size-3"
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
                    <DropdownMenuSubContent className="p-0 w-[248px]">
                      {listingsStep === "listings" ? (
                        // if we are in the listings step, show all listings
                        <Command>
                          <CommandInput
                            placeholder={`Search ${title.toLowerCase()}`}
                            autoFocus={true}
                          />
                          <CommandList>
                            <CommandEmpty>No filter found.</CommandEmpty>
                            <CommandGroup>
                              <div
                                className="text-subtitle-xs hover:bg-hover w-full p-2 cursor-pointer rounded-md flex items-center justify-between gap-2 h-10"
                                onClick={() => {
                                  setListingsStep("group");
                                  setSelectedGroup(null);
                                }}
                              >
                                <div>Listing groups</div>
                                <ChevronRight className="h-4 w-4 text-icon-disabled" />
                              </div>

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
                                    className="flex items-center justify-between group gap-2"
                                  >
                                    <div className="flex items-center gap-2 text-subtitle-xs truncate">
                                      <Checkbox
                                        checked={checked}
                                        onCheckedChange={() =>
                                          handleSelect({
                                            filter: filterKey,
                                            label: label,
                                            columnId,
                                            columnFilters,
                                            setColumnFilters,
                                          })
                                        }
                                      />
                                      {label.icon && (
                                        <div className="flex items-center justify-center size-6">
                                          <IconComponent
                                            icon={label.icon}
                                            classNames="text-icon-tertiary size-3"
                                          />
                                        </div>
                                      )}

                                      {label.image && (
                                        <img
                                          src={label.image}
                                          className="w-6 h-6 min-h-6 min-w-6 rounded-full object-cover"
                                        />
                                      )}
                                      <p className="truncate">{label.name}</p>
                                    </div>
                                    <Pin02Icon
                                      className={`${
                                        pinned[filterKey]?.some(
                                          (item) => item.id === label.id
                                        )
                                          ? "fill-icon-tertiary"
                                          : "hidden group-hover:block"
                                      } text-icon-tertiary size-3 hover:cursor-pointer`}
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
                      ) : !selectedGroup ? (
                        // if we are in the group step (and no group selected), show all groups
                        <Command>
                          <CommandInput
                            placeholder={`Search groups`}
                            autoFocus={true}
                          />
                          <CommandList>
                            <CommandEmpty>No filter found.</CommandEmpty>
                            <CommandGroup>
                              <div
                                className="text-subtitle-xs hover:bg-hover w-full p-2 cursor-pointer rounded-md flex items-center gap-2 h-10"
                                onClick={() => setListingsStep("listings")}
                              >
                                <ChevronLeft className="h-4 w-4 text-icon-disabled" />
                                <div>All Listings</div>
                              </div>
                              {allFilters.listingGroups?.options.map(
                                (group) => {
                                  const isChecked = (item: FilterValue) => {
                                    if (
                                      typeof item === "object" &&
                                      typeof group === "object"
                                    ) {
                                      return item.id === group.id;
                                    }
                                    return item === group;
                                  };

                                  const checked =
                                    currentFilter?.listingGroups?.length > 0 &&
                                    currentFilter?.listingGroups?.some(
                                      isChecked
                                    );

                                  return (
                                    <CommandItem
                                      key={group.id}
                                      value={group.name}
                                      onSelect={() => {
                                        setListingsStep("group");
                                        setSelectedGroup(group);
                                      }}
                                      className="flex items-center justify-between gap-2 text-subtitle-xs truncate cursor-pointer"
                                    >
                                      <div className="flex items-center gap-2 text-subtitle-xs truncate">
                                        <Checkbox
                                          checked={checked}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleSelect({
                                              filter: "listingGroups",
                                              label: group,
                                              columnId,
                                              columnFilters,
                                              setColumnFilters,
                                            });
                                          }}
                                        />

                                        {group.icon && (
                                          <div className="flex items-center justify-center size-6">
                                            <IconComponent
                                              icon={group.icon}
                                              classNames="text-icon-tertiary size-3"
                                            />
                                          </div>
                                        )}
                                        <p className="truncate">{group.name}</p>
                                      </div>
                                      <ChevronRight className="h-4 w-4 text-icon-disabled" />
                                    </CommandItem>
                                  );
                                }
                              )}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      ) : (
                        // if we are in the group step with a group selected, show listings in group
                        <Command>
                          <CommandInput
                            placeholder={`Search ${selectedGroup.name}`}
                            autoFocus={true}
                          />
                          <CommandList>
                            <CommandEmpty>No filter found.</CommandEmpty>
                            <CommandGroup>
                              <div
                                className="text-subtitle-xs hover:bg-hover w-full p-2 cursor-pointer rounded-md flex items-center gap-2 h-10"
                                onClick={() => {
                                  setListingsStep("group");
                                  setSelectedGroup(null);
                                }}
                              >
                                <ChevronLeft className="h-4 w-4 text-icon-disabled" />
                                <div>All groups</div>
                              </div>

                              {filterOptions
                                .filter((label) => {
                                  if (selectedGroup === null) return true;
                                  return label.groupId === selectedGroup.id;
                                })
                                .map((label) => {
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
                                      className="flex items-center justify-between group gap-2 "
                                    >
                                      <div className="flex items-center gap-2 text-subtitle-xs truncate">
                                        <Checkbox
                                          checked={checked}
                                          onCheckedChange={() =>
                                            handleSelect({
                                              filter: filterKey,
                                              label: label,
                                              columnId,
                                              columnFilters,
                                              setColumnFilters,
                                            })
                                          }
                                        />
                                        {label.icon && (
                                          <div className="flex items-center justify-center size-6">
                                            <IconComponent
                                              icon={label.icon}
                                              classNames="text-icon-tertiary size-3"
                                            />
                                          </div>
                                        )}

                                        {label.image && (
                                          <img
                                            src={label.image}
                                            className="w-6 h-6 min-h-6 min-w-6 rounded-full object-cover"
                                          />
                                        )}
                                        <p className="truncate">{label.name}</p>
                                      </div>
                                      <Pin02Icon
                                        className={`${
                                          pinned[filterKey]?.some(
                                            (item) => item.id === label.id
                                          )
                                            ? "fill-icon-tertiary"
                                            : "hidden group-hover:block"
                                        } text-icon-tertiary size-3 hover:cursor-pointer`}
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
                      )}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                );
              }

              return (
                <DropdownMenuSub key={filterKey}>
                  <DropdownMenuSubTrigger className="p-2 hover:bg-hover rounded-md cursor-pointer">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <span className="size-6 flex items-center justify-center">
                          <IconComponent
                            icon={icon}
                            classNames="text-icon-tertiary size-3"
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
                  <DropdownMenuSubContent className="p-0 w-[248px]">
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
                                className="flex items-center justify-between group gap-2"
                              >
                                <div className="flex items-center gap-2 text-subtitle-xs truncate">
                                  <Checkbox
                                    checked={checked}
                                    onCheckedChange={() =>
                                      handleSelect({
                                        filter: filterKey,
                                        label: label,
                                        columnId,
                                        columnFilters,
                                        setColumnFilters,
                                      })
                                    }
                                  />
                                  {label.icon && (
                                    <div className="flex items-center justify-center size-6">
                                      <IconComponent
                                        icon={label.icon}
                                        classNames="text-icon-tertiary size-3"
                                      />
                                    </div>
                                  )}

                                  {label.image && (
                                    <img
                                      src={label.image}
                                      className="w-6 h-6 rounded-full object-cover"
                                    />
                                  )}
                                  <p className="truncate">{label.name}</p>
                                </div>
                                <Pin02Icon
                                  className={`${
                                    pinned[filterKey]?.some(
                                      (item) => item.id === label.id
                                    )
                                      ? "fill-icon-tertiary"
                                      : "hidden group-hover:block"
                                  } text-icon-tertiary size-3 hover:cursor-pointer`}
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
