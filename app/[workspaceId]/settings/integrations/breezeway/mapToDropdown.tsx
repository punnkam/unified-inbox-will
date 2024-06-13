import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BreezewayLabel } from "@/lib/types";
import { ChevronDownIcon } from "lucide-react";

export function MapToDropdown({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: BreezewayLabel }[];
  value: BreezewayLabel;
  onChange: (value: BreezewayLabel) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size={"sm"}
            className="w-[270px] flex justify-between"
          >
            {options.find((option) => option.value === value)?.label}
            <ChevronDownIcon className="ml-1 w-4 h-4 text-icon-tertiary" />
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
