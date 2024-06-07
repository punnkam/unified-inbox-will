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
import { AddMemberComboBox } from "./AddMemberComboBox";
import { Member, MemberWithDeleteHandler } from "@/lib/types";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<MemberWithDeleteHandler, TValue>[];
  data: MemberWithDeleteHandler[];
  avaliableMembers: Member[];
  onAddMemberToTeam: (member: Member) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  avaliableMembers,
  onAddMemberToTeam,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="w-full flex items-center justify-between mb-[28px]">
        <div className="flex items-center relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </span>
          <Input
            placeholder="Search"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="pl-10 max-w-sm w-[300px]"
          />
        </div>
        <AddMemberComboBox
          avaliableMembers={avaliableMembers}
          onAdd={onAddMemberToTeam}
        />
      </div>
      <div>
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
