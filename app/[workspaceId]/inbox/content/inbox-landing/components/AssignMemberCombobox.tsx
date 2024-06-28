"use client";

import { KeyboardShortcut } from "@/components/custom/KeyBoardShortcut";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Member } from "@/lib/types";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export function AssignMemberComboBox({
  availableMembers,
  onAssign,
}: {
  availableMembers: Member[];
  onAssign: (member: Member) => void;
}) {
  const [open, setOpen] = useState(false);

  // Add "a" hotkey to open the combobox
  useHotkeys("a", (e) => {
    e.preventDefault();
    setOpen(true);
  });

  const handleSelect = (id: number) => {
    onAssign(availableMembers.find((m) => m.id === id)!);

    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="px-5 py-4 flex items-center gap-2 hover:cursor-pointer hover:bg-hover">
          <div className="flex items-center gap-2">
            <p>Assign</p>
          </div>
          <KeyboardShortcut shortcut="A" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0" align="end">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search Members" />
            <CommandEmpty>No avaliable members found.</CommandEmpty>
            <CommandGroup>
              {availableMembers.map((member) => (
                <CommandItem
                  key={member.id}
                  value={member.name}
                  onSelect={() => {
                    handleSelect(member.id!);
                  }}
                  className="flex items-center gap-2"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  {member.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
