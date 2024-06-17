// docs: https://ui.shadcn.com/docs/components/data-table

"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getFilteredRowModel,
  getCoreRowModel,
  useReactTable,
  RowSelectionState,
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Listing } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { saveAutopilotListings } from "@/app/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: Listing[];
  groups: number[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  groups,
}: DataTableProps<Listing, TValue>) {
  // set intiial selected rows from the data that has autopilot enabled
  const selectedRows = data.reduce((acc: { [key: string]: any }, row) => {
    acc[row.id.toString()] = row.autopilot;
    return acc;
  }, {});

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] =
    useState<RowSelectionState>(selectedRows);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => row.id.toString(),
    state: {
      columnFilters,
      rowSelection,
    },
    initialState: {
      // hide group column - so we can filter by group without showing the column
      columnVisibility: {
        group: false,
      },
    },
  });

  const handleTabChange = (tab: number) => {
    if (tab == -1) {
      table.getColumn("group")?.setFilterValue(undefined);
    } else {
      table.getColumn("group")?.setFilterValue(tab.toString());
    }
  };

  const handleSaveChanges = async (listings: Listing[]) => {
    setLoading(true);
    const response = await saveAutopilotListings(listings);

    if (response) {
      toast.success("Updated AI Listings");

      // refresh to load new data + update Autopilot off/on message
      router.refresh();
    } else {
      toast.error("Failed to save changes.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex items-center relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </span>
        <Input
          placeholder="Search"
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="pl-10 max-w-sm w-[300px]"
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="w-full flex justify-between items-center">
          <Tabs defaultValue="all" className="w-[400px]">
            <TabsList>
              <TabsTrigger value={"all"} onClick={() => handleTabChange(-1)}>
                All
              </TabsTrigger>
              {groups.map((group) => (
                <TabsTrigger
                  key={group.toString()}
                  value={group.toString()}
                  onClick={() => handleTabChange(group)}
                >
                  Group {group}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Select/Unselect all rows */}
          <Checkbox
            variant={
              table.getRowModel().rows?.every((row) => row.getIsSelected())
                ? "default"
                : "line"
            }
            checked={table.getFilteredSelectedRowModel().rows.length > 0}
            onCheckedChange={(value) => {
              if (
                table.getFilteredSelectedRowModel().rows.length ===
                table.getFilteredRowModel().rows.length
              ) {
                table.getRowModel().rows?.forEach((row) => {
                  row.toggleSelected(false);
                });
              } else {
                if (table.getFilteredSelectedRowModel().rows.length > 0) {
                  table.getFilteredSelectedRowModel().rows?.forEach((row) => {
                    if (row.getIsSelected()) {
                      row.toggleSelected(false);
                    }
                  });
                } else {
                  table.getRowModel().rows?.forEach((row) => {
                    if (!row.getIsSelected()) {
                      row.toggleSelected(!!value);
                    }
                  });
                }
              }
            }}
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
            <TableBody className="border-b-0">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-b-0"
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <TableCell
                        key={cell.id}
                        className={`${
                          index === row.getVisibleCells().length - 1
                            ? "border-b-0 w-6 pl-2"
                            : "border-b w-full"
                        }`}
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

        <div className="w-full flex justify-end">
          <Button
            onClick={() => {
              handleSaveChanges(
                // get the original data and update the autopilot status
                table.getRowModel().rows.map((row) => ({
                  ...row.original,
                  autopilot: row.getIsSelected(),
                }))
              );
            }}
            size="sm"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
