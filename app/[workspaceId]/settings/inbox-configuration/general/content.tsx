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

        <div className="flex justify-between items-start border border-secondary rounded-md p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex justify-center items-center">
              <DataFlowIcon className="text-icon-tertiary" />
            </div>
            <div>
              <p className="text-subtitle-xs">Assign conversations to...</p>
              <p className="text-body-2xs font-normal text-tertiary">
                Hand off conversations to workspace members or teams
              </p>
            </div>
          </div>
          <div>
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
          </div>
        </div>

        <div className="flex justify-between items-start border border-secondary rounded-md p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex justify-center items-center">
              <UserLeftIcon className="text-icon-tertiary" />
            </div>
            <div>
              <p className="text-subtitle-xs">
                Auto-assign conversations via round robin
              </p>
              <p className="text-body-2xs font-normal text-tertiary">
                New conversations will be assigned to members with fewest amount
                of assignments
              </p>
            </div>
          </div>
          <div>
            <Switch
              checked={data?.roundRobin}
              onCheckedChange={() =>
                handleChange("roundRobin", !data?.roundRobin)
              }
            />
          </div>
        </div>

        <div className="flex justify-between items-start border border-secondary rounded-md p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex justify-center items-center">
              <ArrowsRightIcon className="text-icon-tertiary" />
            </div>
            <div>
              <p className="text-subtitle-xs">
                Auto-assign conversations to first responder
              </p>
              <p className="text-body-2xs font-normal text-tertiary">
                Assign conversations to member who responds first
              </p>
            </div>
          </div>
          <div>
            <Switch
              checked={data?.firstResponder}
              onCheckedChange={() =>
                handleChange("firstResponder", !data?.firstResponder)
              }
            />
          </div>
        </div>
      </div>
      <div className="border-b border-primary"></div>

      <div className="flex flex-col gap-5">
        <p className="text-title-lg text-tertiary">Mark as Done</p>

        <div className="flex justify-between items-start border border-secondary rounded-md p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex justify-center items-center">
              <CheckCircleIcon className="text-icon-tertiary" />
            </div>
            <div>
              <p className="text-subtitle-xs">Auto-Mark as Done</p>
              <p className="text-body-2xs font-normal text-tertiary">
                When you answer a message, the conversation will be marked as
                done automatically.
              </p>
            </div>
          </div>
          <div>
            <Switch
              checked={data?.autoMarkAsDone}
              onCheckedChange={() =>
                handleChange("autoMarkAsDone", !data?.autoMarkAsDone)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
