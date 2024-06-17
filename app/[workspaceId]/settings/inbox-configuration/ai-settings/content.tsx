"use client";

import {
  StarsIcon,
  TranslateIcon,
  AtomIcon,
} from "@/components/icons/CustomIcons";
import { Switch } from "@/components/ui/switch";
import { Workspace } from "@/lib/types";
import { useDebouncedSave } from "@/lib/hooks/useDebouncedSave";
import { saveAiSettings } from "@/app/actions";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { SettingsContainer } from "@/components/custom/SettingsContainer";

export default function GeneralContent({
  workspaceId,
  aiSettings,
}: {
  workspaceId: string;
  aiSettings: Workspace["aiSettings"];
}) {
  const initialData: Workspace["aiSettings"] = aiSettings || {
    summarizeConversations: true,
    responseLanguage: "Guest Language",
    autoPilot: false,
    aiSignature: "",
  };

  const saveData = async (data: Workspace["aiSettings"]) => {
    const response = await saveAiSettings(workspaceId, data);

    if (response.success) {
      toast.success("AI setttings settings saved successfully");
    } else {
      toast.error("Error saving AI setttings: " + response.message);
    }
  };

  const { data, handleChange, setData } = useDebouncedSave<
    Workspace["aiSettings"]
  >({
    initialData,
    saveData,
  });

  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex flex-col gap-5">
        <p className="text-title-lg text-tertiary">Conversation summaries</p>
        <SettingsContainer
          title="Let HostAI summarize your conversations"
          description="We'll summarize the conversation with each guest"
          icon={<StarsIcon className="text-icon-tertiary" />}
          action={
            <Switch
              checked={data?.summarizeConversations}
              onCheckedChange={() =>
                handleChange(
                  "summarizeConversations",
                  !data?.summarizeConversations
                )
              }
            />
          }
        />
      </div>
      <div className="border-b border-primary"></div>

      <div className="flex flex-col gap-5">
        <p className="text-title-lg text-tertiary">Language </p>

        <SettingsContainer
          title="How HostAI should respond to non-English messages"
          description="Choose your preference"
          icon={<TranslateIcon className="text-icon-tertiary" />}
          action={
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size={"sm"}>
                  {data?.responseLanguage}
                  <ChevronDownIcon className="ml-1 w-4 h-4 text-icon-tertiary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="text-subtitle-xs">
                <DropdownMenuItem
                  onClick={() =>
                    handleChange("responseLanguage", "Guest Language")
                  }
                >
                  Respond in guest language
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleChange("responseLanguage", "English")}
                >
                  Respond in English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }
        />
      </div>

      <div className="border-b border-primary"></div>

      <div className="flex flex-col gap-5">
        <p className="text-title-lg text-tertiary">Autopilot</p>

        <div className="flex justify-between items-start border border-secondary rounded-md p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex justify-center items-center">
              <AtomIcon className="text-icon-tertiary" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-subtitle-xs">
                Have HostAI respond to guests automatically
              </p>
              {data?.autoPilot ? (
                <div className="flex gap-1 items-center">
                  <div className="h-[6px] w-[6px] rounded-full bg-icon-success"></div>
                  <p className="text-body-2xs font-normal text-success">
                    Autopilot is currently activated
                  </p>
                </div>
              ) : (
                <p className="text-body-2xs font-normal text-tertiary">
                  Click turn on to configure
                </p>
              )}
            </div>
          </div>
          <div>
            <Link href={"./ai-settings/autopilot"}>
              <Button variant={"outline"} size={"sm"}>
                {data?.autoPilot ? "Edit" : "Turn on"}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="border-b border-primary"></div>

      <div className="flex flex-col gap-5">
        <p className="text-title-lg text-tertiary">AI signature</p>
        <p className="text-body-xs text-secondary font-normal">
          This will added to the end of all messages sent by AI
        </p>
        <Textarea
          value={data!.aiSignature}
          onChange={(e) => handleChange("aiSignature", e.target.value)}
          placeholder="Best, Canbnb support"
        />
      </div>
    </div>
  );
}
