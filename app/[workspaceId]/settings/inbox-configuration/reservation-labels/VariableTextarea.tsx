import { CodeSnippetIcon } from "@/components/icons/CustomIcons";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
import { variablesList } from "@/lib/types";

export const VariableTextarea = ({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="border border-b-0 border-secondary rounded-t-md flex justify-end px-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={"ghost"}
              size={"sm"}
              className="flex items-center gap-2 text-secondary"
            >
              <CodeSnippetIcon />
              Add variable
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] p-0" align="end">
            <Command>
              <CommandList>
                <CommandInput placeholder="Search variables" />
                <CommandEmpty>No variables found.</CommandEmpty>
                <CommandGroup>
                  {variablesList.map((variable) => (
                    <CommandItem
                      key={variable.key}
                      value={variable.value}
                      onSelect={() => {
                        setValue(`${value}${variable.value}`);
                        setOpen(false);
                      }}
                      className="flex flex-col items-start gap-1 cursor-pointer"
                    >
                      <p className="text-bold-xs font-bold">{variable.key}</p>
                      <p className="text-tertiary text-body-2xs font-normal">
                        {variable.value}
                      </p>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <Textarea
        placeholder="Type your message here"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-28 rounded-t-none"
      />
    </div>
  );
};
