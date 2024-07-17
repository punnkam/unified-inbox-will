import { GuestJounreyProgress } from "@/components/ui/progress";
import { format } from "date-fns";

export const GuestJourney = ({
  arrivalDate,
  departureDate,
}: {
  arrivalDate: string;
  departureDate: string;
}) => {
  // Calculate the progress of the guest journey
  // Before: 3 day span before the arrival date
  // During: The time between the arrival and departure date
  // After: 3 day span after the departure date

  const arrival = new Date(arrivalDate);
  const departure = new Date(departureDate);
  const today = new Date();

  const beforeStart = new Date(arrival);
  beforeStart.setDate(arrival.getDate() - 3);

  const afterEnd = new Date(departure);
  afterEnd.setDate(departure.getDate() + 3);

  const totalDuration = departure.getTime() - arrival.getTime();
  const elapsedTime = today.getTime() - arrival.getTime();

  let beforeProgress = 0;
  let duringProgress = 0;
  let afterProgress = 0;

  if (today < arrival) {
    beforeProgress =
      100 *
      (1 -
        (arrival.getTime() - today.getTime()) /
          (arrival.getTime() - beforeStart.getTime()));
  } else if (today >= arrival && today <= departure) {
    beforeProgress = 100;
    duringProgress = (elapsedTime / totalDuration) * 100;
  } else if (today > departure && today <= afterEnd) {
    beforeProgress = 100;
    duringProgress = 100;
    afterProgress =
      100 *
      ((today.getTime() - departure.getTime()) /
        (afterEnd.getTime() - departure.getTime()));
  } else {
    beforeProgress = 100;
    duringProgress = 100;
    afterProgress = 100;
  }

  return (
    <div className="px-5 py-4 flex flex-col gap-4 bg-primary rounded-lg border border-primary">
      <div className="flex items-center justify-between">
        <p className="text-title-md">
          {today < arrival
            ? "Before Stay"
            : today >= arrival && today <= departure
            ? "During Stay"
            : "After Stay"}
        </p>
        <p className="text-subtitle-xs text-secondary">
          {format(arrival, "MMM dd")} - {format(departure, "MMM dd")}
        </p>
      </div>

      {/* Guest Journey Progress */}
      <div className="flex gap-3">
        {/* Before */}
        <div className="flex flex-col gap-2 w-full">
          <GuestJounreyProgress
            value={beforeProgress == 0 ? -1 : beforeProgress}
          />
          <p
            className={`text-bold-section uppercase ${
              beforeProgress > 0 ? "text-brand" : "text-disabled"
            }`}
          >
            Before
          </p>
        </div>

        {/* During */}
        <div className="flex flex-col gap-2 w-full">
          <GuestJounreyProgress
            value={duringProgress == 0 ? -1 : duringProgress}
          />
          <p
            className={`text-bold-section uppercase ${
              duringProgress > 0 ? "text-brand" : "text-disabled"
            }`}
          >
            During
          </p>
        </div>

        {/* After */}
        <div className="flex flex-col gap-2 w-full">
          <GuestJounreyProgress
            value={afterProgress == 0 ? -1 : afterProgress}
          />
          <p
            className={`text-bold-section uppercase ${
              afterProgress > 0 ? "text-brand" : "text-disabled"
            }`}
          >
            After
          </p>
        </div>
      </div>
    </div>
  );
};
