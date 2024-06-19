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
} from "@tanstack/react-table";
import { Badge } from "./badge";

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
import { ConversationTag, ReservationLabel } from "@/lib/types";
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
} from "@/components/icons/CustomIcons";

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
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    messageStatus: false,
    guestName: false,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnFilters,
      columnVisibility,
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
              />
            );
          })}
        </div>

        <div className="flex items-center justify-between">
          <Tabs defaultValue="Todo">
            <TabsList>
              <TabsTrigger value="Todo" onClick={() => handleTabChange("Todo")}>
                <div className="relative">
                  <p className="flex items-center gap-2 h-9">
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
                  <p className="flex items-center h-9">Done</p>
                  {table.getColumn("messageStatus")?.getFilterValue() ===
                    "Done" && (
                    <div className="h-[3px] mt-3 right-0 left-0 w-full bg-brand absolute" />
                  )}
                </div>
              </TabsTrigger>
            </TabsList>
          </Tabs>

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
        </div>
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
  );
}
