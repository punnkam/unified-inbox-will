"use client";
import { Input } from "@/components/ui/input";
import { SavedReply } from "@/lib/types";
import { useState } from "react";
import { ArrowNarrowLeft } from "@/components/icons/CustomIcons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { saveSavedReply } from "@/app/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { VariableTextarea } from "../VariableTextarea";

export default function SavedReplyContent({
  workspaceId,
}: {
  workspaceId: number;
}) {
  const [data, setData] = useState<SavedReply>({
    workspaceId: workspaceId,
    name: "",
    reply: "",
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
    const response = await saveSavedReply(data);

    setLoading({ ...loading, save: false });

    if (response.success) {
      toast.success("Saved reply saved successfully");

      // Refresh the page
      router.refresh();
    } else {
      toast.error("Error saving saved reply: " + response.message);
    }
  };

  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex flex-col gap-4">
        <Link href="../saved-replies">
          <Button
            variant="link"
            className="text-tertiary flex items-center gap-2 p-2"
          >
            <ArrowNarrowLeft />
            All saved replies
          </Button>
        </Link>
        <h1 className="text-title-2xl">Add saved reply</h1>
      </div>

      <div className="border-b border-primary"></div>

      <div className="flex flex-col gap-3">
        <p className="text-subtitle-sm">Saved reply name</p>

        <Input
          placeholder="Early Check-In"
          value={data.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-subtitle-sm">Reply</p>

        <div>
          <VariableTextarea
            value={data.reply}
            setValue={(e) => handleChange("reply", e)}
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
