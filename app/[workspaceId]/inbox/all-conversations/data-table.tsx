// docs: https://ui.shadcn.com/docs/components/data-table

"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getFilteredRowModel,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Badge } from "./badge";

import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs-inbox";
import { SidebarTrigger } from "../SidebarTrigger";
import { cn } from "@/lib/utils";
import { ConversationTag, ReservationLabel } from "@/lib/types";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  conversationLabels: (ConversationTag & {
    numberOfUses: number;
  })[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  conversationLabels,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    {
      id: "messageStatus",
      value: "Todo",
    },
  ]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
    initialState: {
      // hide active column - so we can filter by active without showing the column
      columnVisibility: {
        messageStatus: false,
        guestName: false,
      },
    },
  });

  const handleTabChange = (tab: "Todo" | "Done") => {
    table.getColumn("messageStatus")?.setFilterValue(tab);
  };

  return (
    <div className="flex flex-col bg-primary-subtle">
      <div className="flex flex-col gap-[28px] px-8 pt-8 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <p className="text-title-3xl">All conversations</p>
          </div>
          <div className="flex items-center relative">
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
              className="pl-10 max-w-sm w-[300px]"
            />
          </div>
        </div>

        {/* badges */}
        <div className="flex items-center gap-4">
          {conversationLabels.map((item, index) => {
            return (
              <Badge
                key={index}
                title={item.name}
                number={item.numberOfUses}
                subscipton="Outstanding requests"
                icon={item.iconId}
                iconType={item.type.color}
              />
            );
          })}
        </div>

        <Tabs defaultValue="Todo" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="Todo" onClick={() => handleTabChange("Todo")}>
              <div className="relative">
                <p className="flex items-center gap-2">
                  Todo
                  <span
                    className={cn(
                      "bg-hover size-6 rounded-lg flex items-center justify-center text-tertiary text-subtitle-2xs",
                      table.getColumn("messageStatus")?.getFilterValue() ===
                        "Todo" && "text-brand text-subtitle-2xs"
                    )}
                  >
                    17
                  </span>
                </p>
                {table.getColumn("messageStatus")?.getFilterValue() ===
                  "Todo" && (
                  <div className="h-[3px] mt-[9px] right-0 left-0 w-full bg-brand absolute" />
                )}
              </div>
            </TabsTrigger>
            <TabsTrigger value="done" onClick={() => handleTabChange("Done")}>
              <div className="relative">
                <p>Done</p>
                {table.getColumn("messageStatus")?.getFilterValue() ===
                  "Done" && (
                  <div className="h-[3px] mt-3 right-0 left-0 w-full bg-brand absolute" />
                )}
              </div>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="bg-primary">
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
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        textAlign:
                          index === row.getVisibleCells().length - 1
                            ? "right"
                            : "left",
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
  );
}
