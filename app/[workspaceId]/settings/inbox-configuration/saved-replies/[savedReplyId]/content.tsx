"use client";
import { Input } from "@/components/ui/input";
import { SavedReply } from "@/lib/types";
import { useState } from "react";
import { ArrowNarrowLeft } from "@/components/icons/CustomIcons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { deleteSavedReply, saveSavedReply } from "@/app/actions";
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

export default function SavedReplyContent({
  savedReply,
}: {
  savedReply: SavedReply;
}) {
  const [data, setData] = useState<SavedReply>({
    ...savedReply,
  });
  const [loading, setLoading] = useState({
    save: false,
    delete: false,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleDelete = async () => {
    setIsDialogOpen(false);
    setLoading({ ...loading, delete: true });

    // Call your API here
    const response = await deleteSavedReply(savedReply);

    setLoading({ ...loading, delete: false });

    if (response.success) {
      toast.success("Saved reply deleted successfully");

      // Refresh the page
      router.push("../saved-replies");
    } else {
      toast.error("Error deleting saved reply: " + response.message);
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
        <h1 className="text-title-2xl">Edit saved reply</h1>
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

      <div className="flex items-center justify-between">
        <AlertDialog open={isDialogOpen}>
          <Button
            variant="destructive"
            disabled={loading.delete}
            onClick={() => setIsDialogOpen(true)}
          >
            {loading.delete ? "Deleting reply..." : "Delete reply"}
          </Button>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete saved reply?{" "}
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
                Delete saved reply
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
