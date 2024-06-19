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
import { useState } from "react";
import { timezones } from "@/lib/types";

export const TimezonePopover = ({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={"outline"} size={"sm"} className="w-fit">
          {timezones.find((timezone) => timezone.value === value)?.name ||
            "Select timezone"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0" align="start">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search timezone" />
            <CommandEmpty>No timezones found.</CommandEmpty>
            <CommandGroup>
              {timezones.map((timezone) => (
                <CommandItem
                  key={timezone.id}
                  value={timezone.value}
                  onSelect={() => {
                    setValue(timezone.value);
                    setOpen(false);
                  }}
                  className="flex flex-col items-start gap-1 cursor-pointer"
                >
                  <p className="text-subtitle-xs">{timezone.name}</p>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
