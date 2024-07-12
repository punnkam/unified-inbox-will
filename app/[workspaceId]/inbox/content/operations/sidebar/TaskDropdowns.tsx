import {
  XCircleIcon,
  FilledCheckCircleIcon,
  ArrowCircleBrokenRightIcon,
  SkinnyCircleIcon,
  Loading02Icon,
  User03Icon,
} from "@/components/icons/CustomIcons";
import { Member, TaskStatusEnum, TaskTypeEnum } from "@/lib/realDataSchema";
import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export const TaskStatusDropdown = ({
  align = "end",
  onUpdateStatus,
}: {
  align?: "start" | "end" | "center";
  onUpdateStatus: (status: TaskStatusEnum) => void;
}) => {
  const handleUpdateStatus = (newStatus: TaskStatusEnum) => {
    onUpdateStatus(newStatus);
  };

  return (
    <DropdownMenuContent align={align} className="text-subtitle-xs p-0">
      <Command>
        <CommandInput placeholder={`Search`} autoFocus={true} />
        <CommandList>
          <CommandEmpty>No matches.</CommandEmpty>
          <CommandGroup className="w-full">
            <DropdownMenuItem className="p-0 active:bg-transparent">
              <CommandItem
                key="backlog"
                value="Backlog"
                onSelect={() => handleUpdateStatus(TaskStatusEnum.Backlog)}
                className="hover:cursor-pointer w-full"
              >
                <div className="flex items-center gap-2 text-subtitle-xs">
                  <div className="flex items-center justify-center size-6 min-w-6 min-h-6 rounded-full text-icon-tertiary">
                    <Loading02Icon className="h-[13.3px] w-fit" />
                  </div>
                  <p>Backlog</p>
                </div>
              </CommandItem>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0 active:bg-transparent">
              <CommandItem
                key="todo"
                value="Todo"
                onSelect={() => handleUpdateStatus(TaskStatusEnum.Todo)}
                className="hover:cursor-pointer w-full"
              >
                <div className="flex items-center gap-2 text-subtitle-xs">
                  <div className="flex items-center justify-center size-6 min-w-6 min-h-6 rounded-full text-icon-secondary">
                    <SkinnyCircleIcon className="h-[13.3px] w-fit" />
                  </div>
                  <p>Todo</p>
                </div>
              </CommandItem>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0 active:bg-transparent">
              <CommandItem
                key="in-progress"
                value="In Progress"
                onSelect={() => handleUpdateStatus(TaskStatusEnum.InProgress)}
                className="hover:cursor-pointer w-full"
              >
                <div className="flex items-center gap-2 text-subtitle-xs">
                  <div className="flex items-center justify-center size-6 min-w-6 min-h-6 rounded-full text-icon-active">
                    <ArrowCircleBrokenRightIcon className="h-[13.3px] w-fit" />
                  </div>
                  <p>In Progress</p>
                </div>
              </CommandItem>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0 active:bg-transparent">
              <CommandItem
                key="done"
                value="Done"
                onSelect={() => handleUpdateStatus(TaskStatusEnum.Done)}
                className="hover:cursor-pointer w-full"
              >
                <div className="flex items-center gap-2 text-subtitle-xs">
                  <div className="flex items-center justify-center size-6 min-w-6 min-h-6 rounded-full text-icon-success">
                    <FilledCheckCircleIcon className="h-[13.3px] w-fit" />
                  </div>
                  <p>Done</p>
                </div>
              </CommandItem>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0 active:bg-transparent">
              <CommandItem
                key="cancelled"
                value="Cancelled"
                onSelect={() => handleUpdateStatus(TaskStatusEnum.Cancelled)}
                className="hover:cursor-pointer w-full"
              >
                <div className="flex items-center gap-2 text-subtitle-xs">
                  <div className="flex items-center justify-center size-6 min-w-6 min-h-6 rounded-full text-icon-error">
                    <XCircleIcon className="h-[13.3px] w-fit" />
                  </div>
                  <p>Cancelled</p>
                </div>
              </CommandItem>
            </DropdownMenuItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </DropdownMenuContent>
  );
};

export const TaskAssigneeDropdown = ({
  align = "end",
  onUpdateAssignee,
  availableMembers,
}: {
  align?: "start" | "end" | "center";
  onUpdateAssignee: (assignee: Member | undefined) => void;
  availableMembers: Member[];
}) => {
  const handleUpdateAssignee = (newAssignee: Member | undefined) => {
    onUpdateAssignee(newAssignee);
  };

  return (
    <DropdownMenuContent align={align} className="text-subtitle-xs p-0">
      <Command>
        <CommandInput placeholder={`Search`} autoFocus={true} />
        <CommandList>
          <CommandEmpty>No matches.</CommandEmpty>
          <CommandGroup className="w-full">
            <DropdownMenuItem className="p-0 active:bg-transparent">
              {/* TODO: add logic for unassigned */}
              <CommandItem
                key="unassigned"
                value="Unassigned"
                onSelect={() => handleUpdateAssignee(undefined)}
                className="hover:cursor-pointer w-full"
              >
                <div className="flex items-center gap-2 text-subtitle-xs">
                  <div className="flex items-center justify-center size-6 min-w-6 min-h-6 rounded-full text-icon-secondary">
                    <User03Icon className="h-[13.3px] w-fit" />
                  </div>
                  <p>Unassigned</p>
                </div>
              </CommandItem>
            </DropdownMenuItem>
            {availableMembers.map((member) => (
              <DropdownMenuItem className="p-0 active:bg-transparent">
                <CommandItem
                  key={member.id}
                  value={member.name}
                  onSelect={() => {
                    handleUpdateAssignee(member);
                  }}
                  className="hover:cursor-pointer w-full"
                >
                  <div className="flex items-center gap-2 text-subtitle-xs">
                    <div className="flex items-center justify-center size-6 min-w-6 min-h-6 rounded-full text-icon-secondary">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    </div>
                    <p>{member.name}</p>
                  </div>
                </CommandItem>
              </DropdownMenuItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </DropdownMenuContent>
  );
};

export const TaskTypeDropdown = ({
  value,
  setValue,
}: {
  value: TaskTypeEnum;
  setValue: (value: TaskTypeEnum) => void;
}) => {
  const handleUpdateType = (newType: TaskTypeEnum) => {
    setValue(newType);
  };

  return (
    <DropdownMenuContent align="end" className="text-subtitle-xs p-0">
      <Command>
        <CommandInput placeholder={`Search`} autoFocus={true} />
        <CommandList>
          <CommandEmpty>No matches.</CommandEmpty>
          <CommandGroup className="w-full">
            {Object.entries(TaskTypeEnum).map(([type, typeValue]) => (
              <DropdownMenuItem className="p-0 active:bg-transparent">
                <CommandItem
                  key={type}
                  value={type}
                  onSelect={() => {
                    handleUpdateType(typeValue);
                  }}
                  className="hover:cursor-pointer w-full"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "size-[14.67px] rounded-full",
                        typeValue === TaskTypeEnum.Cleaning &&
                          "bg-icon-success",
                        typeValue === TaskTypeEnum.Maintenance &&
                          "bg-icon-active",
                        typeValue === TaskTypeEnum.Safety && "bg-icon-error",
                        typeValue === TaskTypeEnum.Supplies && "bg-orange-500",
                        typeValue === TaskTypeEnum.Other && "bg-icon-disabled"
                      )}
                    ></div>
                    <p>{type}</p>
                  </div>
                </CommandItem>
              </DropdownMenuItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </DropdownMenuContent>
  );
};
