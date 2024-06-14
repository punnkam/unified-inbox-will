"use client";

import { daysOfWeek, Workspace } from "@/lib/types";
import { TimezonePopover } from "./timezonePopover";
import { useState } from "react";
import DaySchedule from "./daySchedule";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { saveAiSettings } from "@/app/actions";

export default function ScheduleContent({
  aiSettings,
  workspaceId,
}: {
  aiSettings: Workspace["aiSettings"];
  workspaceId: string;
}) {
  const [data, setData] = useState<Workspace["aiSettings"]>(aiSettings);
  const [loading, setLoading] = useState(false);

  const saveData = async (data: Workspace["aiSettings"]) => {
    setLoading(true);
    // Call API to save the data
    // console.log("Saving data", data);

    const response = await saveAiSettings(workspaceId, data);

    if (!response.success) {
      toast.error("Error saving settings: " + response.message);
      return;
    }

    toast.success("Settings saved successfully");

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex flex-col gap-2">
        <p className="text-subtitle-sm">Timezone</p>
        <TimezonePopover
          value={data.autoPilotSettings?.schedule?.timezone || ""}
          setValue={(value) =>
            setData({
              ...data,
              autoPilotSettings: {
                ...data.autoPilotSettings!,
                schedule: {
                  ...data.autoPilotSettings?.schedule!,
                  timezone: value,
                },
              },
            })
          }
        />
      </div>

      <div className="flex flex-col gap-4">
        {daysOfWeek.map((day) => (
          <DaySchedule
            key={day.key}
            day={day.key}
            dayLabel={day.label}
            data={data}
            setData={setData}
          />
        ))}
      </div>

      <div className="flex justify-end">
        <Button size="sm" onClick={() => saveData(data)} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
