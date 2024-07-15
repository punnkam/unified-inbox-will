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
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SearchIcon, XIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs-inbox";
import { SidebarTrigger } from "../../SidebarTrigger";
import { cn } from "@/lib/utils";
import { Conversation, ConversationTag, Member } from "@/lib/realDataSchema";
import { Button } from "@/components/ui/button";
import {
  TagIcon,
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
import { useHotkeys } from "react-hotkeys-hook";
import { AssignMemberComboBox } from "../components/AssignMemberCombobox";
import clsx from "clsx";
import CountBadge from "@/components/custom/CountBadge";
import { useRouter } from "next/navigation";
import {
  handleMarkDone,
  handleAssign,
  handleFilterChange,
  handleMarkUnread,
  handleSelect,
  handleTabChange,
  removeFilter,
  clearFilters,
} from "@/lib/tableUtils";
import { useTableContext } from "../../TableContext";

const AttributesIconMap = {
  "Reservation labels": <ContrastIcon className="size-4 text-icon-tertiary" />,
  "Conversation tags": <TagIcon className="size-4 text-icon-tertiary" />,
  "Listing name": <BuildingIcon className="size-4 text-icon-tertiary" />,
  Assignee: <User03Icon className="size-4 text-icon-tertiary" />,
};

declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  interface TableMeta<TData extends RowData> {
    hoverRow: string | null;
  }
}

