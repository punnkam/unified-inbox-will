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
import { Switch } from "@/components/ui/switch";
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";

export const VariableTextarea = ({
  value,
  setValue,
  autoLabel,
  setAutoLabel,
}: {
  value: string;
  setValue: (value: string) => void;
  autoLabel: boolean;
  setAutoLabel: (value: boolean) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-subtitle-sm text-primary">Description</label>
          <p className="text-tertiary text-body-xs font-normal">
            Used to identify when this label is applied
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="autoLabelSwitch"
            checked={autoLabel}
            onCheckedChange={setAutoLabel}
          />
          <label htmlFor="autoLabelSwitch" className="text-subtitle-sm">
            Auto-label with a rule
          </label>
        </div>
      </div>
      <div>
        <div className="border border-b-0 border-secondary rounded-t-md px-2 h-9 ">
          {autoLabel ? (
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <Button
                  size={"iconXs"}
                  variant={"outline"}
                  className="text-subtitle-xs"
                  onClick={() => {
                    setValue(`${value}IF `);
                  }}
                >
                  IF
                </Button>
                <Button
                  size={"iconXs"}
                  variant={"outline"}
                  onClick={() => {
                    setValue(`${value}{is greater than} `);
                  }}
                >
                  <ChevronRightIcon className="w-3 h-3" />
                </Button>
                <Button
                  size={"iconXs"}
                  variant={"outline"}
                  onClick={() => {
                    setValue(`${value}{is less than} `);
                  }}
                >
                  <ChevronLeftIcon className="w-3 h-3" />
                </Button>
                <Button
                  size={"iconXs"}
                  variant={"outline"}
                  onClick={() => {
                    setValue(`${value}{is equal to} `);
                  }}
                >
                  =
                </Button>
              </div>
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
                              setValue(`${value}${variable.value} `);
                              setOpen(false);
                            }}
                            className="flex flex-col items-start gap-1 cursor-pointer"
                          >
                            <p className="text-bold-xs font-bold">
                              {variable.key}
                            </p>
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
          ) : (
            <div></div>
          )}
        </div>
        <Textarea
          placeholder={
            autoLabel
              ? "IF {stay length} {is greater than} 20 nights"
              : "Type your message here"
          }
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`h-28 rounded-t-none ${
            autoLabel ? "bg-disabled text-link font-mono" : ""
          }`}
        />
      </div>
    </div>
  );
};
