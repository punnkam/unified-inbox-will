"use server";

import { fetchReservationLabel } from "@/app/actions";
import SavedReplyContent from "./content";

export default async function EditSavedReplyPage({
  params: { savedReplyId },
}: {
  params: { savedReplyId: string };
}) {
  const reservationLabel = await fetchReservationLabel(savedReplyId);

  if (!reservationLabel.success || !reservationLabel.data) {
    return null;
  }

  return <SavedReplyContent reservationLabel={reservationLabel.data} />;
}