export const InboxLandingView = ({
  title,
  conversationLabels,
  availableMembers,
  columns,
  data,
  conversationPath,
}: {
  title: string;
  conversationLabels: (ConversationTag & {
    numberOfUses: number;
  })[];
  availableMembers: Member[];
  columns: ColumnDef<Conversation>[];
  data: Conversation[];
  conversationPath?: string;
}) => {
  const [currentRowHovered, setCurrentRowHovered] = useState<string | null>(
    null
  );

  const [attributesOpen, setAttributesOpen] = useState(false);

  const { columnFilters, setColumnFilters, setView, setData, setColumns } =
    useTableContext();

  // Use useEffect to update the context view
  useEffect(() => {
    // update the context view so we can handle loading states and sidebar
    setView("landing");
    setData(data);
    setColumns(columns);
  }, [setView]);

  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
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

  // hotkey hooks
  useHotkeys("e", () => handleMarkDone(table));

  return (
    <div className="h-full">
      <div className="flex flex-col bg-primary-subtle h-full">
        <div className="flex flex-col gap-[28px] px-4 md:px-8 pt-8 pb-3 border-b border-primary overflow-y-hidden md:overflow-y-clip">
          <div className="flex flex-wrap md:flex-nowrap gap-2 items-center justify-between">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <p className="text-title-3xl text-nowrap">{title}</p>
            </div>
            <div className="flex items-center relative w-full sm:w-fit">
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
                className="pl-10 rounded-xl w-full md:max-w-sm md:w-[300px] h-12"
              />
            </div>
          </div>

          {/* badges */}
          {conversationLabels.length > 0 && (
            <div className="flex flex-col md:flex-row md:flex-nowrap overflow-y-auto md:overflow-y-clip md:overflow-x-auto px-1 md:py-1 md:px-0 md:h-fit">
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
                    setColumnFilters={(columnId, value) =>
                      handleFilterChange(table, columnId, value)
                    }
                    columnFilters={columnFilters}
                    className={
                      conversationLabels.length < 4
                        ? index === 0
                          ? "md:pl-0 md:min-w-[33.3%] md:w-1/3"
                          : index === conversationLabels.length - 1
                          ? "md:pr-0 md:min-w-[33.3%] md:w-1/3"
                          : "md:min-w-[33.3%] md:w-1/3"
                        : index === 0
                        ? "md:pl-0 md:min-w-[25%] md:w-1/4"
                        : index === conversationLabels.length - 1
                        ? "md:pr-0 md:min-w-[25%] md:w-1/4"
                        : "md:min-w-[25%] md:w-1/4"
                    }
                  />
                );
              })}
            </div>
          )}

          <div className="flex items-center justify-between">
            <Tabs defaultValue="Todo">
              <TabsList>
                <TabsTrigger
                  value="Todo"
                  onClick={() => handleTabChange(table, false)}
                >
                  <div className="relative">
                    <div
                      className={clsx(
                        "flex items-center gap-2 h-9 text-title-sm",
                        // Add active styles
                        table.getColumn("messageStatus")?.getFilterValue() ===
                          false && "text-brand"
                      )}
                    >
                      Todo
                      <CountBadge
                        count={17}
                        selected={
                          table.getColumn("messageStatus")?.getFilterValue() ===
                          false
                        }
                      />
                    </div>
                    {table.getColumn("messageStatus")?.getFilterValue() ===
                      false && (
                      <div className="h-[3px] mt-[11px] right-0 left-0 w-full bg-brand absolute" />
                    )}
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="done"
                  onClick={() => handleTabChange(table, true)}
                >
                  <div className="relative">
                    <p
                      className={clsx(
                        "flex items-center h-9 text-title-sm",
                        // Add active styles
                        table.getColumn("messageStatus")?.getFilterValue() ===
                          true && "text-brand"
                      )}
                    >
                      Done
                    </p>
                    {table.getColumn("messageStatus")?.getFilterValue() ===
                      true && (
                      <div className="h-[3px] mt-[11px] right-0 left-0 w-full bg-brand absolute" />
                    )}
                  </div>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              <DropdownMenu
                open={attributesOpen}
                onOpenChange={() => setAttributesOpen(!attributesOpen)}
              >
                <DropdownMenuTrigger asChild className="flex md:hidden">
                  <Button variant="ghost" size={"icon"} className="w-fit">
                    <AttributesIcon className="text-icon-secondary size-[15px] mr-2" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuTrigger asChild className="hidden md:flex">
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
                        setAttributesOpen(false);
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
                            className={cn(
                              "p-2 hover:bg-hover rounded-md cursor-pointer",
                              !column.getIsVisible() && "opacity-50"
                            )}
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
                  handleFilterChange(table, columnId, value)
                }
                clearFilters={clearFilters}
                table={table}
              />
            </div>
          </div>
        </div>
        <div
          className="bg-primary h-full overflow-y-auto"
          style={{ boxShadow: "inset 0 14px 10px -6px rgba(0, 0, 0, 0.03)" }}
        >
          <FilterTags
            clearFilters={clearFilters}
            removeFilter={removeFilter}
            table={table}
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
                    onClick={() => {
                      // This is ugly way to navigate but what people recommend
                      router.push(`./chat?c=${row.original.id}`);
                    }}
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
                              : index === 0
                              ? "20px 10px 20px 32px"
                              : index === row.getVisibleCells().length - 1
                              ? "20px 32px 20px 10px"
                              : "20px 10px",
                          maxWidth: cell.column.columnDef.size,
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
            className="absolute  bottom-[40px] left-1/2 w-fit rounded-xl bg-primary border border-secondary flex items-center text-subtitle-xs"
            style={{ boxShadow: "0px 4px 30px 0px rgba(0, 0, 0, 0.25)" }}
            initial={{ y: 32, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            exit={{ y: 32, x: "-50%", opacity: 0 }}
          >
            <div className="text-tertiary px-6 py-4 border-r border-primary whitespace-nowrap">
              {table.getSelectedRowModel().rows.length} selected
            </div>
            <div
              className="px-5 py-4 border-r border-primary whitespace-nowrap hover:cursor-pointer hover:bg-hover"
              onClick={() => {
                if (
                  table.getFilteredSelectedRowModel().rows.length ===
                  table.getFilteredRowModel().rows.length
                ) {
                  table.getFilteredRowModel().rows.map((row) => {
                    row.toggleSelected(false);
                  });
                } else {
                  table.getFilteredRowModel().rows.forEach((row) => {
                    row.toggleSelected(true);
                  });
                }
              }}
            >
              {table.getIsAllRowsSelected() ? "Unselect all" : "Select all"}
            </div>
            <div
              className="px-5 py-4 border-r border-primary flex items-center gap-2 whitespace-nowrap hover:cursor-pointer hover:bg-hover"
              onClick={() => {
                handleMarkUnread(table);
              }}
            >
              <div className="size-[14px] rounded-full bg-icon-tertiary"></div>
              <p>Mark as unread</p>
            </div>
            <div
              className="px-5 py-4 border-r border-primary flex items-center gap-3 hover:cursor-pointer hover:bg-hover"
              onClick={() => handleMarkDone(table)}
            >
              <div className="flex items-center gap-2 whitespace-nowrap">
                <CheckCircleIcon className="size-[13px] rounded-full text-icon-tertiary" />
                <p>Mark as done</p>
              </div>
              <KeyboardShortcut shortcut="E" />
            </div>
            <AssignMemberComboBox
              availableMembers={availableMembers}
              onAssign={(member) => {
                handleAssign(table, member);
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
};
