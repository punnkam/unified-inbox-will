"use client";

import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useDebouncedSave } from "@/lib/hooks/useDebouncedSave";
import { saveSignature } from "@/app/actions";

interface Data {
  signature: string;
}

export default function SignatureContent({
  signature,
  workspaceId,
}: {
  signature: string;
  workspaceId: number;
}) {
  const initialData: Data = {
    signature: signature,
  };

  const saveData = async (data: Data) => {
    // Call API to save the data
    const response = await saveSignature(workspaceId, data.signature);

    if (!response.success) {
      toast.error("Error saving signature: " + response.message);
      return;
    }

    toast.success("Signature saved successfully");
  };

  const { data, handleChange, setData } = useDebouncedSave<Data>({
    initialData,
    saveData,
  });

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
