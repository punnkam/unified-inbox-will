"use client";

import { Input } from "@/components/ui/input";
import { ReservationLabel } from "@/lib/types";
import { useState } from "react";
import { ArrowNarrowLeft } from "@/components/icons/CustomIcons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { deleteReservationLabel, saveReservationLabel } from "@/app/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { VariableTextarea } from "../VariableTextarea";
import { EmojiComboBox } from "../emojiCombobox";

export default function SavedReplyContent({
  reservationLabel,
}: {
  reservationLabel: ReservationLabel;
}) {
  const [data, setData] = useState<ReservationLabel>({
    ...reservationLabel,
  });
  const [loading, setLoading] = useState({
    save: false,
    delete: false,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const router = useRouter();

  const handleChange = (
    key: keyof typeof data,
    value: (typeof data)[keyof typeof data]
  ) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    setLoading({ ...loading, save: true });

    // Call your API here
    const response = await saveReservationLabel(data);

    setLoading({ ...loading, save: false });

    if (response.success) {
      toast.success("Reservation label saved successfully");

      // Refresh the page
      router.refresh();
    } else {
      toast.error("Error saving reservation label: " + response.message);
    }
  };

  const handleDelete = async () => {
    setIsDialogOpen(false);
    setLoading({ ...loading, delete: true });

    // Call your API here
    const response = await deleteReservationLabel(reservationLabel);

    setLoading({ ...loading, delete: false });

    if (response.success) {
      toast.success("Reservation label deleted successfully");

      // Refresh the page
      router.push("../reservation-labels");
    } else {
      toast.error("Error deleting reservation label: " + response.message);
    }
  };

  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex flex-col gap-4">
        <Link href="../reservation-labels">
          <Button
            variant="link"
            className="text-tertiary flex items-center gap-2 p-2"
          >
            <ArrowNarrowLeft />
            All reservation labels
          </Button>
        </Link>
        <h1 className="text-title-2xl">Edit reservation label</h1>
      </div>

      <div className="border-b border-primary"></div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <div>
            <label
              htmlFor="reservation-name"
              className="text-subtitle-sm text-primary"
            >
              Label name
            </label>
            <p className="text-tertiary text-body-xs font-normal">
              Name the label and choose emoji
            </p>
          </div>
          <div className="flex gap-2">
            <EmojiComboBox
              value={data.emojiId}
              setValue={(e) => handleChange("emojiId", e)}
            />
            <Input
              id="reservation-name"
              placeholder="Early Check-In"
              value={data.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
        </div>
      </div>

      <VariableTextarea
        value={data.description}
        setValue={(e) => handleChange("description", e)}
        autoLabel={data.autoLabel}
        setAutoLabel={() => handleChange("autoLabel", !data.autoLabel)}
      />

      <div className="flex items-center justify-between">
        <AlertDialog open={isDialogOpen}>
          <Button
            variant="destructive"
            disabled={loading.delete}
            onClick={() => setIsDialogOpen(true)}
          >
            {loading.delete ? "Deleting label..." : "Delete label"}
          </Button>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete label?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button
                variant={"secondary"}
                size={"sm"}
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete()}
              >
                Delete reservation label
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button
          variant="default"
          onClick={() => handleSave()}
          disabled={loading.save}
        >
          {loading.save ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}
