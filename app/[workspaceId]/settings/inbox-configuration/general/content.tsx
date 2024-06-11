"use client";

import { ArchiveIcon, DataFlowIcon } from "@/components/icons/CustomIcons";
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
    autoArchive: false,
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
      </div>
      <div className="border-b border-primary"></div>

      <div className="flex flex-col gap-5">
        <p className="text-title-lg text-tertiary">Archive</p>

        <div className="flex justify-between items-start border border-secondary rounded-md p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex justify-center items-center">
              <ArchiveIcon className="text-icon-tertiary" />
            </div>
            <div>
              <p className="text-subtitle-xs">Auto-archive</p>
              <p className="text-body-2xs font-normal text-tertiary">
                When you answer a message, the conversation will be archived
                automatically.
              </p>
            </div>
          </div>
          <div>
            <Switch
              checked={data?.autoArchive}
              onCheckedChange={() =>
                handleChange("autoArchive", !data?.autoArchive)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
