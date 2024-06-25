// docs: https://ui.shadcn.com/docs/components/data-table

"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getFilteredRowModel,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
  RowData,
} from "@tanstack/react-table";
import { Badge } from "../components/badge";

import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuInboxContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { SearchIcon, XIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs-inbox";
import { SidebarTrigger } from "../SidebarTrigger";
import { cn } from "@/lib/utils";
import { ConversationTag, ConversationWithAllData, Member } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  TagIcon,
  KeyIcon,
  AttributesIcon,
  EyeIcon,
  EyeOffIcon,
  User03Icon,
  BuildingIcon,
  ContrastIcon,
  CheckCircleIcon,
} from "@/components/icons/CustomIcons";
import { FilterPopover } from "../components/FilterPopover";
import { FilterTags } from "../components/filterTags";
import { KeyboardShortcut } from "@/components/custom/KeyBoardShortcut";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { useHotkeys } from "react-hotkeys-hook";
import { AssignMemberComboBox } from "../components/AssignMemberCombobox";

// Add custom properties TableMeta (to let us see if row is hovered (for now))
declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  interface TableMeta<TData extends RowData, TValue> {
    hoverRow: string | null;
  }
}

const AttributesIconMap = {
  "Reservation labels": <ContrastIcon className="size-4 text-icon-tertiary" />,
  "Conversation tags": <TagIcon className="size-4 text-icon-tertiary" />,
  "Listing name": <BuildingIcon className="size-4 text-icon-tertiary" />,
  Assignee: <User03Icon className="size-4 text-icon-tertiary" />,
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  conversationLabels: (ConversationTag & {
    numberOfUses: number;
  })[];
  availableMembers: Member[];
  title: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  conversationLabels,
  availableMembers,
  title,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    {
      id: "messageStatus",
      value: "Todo",
    },
  ]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    messageStatus: false,
    guestName: false,
  });
  const [rowSelection, setRowSelection] = useState({});

  const [currentRowHovered, setCurrentRowHovered] = useState<string | null>(
    null
  );

  // hotkey hooks
  useHotkeys("e", () => handleMarkDone());

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    meta: {
      // Pass a hover value so we can access in columns.tsx
      hoverRow: currentRowHovered,
    },
    initialState: {
      // hide active column - so we can filter by active without showing the column
      columnVisibility: {
        messageStatus: false,
        guestName: false,
      },
    },
  });

  // API: Function to handle mark selected rows as unread
  const handleMarkUnread = () => {
    const count = table.getSelectedRowModel().rows.length;

    // If no rows are selected, return
    if (count === 0) {
      return;
    }

    table.getSelectedRowModel().rows.map((row) => {
      const rowData = row.original as ConversationWithAllData;
      console.log("Mark as unread", rowData);

      // Do something with the rows to mark them as unread

      // Unselect the rows after update (either refresh or this manual way)
      row.toggleSelected(false);
    });

    // Placeholder toast message
    toast.success(`${count} conversations marked as unread`);
  };

  // API: Function to handle mark selected rows as done
  const handleMarkDone = () => {
    const count = table.getSelectedRowModel().rows.length;

    // If no rows are selected, return
    if (count === 0) {
      return;
    }

    table.getSelectedRowModel().rows.map((row) => {
      const rowData = row.original as ConversationWithAllData;
      console.log("Mark as done", rowData);

      // Do something with the rows to mark them as done

      // Unselect the rows after update (either refresh or this manual way)
      row.toggleSelected(false);
    });

    // Placeholder toast message
    toast.success(`${count} conversations marked as done`);
  };

  // API: Placeholder function to assign a member to selected rows
  const handleAssign = (member: Member) => {
    const count = table.getSelectedRowModel().rows.length;

    // If no rows are selected, return
    if (count === 0) {
      return;
    }

    table.getSelectedRowModel().rows.map((row) => {
      const rowData = row.original as ConversationWithAllData;
      console.log("Assign", rowData, "to", member);

      // Do something with the rows to assign them to a member

      // Unselect the rows after update (either refresh or this manual way)
      row.toggleSelected(false);
    });

    // Placeholder toast message
    toast.success(`${count} conversations assigned to ${member.name}`);
  };

  // Function to clear all filters except for search and tab
  const clearFilters = () => {
    columnFilters.forEach((filter) => {
      if (
        // guestName comes from search
        // messageStatus is the tab
        filter.id === "guestName" ||
        filter.id === "messageStatus"
      ) {
        return;
      }
      table.getColumn(filter.id)?.setFilterValue(null);
    });
  };

  const handleTabChange = (tab: "Todo" | "Done") => {
    table.getColumn("messageStatus")?.setFilterValue(tab);
  };

  // Helper for filtering dropdown
  const handleFilterChange = (columnId: string, value: string) => {
    table.getColumn(columnId)?.setFilterValue(value);
  };

  // Function to remove filter tag groups
  const removeFilter = (columnId: string, filterKey: string) => {
    setColumnFilters((prevFilters) =>
      prevFilters.map((filter) => {
        if (
          filter.id === columnId &&
          typeof filter.value === "object" &&
          filter.value !== null
        ) {
          const newValue = { ...(filter.value as Record<string, unknown>) };
          delete newValue[filterKey];
          return { ...filter, value: newValue };
        }
        return filter;
      })
    );
  };

  return (
    <div className="h-full">
      <div className="flex flex-col bg-primary-subtle h-full">
        <div className="flex flex-col gap-[28px] px-8 pt-8 pb-3 border-b border-primary">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <p className="text-title-3xl">{title}</p>
            </div>
            <div className="flex items-center relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </span>
              <Input
                placeholder="Search"
                value={
                  (table.getColumn("guestName")?.getFilterValue() as string) ??
                  ""
                }
                onChange={(event) =>
                  table
                    .getColumn("guestName")
                    ?.setFilterValue(event.target.value)
                }
                className="pl-10 rounded-xl max-w-sm w-[300px]"
              />
            </div>
          </div>

          {/* badges */}
          <div className="flex items-center gap-4">
            {conversationLabels.map((item, index) => {
              return (
                <Badge
                  key={index}
                  id={item.id!}
                  title={item.name}
                  number={item.numberOfUses}
                  subscipton="Outstanding requests"
                  icon={item.iconId}
                  iconType={item.type.color}
                  percentage={-12}
                />
              );
            })}
          </div>

          <div className="flex items-center justify-between">
            <Tabs defaultValue="Todo">
              <TabsList>
                <TabsTrigger
                  value="Todo"
                  onClick={() => handleTabChange("Todo")}
                >
                  <div className="relative">
                    <p className="flex items-center gap-2 h-9 text-title-sm">
                      Todo
                      <span
                        className={cn(
                          "h-6 w-[28px] rounded-lg flex items-center justify-center text-tertiary text-subtitle-xs",
                          table.getColumn("messageStatus")?.getFilterValue() ===
                            "Todo" &&
                            "text-brand text-subtitle-xs bg-primary border border-primary"
                        )}
                      >
                        17
                      </span>
                    </p>
                    {table.getColumn("messageStatus")?.getFilterValue() ===
                      "Todo" && (
                      <div className="h-[3px] mt-3 right-0 left-0 w-full bg-brand absolute" />
                    )}
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="done"
                  onClick={() => handleTabChange("Done")}
                >
                  <div className="relative">
                    <p className="flex items-center h-9 text-title-sm">Done</p>
                    {table.getColumn("messageStatus")?.getFilterValue() ===
                      "Done" && (
                      <div className="h-[3px] mt-3 right-0 left-0 w-full bg-brand absolute" />
                    )}
                  </div>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size={"md"} className="w-fit">
                    <AttributesIcon className="text-icon-secondary size-[15px] mr-2" />
                    Attributes
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuInboxContent align="end">
                  <div className="p-4 flex items-center justify-between w-[284px] border-b border-primary">
                    <p className="text-subtitle-sm">Display attributes</p>
                    <XIcon
                      className="h-4 w-4 text-icon-tertiary hover:text-icon-secondary hover:cursor-pointer"
                      onClick={() => {
                        table
                          .getAllColumns()
                          .filter((column) => column.getCanHide())
                          .map((column) => {
                            column.toggleVisibility(true);
                          });
                      }}
                    />
                  </div>
                  <div className="p-2">
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => {
                        return (
                          <div
                            key={column.id}
                            className="p-2 hover:bg-hover rounded-md cursor-pointer"
                            onClick={() =>
                              column.toggleVisibility(!column.getIsVisible())
                            }
                          >
                            <div className="flex items-center justify-between gap-2 w-full">
                              <div className="flex items-center gap-2">
                                <span className="size-6 flex items-center justify-center">
                                  {
                                    AttributesIconMap[
                                      column.id as keyof typeof AttributesIconMap
                                    ]
                                  }
                                </span>
                                <p className="text-subtitle-xs">{column.id}</p>
                              </div>
                              {column.getIsVisible() ? (
                                <EyeIcon className="size-4 text-icon-tertiary" />
                              ) : (
                                <EyeOffIcon className="size-4 text-icon-tertiary" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </DropdownMenuInboxContent>
              </DropdownMenu>

              <FilterPopover
                columnFilters={columnFilters}
                setColumnFilters={(columnId, value) =>
                  handleFilterChange(columnId, value)
                }
                clearFilters={clearFilters}
              />
            </div>
          </div>
        </div>
        <div className="bg-primary shadow-inner h-full overflow-y-auto">
          <FilterTags
            columnFilters={table.getState().columnFilters}
            clearFilters={clearFilters}
            removeFilter={removeFilter}
          />
          <Table>
            <TableHeader hidden>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onMouseEnter={() => setCurrentRowHovered(row.id)}
                    onMouseLeave={() => setCurrentRowHovered(null)}
                    className={cn(
                      "hover:bg-secondary hover:cursor-pointer",
                      row.getIsSelected() && "bg-selected"
                    )}
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <TableCell
                        className="relative"
                        key={cell.id}
                        style={{
                          textAlign:
                            index === row.getVisibleCells().length - 1
                              ? "right"
                              : "left",
                          // Width 0 for the columns that are only for Attributes
                          width:
                            cell.column.id == "Reservation labels" ||
                            cell.column.id == "Conversation tags" ||
                            cell.column.id == "Listing name" ||
                            cell.column.id == "Assignee"
                              ? "0px"
                              : "",
                          // padding for the first and last cell + Remove padding for the columns that are only for Attributes
                          padding:
                            cell.column.id == "Reservation labels" ||
                            cell.column.id == "Conversation tags" ||
                            cell.column.id == "Listing name" ||
                            cell.column.id == "Assignee"
                              ? "0px"
                              : index === 0 ||
                                index === row.getVisibleCells().length - 1
                              ? "20px 32px"
                              : "20px",
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Row selection popup */}
      <AnimatePresence>
        {table.getSelectedRowModel().rows.length > 0 && (
          <motion.div
            key={"actionBar"}
            className="absolute  bottom-[32px] left-1/2 w-fit shadow-lg rounded-xl bg-primary border border-primary flex items-center text-subtitle-xs"
            initial={{ y: 32, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            exit={{ y: 32, x: "-50%", opacity: 0 }}
          >
            <div className="text-tertiary px-6 py-4 border-r border-primary">
              {table.getSelectedRowModel().rows.length} selected
            </div>
            <div
              className="px-5 py-4 border-r border-primary hover:cursor-pointer hover:bg-hover"
              onClick={() => {
                if (table.getIsAllRowsSelected()) {
                  table.getRowModel().rows.map((row) => {
                    row.toggleSelected(false);
                  });
                } else {
                  table.getRowModel().rows.map((row) => {
                    row.toggleSelected(true);
                  });
                }
              }}
            >
              {table.getIsAllRowsSelected() ? "Unselect all" : "Select all"}
            </div>
            <div
              className="px-5 py-4 border-r border-primary flex items-center gap-2 hover:cursor-pointer hover:bg-hover"
              onClick={() => {
                handleMarkUnread();
              }}
            >
              <div className="size-[14px] rounded-full bg-icon-tertiary"></div>
              <p>Mark as unread</p>
            </div>
            <div
              className="px-5 py-4 border-r border-primary flex items-center gap-3 hover:cursor-pointer hover:bg-hover"
              onClick={() => handleMarkDone()}
            >
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="size-[13px] rounded-full text-icon-tertiary" />
                <p>Mark as done</p>
              </div>
              <KeyboardShortcut shortcut="E" />
            </div>
            <AssignMemberComboBox
              availableMembers={availableMembers}
              onAssign={(member) => {
                handleAssign(member);
              }}
            />

            <div className="px-2">
              <div
                className="size-5 hover:bg-hover hover:cursor-pointer flex items-center justify-center rounded-md"
                onClick={() => {
                  table.getRowModel().rows.map((row) => {
                    row.toggleSelected(false);
                  });
                }}
              >
                <XIcon className="size-3 text-icon-tertiary" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
