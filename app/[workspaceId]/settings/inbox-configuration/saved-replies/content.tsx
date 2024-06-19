"use client";

import { Input } from "@/components/ui/input";
import { SavedReply } from "@/lib/types";
import { SearchIcon } from "lucide-react";
import { SavedReplyComponent } from "./savedReply";
import { useState } from "react";

export default function SavedRepliesContent({
  savedReplies,
}: {
  savedReplies: SavedReply[];
}) {
  const [search, setSearch] = useState("");

  // Filter saved replies based on search
  const filteredReplies = savedReplies.filter((reply) =>
    reply.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex items-center relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </span>
        <Input
          placeholder="Search saved replies"
          className="pl-10 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {filteredReplies.map((reply) => (
          <SavedReplyComponent key={reply.id} savedReply={reply} />
        ))}
      </div>
    </div>
  );
}
