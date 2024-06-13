"use client";

import { Switch } from "@/components/ui/switch";
import { Workspace } from "@/lib/types";
import { useState } from "react";
import { useDebouncedSave } from "@/lib/hooks/useDebouncedSave";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BuildingIcon, CalendarIcon } from "@/components/icons/CustomIcons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { saveAiSettings } from "@/app/actions";

export default function AutopilotContent({
  aiSettings,
  workspaceId,
}: {
  aiSettings: Workspace["inboxConfiguration"]["aiSettings"];
  workspaceId: string;
}) {
  const initialData: Workspace["inboxConfiguration"]["aiSettings"] =
    aiSettings || {
      autoPilot: false,
      autoPilotSettings: {
        messageType: "All",
        gaurdrails: {
          notEnoughInformation: true,
          isManaullyAnswered: true,
          taggedWithConversationTag: false,
        },
      },
    };

  // Load data or set default values
  const [optionsData, setOptionsData] =
    useState<Workspace["inboxConfiguration"]["aiSettings"]>(initialData);
  const [loading, setLoading] = useState(false);

  const saveData = async (
    data: Workspace["inboxConfiguration"]["aiSettings"]
  ) => {
    setLoading(true);
    // Call API to save the data
    console.log("Saving data", data);

    const repsonse = await saveAiSettings(workspaceId, data);

    if (!repsonse.success) {
      toast.error("Error saving settings: " + repsonse.message);
      return;
    }

    setLoading(false);
    toast.success("Settings saved successfully");
  };

  // Using the debounce to save if the autopilot is turned off
  const { data, handleChange, setData } = useDebouncedSave<
    Workspace["inboxConfiguration"]["aiSettings"]
  >({
    initialData,
    saveData,
  });

  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-subtitle-xs h-5">Turn on autopilot</p>
          <p className="text-body-2xs text-tertiary font-normal mt-0.5">
            Enable autopilot to automate your guest messaging
          </p>
        </div>
        <Switch
          checked={data?.autoPilot}
          onCheckedChange={() => handleChange("autoPilot", !data.autoPilot)}
        />
      </div>

      {data.autoPilot && (
        <div className="flex flex-col gap-[28px]">
          <div className="border-b border-primary"></div>

          <div className="flex flex-col gap-5">
            <p className="text-title-lg text-tertiary">Schedule</p>

            <div className="flex justify-between items-start border border-secondary rounded-md p-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 flex justify-center items-center">
                  <CalendarIcon className="text-icon-tertiary" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-subtitle-xs">
                    Select when HostAI should respond automatically
                  </p>
                  <p className="text-body-2xs font-normal text-tertiary">
                    Autopilot is on 24/7
                  </p>
                </div>
              </div>
              <div>
                <Link href={"./autopilot/schedule"}>
                  <Button variant={"outline"} size={"sm"}>
                    Edit
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="border-b border-primary"></div>

          <div className="flex flex-col gap-5">
            <p className="text-title-lg text-tertiary">Listings</p>

            <div className="flex justify-between items-start border border-secondary rounded-md p-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 flex justify-center items-center">
                  <BuildingIcon className="text-icon-tertiary" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-subtitle-xs">
                    Select listings to be on autopilot
                  </p>
                  <p className="text-body-2xs font-normal text-tertiary">
                    Autopilot is on for all listings
                  </p>
                </div>
              </div>
              <div>
                <Link href={"./autopilot/listings"}>
                  <Button variant={"outline"} size={"sm"}>
                    Edit
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="border-b border-primary"></div>

          <div className="flex flex-col gap-5">
            <p className="text-title-lg text-tertiary">Message type</p>
            <p className="text-body-xs text-secondary font-normal">
              Autopilot will be on for...
            </p>
            <div className="p-4 rounded-md border border-secondary">
              <RadioGroup
                defaultValue={
                  optionsData.autoPilotSettings?.messageType || "All"
                }
                onValueChange={(value: "All" | "Inquiries") =>
                  setOptionsData((prev) => ({
                    ...prev,
                    autoPilotSettings: {
                      ...prev.autoPilotSettings!,
                      messageType: value,
                    },
                  }))
                }
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="All" id="messageType-all" />
                  <label htmlFor="messageType-all" className="text-subtitle-xs">
                    All Messages
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    value="Inquiries"
                    id="messageType-inquiries"
                  />
                  <label
                    htmlFor="messageType-inquiries"
                    className="text-subtitle-xs"
                  >
                    Only inquiries
                  </label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="border-b border-primary"></div>

          <div className="flex flex-col gap-5">
            <p className="text-title-lg text-tertiary">Guardrails</p>
            <p className="text-body-xs text-secondary font-normal">
              HostAI will not automatically respond when...
            </p>
            <div className="p-4 rounded-md border border-secondary">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="notEnoughInformation"
                    checked={
                      optionsData.autoPilotSettings?.gaurdrails
                        .notEnoughInformation
                    }
                    onCheckedChange={() =>
                      setOptionsData((prev) => ({
                        ...prev,
                        autoPilotSettings: {
                          ...prev.autoPilotSettings!,
                          gaurdrails: {
                            ...prev.autoPilotSettings?.gaurdrails!,
                            notEnoughInformation:
                              !prev.autoPilotSettings?.gaurdrails
                                ?.notEnoughInformation,
                          },
                        },
                      }))
                    }
                  />
                  <label
                    htmlFor="notEnoughInformation"
                    className="text-subtitle-xs"
                  >
                    It doesn’t have enough information
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="isManaullyAnswered"
                    checked={
                      optionsData.autoPilotSettings?.gaurdrails
                        .isManaullyAnswered
                    }
                    onCheckedChange={() =>
                      setOptionsData((prev) => ({
                        ...prev,
                        autoPilotSettings: {
                          ...prev.autoPilotSettings!,
                          gaurdrails: {
                            ...prev.autoPilotSettings?.gaurdrails!,
                            isManaullyAnswered:
                              !prev.autoPilotSettings?.gaurdrails
                                ?.isManaullyAnswered,
                          },
                        },
                      }))
                    }
                  />
                  <label
                    htmlFor="isManaullyAnswered"
                    className="text-subtitle-xs"
                  >
                    The message is manually answered by the host
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="taggedWithConversationTag"
                    checked={
                      optionsData.autoPilotSettings?.gaurdrails
                        .taggedWithConversationTag
                    }
                    onCheckedChange={() =>
                      setOptionsData((prev) => ({
                        ...prev,
                        autoPilotSettings: {
                          ...prev.autoPilotSettings!,
                          gaurdrails: {
                            ...prev.autoPilotSettings?.gaurdrails!,
                            taggedWithConversationTag:
                              !prev.autoPilotSettings?.gaurdrails
                                ?.taggedWithConversationTag,
                          },
                        },
                      }))
                    }
                  />
                  <label
                    htmlFor="taggedWithConversationTag"
                    className="text-subtitle-xs"
                  >
                    The message is tagged with a conversation tag
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={() => saveData(optionsData)} disabled={loading}>
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
