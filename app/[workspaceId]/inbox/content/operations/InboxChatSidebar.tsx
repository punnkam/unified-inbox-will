// docs: https://ui.shadcn.com/docs/components/data-table

"use client";

import {
  flexRender,
  getFilteredRowModel,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs-inbox";
import { cn } from "@/lib/utils";
import { ArrowNarrowLeft } from "@/components/icons/CustomIcons";
import { FilterPopover } from "../components/FilterPopover";
import { FilterTags } from "../components/filterTags";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import {
  handleFilterChange,
  handleTabChange,
  removeFilter,
  clearFilters,
} from "@/lib/tableUtils";
import { useTableContext } from "../../TableContext";
import Link from "next/link";
import { columns } from "./columns";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { mockConversationData } from "@/lib/realDataSchema";

export const InboxChatSidebar = () => {
  const [currentRowHovered, setCurrentRowHovered] = useState<string | null>(
    null
  );

  // Read our table context
  const { columnFilters, setColumnFilters, setView, data, setData } =
    useTableContext();

  // TODO: need to add some sort of data fetch here or in a parent incase user directly goes to this link
  useEffect(() => {
    if (!data || data.length == 0) {
      setData(mockConversationData);
    }

    console.log(data);
  }, []);

  // Use useEffect to update the context view
  useEffect(() => {
    // update the context view so we can handle loading states and sidebar
    setView("chat");
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

  return (
    <div className="h-screen flex flex-col justify-between bg-primary-subtle w-[calc(100vw-74px)] md:w-[300px] md:min-w-[300px] border-e border-primary overflow-clip">
      <div
        className="flex flex-col gap-5 bg-primary-subtle px-5 pt-8 pb-3 border-b border-primary z-10"
        style={{ boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.05)" }}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-2 items-center">
            <Link
              className="size-5 flex items-center justify-center hover:bg-hover rouneded-xl"
              href="./all-conversations"
              // TODO: this is hardocded to go back to all convos
            >
              <ArrowNarrowLeft className="text-icon-secondary size-3" />
            </Link>
            <h2 className="text-title-lg">All Conversations</h2>
          </div>
          <div className="relative">
            <FilterPopover
              columnFilters={columnFilters}
              setColumnFilters={(columnId, value) =>
                handleFilterChange(table, columnId, value)
              }
              clearFilters={clearFilters}
              table={table}
              view="chat"
            />
            <FilterTags
              clearFilters={clearFilters}
              removeFilter={removeFilter}
              table={table}
              view="chat"
            />
          </div>
        </div>

        <div className="flex items-center relative w-full">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </span>
          <Input
            placeholder="Search"
            value={
              (table.getColumn("guestName")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("guestName")?.setFilterValue(event.target.value)
            }
            className="pl-10 rounded-xl w-full"
          />
        </div>

        <div className="flex items-center justify-between">
          <Tabs defaultValue="Todo">
            <TabsList>
              <TabsTrigger
                value="Todo"
                onClick={() => handleTabChange(table, false)}
              >
                <div className="relative">
                  <p
                    className={clsx(
                      "flex items-center gap-2 h-9 text-title-sm",
                      // Add active styles
                      table.getColumn("messageStatus")?.getFilterValue() ===
                        false && "text-brand"
                    )}
                  >
                    Todo
                    <span
                      className={cn(
                        "h-6 w-[28px] rounded-lg flex items-center justify-center text-tertiary text-subtitle-xs",
                        table.getColumn("messageStatus")?.getFilterValue() ===
                          false &&
                          "text-brand text-subtitle-xs bg-primary border border-primary"
                      )}
                    >
                      17
                    </span>
                  </p>
                  {table.getColumn("messageStatus")?.getFilterValue() ===
                    false && (
                    <div className="h-[3px] mt-[11px] right-0 left-0 w-full bg-brand absolute z-10" />
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
                    <div className="h-[3px] mt-[11px] right-0 left-0 w-full bg-brand absolute z-10" />
                  )}
                </div>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <ScrollArea className="bg-primary flex-grow overflow-y-auto">
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
                        width: cell.column.id != "user" ? "0px" : "300px",
                        padding: "0px",
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
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
};
