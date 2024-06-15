"use client";
import { Input } from "@/components/ui/input";
import { ReservationLabel } from "@/lib/types";
import { useState } from "react";
import { ArrowNarrowLeft } from "@/components/icons/CustomIcons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { saveReservationLabel } from "@/app/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { VariableTextarea } from "../VariableTextarea";
import { EmojiComboBox } from "../emojiCombobox";

export default function ReservationLabelContent({
  workspaceId,
}: {
  workspaceId: number;
}) {
  const [data, setData] = useState<ReservationLabel>({
    workspaceId: workspaceId,
    name: "",
    description: "",
    emojiId: "1f600",
  });
  const [loading, setLoading] = useState({
    save: false,
    delete: false,
  });

  const router = useRouter();

  const handleChange = (key: keyof typeof data, value: string) => {
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
      toast.success("Saved reservation label saved successfully");

      // Refresh the page
      router.refresh();
    } else {
      toast.error("Error saving reservation label: " + response.message);
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
        <h1 className="text-title-2xl">Add reservation label</h1>
      </div>

      <div className="border-b border-primary"></div>

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

      <div className="flex flex-col gap-3">
        <div>
          <label className="text-subtitle-sm text-primary">Description</label>
          <p className="text-tertiary text-body-xs font-normal">
            Used to identify when this label is applied
          </p>
        </div>
        <div>
          <VariableTextarea
            value={data.description}
            setValue={(e) => handleChange("description", e)}
          />
        </div>
      </div>

      <div className="flex items-center justify-end">
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
