import { fetchReservationLabels } from "@/app/actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { ReservationLabelComponent } from "./reservationLabel";
import emojis from "./emojis";

export default async function SavedRepliesPage({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) {
  const reservationLabels = await fetchReservationLabels(workspaceId);

  if (!reservationLabels.success || !reservationLabels.data) {
    return null;
  }

  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-3">
          <h1 className="text-title-2xl">Reservation labels</h1>
          <p className="text-subtitle-sm text-tertiary">
            Manage and organize your reservations
          </p>
        </div>
        <Link href="./reservation-labels/add">
          <Button size={"sm"}>
            <PlusIcon className="h-5 w-5 mr-2" />
            New label
          </Button>
        </Link>
      </div>

      <div className="border-b border-primary"></div>

      <div className="flex flex-col gap-2">
        {reservationLabels.data.map((label) => {
          const selectedEmoji = emojis.smileys_people.find(
            (emoji) => emoji.u === label.emojiId
          );

          return (
            <ReservationLabelComponent
              key={label.id}
              reservationLabel={label}
              selectedEmoji={selectedEmoji}
            />
          );
        })}
      </div>
    </div>
  );
}
