"use client";

import { BreezewayIcon, UploadCloudIcon } from "@/components/icons/CustomIcons";
import { Button } from "@/components/ui/button";
import { BreezewayConnection, BreezewayLabel } from "@/lib/types";
import { useState } from "react";
import {
  saveBreezewayConnection,
  removeBreezewayConnection,
} from "@/app/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MapToDropdown } from "./mapToDropdown";
import { SettingsContainer } from "@/components/custom/SettingsContainer";

const options: { label: string; value: BreezewayLabel }[] = [
  { label: "Map to Cleaning in Breezeway", value: "Cleaning" },
  { label: "Map to Maintenance in Breezeway", value: "Maintenance" },
  { label: "Map to Inspections in Breezeway", value: "Inspections" },
];

export default function EditBreezewayContent({
  connection,
}: {
  connection: BreezewayConnection;
}) {
  const [data, setData] = useState<BreezewayConnection["options"]>(
    connection.options
  );
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState({
    save: false,
    remove: false,
  });

  const router = useRouter();

  if (!data) {
    return null;
  }

  const handleChange = (key: keyof typeof data, value: string) => {
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
    const repsonse = await saveBreezewayConnection({
      ...connection,
      options: data,
    });
    setLoading({ ...loading, save: false });

    if (repsonse.success) {
      toast.success("Breezeway integration saved successfully");

      // refresh the page
      router.refresh();
    } else {
      toast.error("Error saving Breezeway integration: " + repsonse.message);
    }
  };

  const handleRemoveConnection = async () => {
    setLoading({ ...loading, remove: true });
    const repsonse = await removeBreezewayConnection({
      ...connection,
    });

    setLoading({ ...loading, remove: true });

    if (repsonse.success) {
      toast.success("Breezeway integration removed successfully");

      // refresh the page
      router.push(`../integrations`);
    } else {
      toast.error("Error removing Breezeway integration: " + repsonse.message);
    }
  };

  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-subtitle-sm">Task categories</p>
          <p className="text-body-xs text-tertiary font-normal mt-1">
            Map HostAI task categories to departments in Breezeway
          </p>
        </div>
        <div className="flex flex-col gap-3 border border-secondary rounded-md p-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-subtitle-xs">
                When a task is labelled as{" "}
                <span className="text-success">Cleaning</span> in HostAI...
              </p>
            </div>

            <MapToDropdown
              options={options}
              onChange={(e) => handleChange("labelledCleaning", e)}
              value={data.labelledCleaning}
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-subtitle-xs">
                When a task is labelled as{" "}
                <span className="text-link">Maintenance</span> in HostAI...
              </p>
            </div>

            <MapToDropdown
              options={options}
              onChange={(e) => handleChange("labelledMaintenance", e)}
              value={data.labelledMaintenance}
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-subtitle-xs">
                When a task is labelled as{" "}
                <span className="text-error">Saftey</span> in HostAI...
              </p>
            </div>

            <MapToDropdown
              options={options}
              onChange={(e) => handleChange("labelledSafety", e)}
              value={data.labelledSafety}
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-subtitle-xs">
                When a task is labelled as{" "}
                <span className="text-orange-500">Supplies</span> in HostAI...
              </p>
            </div>

            <MapToDropdown
              options={options}
              onChange={(e) => handleChange("labelledSupplies", e)}
              value={data.labelledSupplies}
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-subtitle-xs">
                When a task is labelled as{" "}
                <span className="text-disabled">Other</span> in HostAI...
              </p>
            </div>

            <MapToDropdown
              options={options}
              onChange={(e) => handleChange("labelledOther", e)}
              value={data.labelledOther}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-subtitle-sm">People</p>
          <p className="text-body-xs text-tertiary font-normal mt-1">
            Assign tasks to Breezeway members from HostAI
          </p>
        </div>

        <SettingsContainer
          title="Import people from Breezeway"
          description="Import people from Breezeway to assign tasks to them in HostAI"
          icon={<UploadCloudIcon className="text-icon-tertiary" />}
          action={
            <Button variant={"outline"}>
              <div className="flex gap-2 items-center">
                <BreezewayIcon />
                Import people
              </div>
            </Button>
          }
        />
      </div>
      <div className="flex justify-between items-center">
        <AlertDialog open={isOpen}>
          <Button
            variant="outline"
            onClick={() => setIsOpen(true)}
            disabled={loading.remove}
          >
            <div className="flex gap-2 items-center">
              <BreezewayIcon />
              {loading.remove ? "Removing..." : "Remove Breezeway integration"}
            </div>
          </Button>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to remove Breezeway?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action will disconnect your Breezeway account from HostAI
                and cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button
                variant={"secondary"}
                size={"sm"}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  handleRemoveConnection();
                  setIsOpen(false);
                }}
              >
                Remove Breezeway
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

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
