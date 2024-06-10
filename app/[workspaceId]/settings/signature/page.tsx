"use client";

import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { toast } from "sonner";
import { useDebouncedSave } from "@/lib/hooks/useDebouncedSave";

interface Data {
  signature: string;
}

export default function PersonalNotificationsPage() {
  const initialData: Data = {
    signature: "",
  };

  const saveData = (data: Data) => {
    // Call API to save the data
    console.log("Saving data", data);

    setTimeout(() => {
      console.log("Exmaple API delay", data);
      toast.success("Settings saved successfully");
    }, 1000);
  };

  const { data, handleChange, setData } = useDebouncedSave<Data>({
    initialData,
    saveData,
  });

  useEffect(() => {
    // Fetch/Load the data into state here
    setData({
      signature: "Best, Will",
    });
  }, [setData]);

  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex flex-col gap-3">
        <h1 className="text-title-2xl">Your signature</h1>
        <p className="text-subtitle-sm text-tertiary">
          This signature will be added to the bottom of all messages you answer.
        </p>
      </div>

      <div className="border-b border-primary"></div>

      <div className="flex flex-col gap-3">
        <label htmlFor="signature-input" className="text-title-sm text-primary">
          Signature
        </label>
        <Textarea
          id="signature-input"
          placeholder="Best, Pun"
          className="resize-none"
          value={data.signature}
          onChange={(e) => handleChange("signature", e.target.value)}
        />
      </div>
    </div>
  );
}
