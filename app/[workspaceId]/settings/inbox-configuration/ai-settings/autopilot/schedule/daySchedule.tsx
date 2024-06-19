import { Switch } from "@/components/ui/switch";
import { DayOfWeek, Workspace, timeOptions } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";

const DaySchedule = ({
  day,
  data,
  setData,
  dayLabel,
}: {
  day: DayOfWeek;
  data: Workspace["aiSettings"];
  setData: React.Dispatch<React.SetStateAction<Workspace["aiSettings"]>>;
  dayLabel: string;
}) => {
  const daySettings = data.autoPilotSettings?.schedule?.day?.[day];

  return (
    <div className="flex flex-col gap-3">
      <p className="text-subtitle-sm">{dayLabel}</p>
      <div className="flex items-center gap-3">
        <Switch
          checked={daySettings?.active}
          onCheckedChange={() =>
            setData({
              ...data,
              autoPilotSettings: {
                ...data.autoPilotSettings!,
                schedule: {
                  ...data.autoPilotSettings?.schedule!,
                  day: {
                    ...data.autoPilotSettings?.schedule?.day!,
                    [day]: {
                      ...daySettings,
                      active: !daySettings?.active,
                      time: {
                        ...(daySettings?.time || {
                          start: timeOptions[9].value,
                          end: timeOptions[22].value,
                        }),
                      },
                    },
                  },
                },
              },
            })
          }
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size={"sm"}
              disabled={!daySettings?.active}
            >
              {daySettings?.active
                ? timeOptions.find(
                    (timeOption) => timeOption.value === daySettings?.time?.end
                  )?.name
                : "--:-- --"}
              <ChevronDownIcon
                className={`ml-1 w-4 h-4 ${
                  daySettings?.active
                    ? "text-icon-tertiary"
                    : "text-icon-disabled"
                }`}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="text-subtitle-xs h-64 overflow-y-auto"
          >
            {timeOptions.map((timeOption) => (
              <DropdownMenuItem
                key={timeOption.id}
                onClick={() =>
                  setData({
                    ...data,
                    autoPilotSettings: {
                      ...data.autoPilotSettings!,
                      schedule: {
                        ...data.autoPilotSettings?.schedule!,
                        day: {
                          ...data.autoPilotSettings?.schedule?.day!,
                          [day]: {
                            ...daySettings!,
                            time: {
                              ...daySettings?.time!,
                              start: timeOption.value,
                            },
                          },
                        },
                      },
                    },
                  })
                }
              >
                {timeOption.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <p className="text-subtitle-sm text-tertiary">-</p>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size={"sm"}
              disabled={!daySettings?.active}
            >
              {daySettings?.active
                ? timeOptions.find(
                    (timeOption) => timeOption.value === daySettings?.time?.end
                  )?.name
                : "--:-- --"}
              <ChevronDownIcon
                className={`ml-1 w-4 h-4 ${
                  daySettings?.active
                    ? "text-icon-tertiary"
                    : "text-icon-disabled"
                }`}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="text-subtitle-xs h-64 overflow-y-auto"
          >
            {timeOptions.map((timeOption) => (
              <DropdownMenuItem
                key={timeOption.id}
                onClick={() =>
                  setData({
                    ...data,
                    autoPilotSettings: {
                      ...data.autoPilotSettings!,
                      schedule: {
                        ...data.autoPilotSettings?.schedule!,
                        day: {
                          ...data.autoPilotSettings?.schedule?.day!,
                          [day]: {
                            ...daySettings!,
                            time: {
                              ...daySettings?.time!,
                              end: timeOption.value,
                            },
                          },
                        },
                      },
                    },
                  })
                }
              >
                {timeOption.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div>
          {daySettings?.active ? (
            <p className="text-subtitle-xs text-disabled">
              From{" "}
              {
                timeOptions.find(
                  (timeOption) => timeOption.value === daySettings?.time?.start
                )?.name
              }{" "}
              to{" "}
              {
                timeOptions.find(
                  (timeOption) => timeOption.value === daySettings?.time?.end
                )?.name
              }
            </p>
          ) : (
            <p className="text-subtitle-xs text-disabled">Autopilot is off</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DaySchedule;
