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
import emojis from "./emojis";

export function EmojiComboBox({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleSelect = (id: string) => {
    const selectedEmoji = emojis.smileys_people.find(
      (emoji) => emoji.u === id
    )!;

    // set the value to the unicode of the selected emoji
    setValue(selectedEmoji.u);

    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size={"sm"}
          role="combobox"
          aria-expanded={open}
          className="size-10 min-h-10"
        >
          <span role="img" className="text-lg">
            {String.fromCodePoint(parseInt(value, 16))}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0" align="start">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search emojis" />
            <CommandEmpty>No emojis found.</CommandEmpty>
            <div className="grid grid-cols-5">
              {emojis.smileys_people.map((emoji, i) => (
                <CommandItem
                  key={emoji.u}
                  value={emoji.n.join(" ")}
                  onSelect={() => {
                    handleSelect(emoji.u);
                  }}
                  className="flex items-center gap-2 text-2xl size-10 min-h-10"
                >
                  <span role="img" className="text-lg">
                    {String.fromCodePoint(parseInt(emoji.u, 16))}
                  </span>
                </CommandItem>
              ))}
            </div>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
