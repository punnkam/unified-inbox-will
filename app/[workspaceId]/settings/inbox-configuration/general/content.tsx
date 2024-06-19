"use client";

import {
  ArrowsRightIcon,
  CheckCircleIcon,
  DataFlowIcon,
  UserLeftIcon,
} from "@/components/icons/CustomIcons";
import { Switch } from "@/components/ui/switch";
import { Workspace } from "@/lib/types";
import { useEffect } from "react";
import { useDebouncedSave } from "@/lib/hooks/useDebouncedSave";
import { saveInboxGeneralSettings } from "@/app/actions";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { SettingsContainer } from "@/components/custom/SettingsContainer";

export default function GeneralContent({
  workspace,
}: {
  workspace: Workspace;
}) {
  const initialData: Workspace["inboxConfiguration"] = {
    asignConversations: "Members",
    autoMarkAsDone: false,
    firstResponder: true,
    roundRobin: true,
  };

  const saveData = async (data: Workspace["inboxConfiguration"]) => {
    const response = await saveInboxGeneralSettings({
      ...workspace,
      inboxConfiguration: data,
    });

    if (response.success) {
      toast.success("Inbox general settings saved successfully");
    } else {
      toast.error("Error saving inbox general settings: " + response.message);
    }
  };

  const { data, handleChange, setData } = useDebouncedSave<
    Workspace["inboxConfiguration"]
  >({
    initialData,
    saveData,
  });

  useEffect(() => {
    setData(workspace.inboxConfiguration);
  }, [workspace.inboxConfiguration, setData]);

  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex flex-col gap-5">
        <p className="text-title-lg text-tertiary">Assignments</p>

        <SettingsContainer
          title="Assign conversations to..."
          description="Hand off conversations to workspace members or teams"
          icon={<DataFlowIcon className="text-icon-tertiary" />}
          action={
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size={"sm"}>
                  {data?.asignConversations}
                  <ChevronDownIcon className="ml-1 w-4 h-4 text-icon-tertiary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="text-subtitle-xs">
                <DropdownMenuItem
                  onClick={() => handleChange("asignConversations", "Members")}
                >
                  Members
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleChange("asignConversations", "Teams")}
                >
                  Teams
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }
        />

        <SettingsContainer
          title="Auto-assign conversations via round robin"
          description="New conversations will be assigned to members with fewest amount of assignments"
          icon={<UserLeftIcon className="text-icon-tertiary" />}
          action={
            <Switch
              checked={data?.roundRobin}
              onCheckedChange={() =>
                handleChange("roundRobin", !data?.roundRobin)
              }
            />
          }
        />

        <SettingsContainer
          title="Auto-assign conversations to first responder"
          description="Assign conversations to member who responds first"
          icon={<ArrowsRightIcon className="text-icon-tertiary" />}
          action={
            <Switch
              checked={data?.firstResponder}
              onCheckedChange={() =>
                handleChange("firstResponder", !data?.firstResponder)
              }
            />
          }
        />
      </div>
      <div className="border-b border-primary"></div>

      <div className="flex flex-col gap-5">
        <p className="text-title-lg text-tertiary">Mark as Done</p>

        <SettingsContainer
          title="Auto-Mark as Done"
          description="When you answer a message, the conversation will be marked as done automatically."
          icon={<CheckCircleIcon className="text-icon-tertiary size-5" />}
          action={
            <Switch
              checked={data?.autoMarkAsDone}
              onCheckedChange={() =>
                handleChange("autoMarkAsDone", !data?.autoMarkAsDone)
              }
            />
          }
        />
      </div>
    </div>
  );
}
