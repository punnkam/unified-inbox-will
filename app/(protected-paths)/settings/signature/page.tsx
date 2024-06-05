"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function PersonalNotificationsPage() {
  const [signature, setSignature] = useState("");

  const handleSave = () => {
    // Do something with the signature here
    console.log("Save signature", signature);
  };

  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex flex-col gap-3">
        <h1 className="text-title-2xl">Your signature</h1>
        <p className="text-subtitle-sm text-tertiary">
          This signature will be added to the bottom of all messages you answer.
        </p>
      </div>

      <div className="border-b stroke-primary"></div>

      <div className="flex flex-col gap-3">
        <label htmlFor="signature-input" className="text-title-sm text-primary">
          Signature
        </label>
        <Textarea
          id="signature-input"
          placeholder="Best, Pun"
          className="text-body-sm resize-none"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
        />
      </div>
      <Button className="w-fit" disabled={signature == ""} onClick={handleSave}>
        Save
      </Button>
    </div>
  );
}
