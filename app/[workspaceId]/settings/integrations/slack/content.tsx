"use client";

import { CopyIcon, SlackIcon } from "@/components/icons/CustomIcons";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { SlackConnection } from "@/lib/types";
import { useState } from "react";
import { saveSlackConnection, removeSlackConnection } from "@/app/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function EditSlackContent({
  connection,
}: {
  connection: SlackConnection;
}) {
  const [data, setData] = useState<SlackConnection["options"]>(
    connection.options
  );
  const [loading, setLoading] = useState({
    save: false,
    remove: false,
  });

  const router = useRouter();

  if (!data) {
    return null;
  }

  const handleChange = (key: keyof typeof data, value: boolean) => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleSave = async () => {
    setLoading({ ...loading, save: true });
    const repsonse = await saveSlackConnection({
      ...connection,
      options: data,
    });
    setLoading({ ...loading, save: false });

    if (repsonse.success) {
      console.log("Slack integration saved successfully: ");

      toast.success("Slack integration saved successfully");

      // refresh the page
      router.refresh();
    } else {
      toast.error("Error saving Slack integration: " + repsonse.message);
    }
  };

  const handleRemoveConnection = async () => {
    setLoading({ ...loading, remove: true });
    const repsonse = await removeSlackConnection({
      ...connection,
    });

    setLoading({ ...loading, remove: true });

    if (repsonse.success) {
      console.log("Slack integration removed successfully: ");

      toast.success("Slack integration removed successfully");

      // refresh the page
      router.push(`../integrations`);
    } else {
      toast.error("Error removing Slack integration: " + repsonse.message);
    }
  };

  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-subtitle-sm">Slack channels</p>
            <p className="text-body-xs text-tertiary font-normal mt-1">
              Detected upsells and tasks will be sent to the Guest Messages
              channel by default.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border border-secondary rounded-md p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-subtitle-xs h-5">Guest messaging</p>
              <p className="text-body-2xs text-tertiary font-normal mt-0.5">
                You will create a channel in your Slack workspace called #hostai
              </p>
            </div>
            <Switch
              checked={data?.guestMessaging}
              onCheckedChange={() =>
                handleChange("guestMessaging", !data?.guestMessaging)
              }
            />
          </div>
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col">
              <p className="text-subtitle-xs h-5">Upsells</p>
              <p className="text-body-2xs text-tertiary font-normal mt-0.5">
                We will create a channel in your Slack workspace called
                #hostai-upsells
              </p>
            </div>
            <Switch
              checked={data?.upsells}
              onCheckedChange={() => handleChange("upsells", !data?.upsells)}
            />
          </div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-subtitle-xs h-5">Tasks</p>
              <p className="text-body-2xs text-tertiary font-normal mt-0.5">
                We will create a channel in your Slack workspace called
                #hostai-tasks
              </p>
            </div>
            <Switch
              checked={data?.tasks}
              onCheckedChange={() => handleChange("tasks", !data?.tasks)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-subtitle-sm">Listing groups</p>
            <p className="text-body-xs text-tertiary font-normal mt-1">
              This is only relevant if you create listing groups
            </p>
          </div>
        </div>

        <div className="flex justify-between items-start border border-secondary rounded-md p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex justify-center items-center">
              <CopyIcon className="text-icon-tertiary" />
            </div>
            <div>
              <p className="text-subtitle-xs">
                Copy setup and apply it to each listing group
              </p>
              <p className="text-body-2xs font-normal text-tertiary">
                Each listing group will have this channel set up. For example
                #joshuatree-hostai-tasks
              </p>
            </div>
          </div>
          <div>
            <Switch
              checked={data?.copySetupToListingGroups}
              onCheckedChange={() =>
                handleChange(
                  "copySetupToListingGroups",
                  !data?.copySetupToListingGroups
                )
              }
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <Button
          variant={"outline"}
          disabled={loading.remove || loading.save}
          onClick={() => handleRemoveConnection()}
        >
          <div className="flex gap-2 items-center">
            <SlackIcon />
            {loading.remove ? "Removing..." : "Remove Slack integration"}
          </div>
        </Button>
        <Button
          size={"sm"}
          disabled={loading.save || loading.remove}
          onClick={() => handleSave()}
        >
          {loading.save ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </div>
  );
}
