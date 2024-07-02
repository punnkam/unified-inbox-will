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
import { useRouter } from "next/navigation";
import { useSidebar } from "../../SidebarContext";
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

export const InboxOperationsView = ({
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

  const { columnFilters, setColumnFilters, setView } = useTableContext();

  // Use useEffect to update the context view
  useEffect(() => {
    // update the context view so we can handle loading states and sidebar
    setView("chat");
  }, [setView]);

  const { isOpen } = useSidebar();

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
      <p>hi</p>
    </div>
  );
};
