"use client";

import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export function AddMemberComboBox({
  avaliableMembers,
  teamId,
}: {
  avaliableMembers: Member[];
  teamId: number;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSelect = (id: number) => {
    // add member to team here
    toast.success(`Member id: ${id} added to team id: ${teamId}`);

    setOpen(false);

    // refresh the page to show the new member
    router.refresh();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size={"sm"}
          role="combobox"
          aria-expanded={open}
          className=""
        >
          Add Member
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0" align="end">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search Members" />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {avaliableMembers.map((member) => (
                <CommandItem
                  key={member.id}
                  value={member.name}
                  onSelect={() => {
                    handleSelect(member.id);
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
