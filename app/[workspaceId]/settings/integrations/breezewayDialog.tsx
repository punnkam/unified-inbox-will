"use client";

import { BreezewayIcon } from "@/components/icons/CustomIcons";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createBreezewayConnection } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const BreezewayDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    clientID: "",
    clientSecret: "",
  });

  const router = useRouter();

  const handleConnectBreezeway = async () => {
    setLoading(true);
    const response = await createBreezewayConnection(
      data.clientID,
      data.clientSecret
    );

    if (response.success) {
      toast.success("Breezeway account connected successfully");
      setIsOpen(false);

      // Refresh the page to fetch the updated connections
      router.refresh();
    } else {
      toast.error("Failed to connect Breezeway account");
    }

    setLoading(false);
  };

  return (
    <AlertDialog open={isOpen}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        disabled={loading}
      >
        <div className="flex gap-2 items-center">
          <BreezewayIcon />
          Connect Breezeway account
        </div>
      </Button>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Connect your Breezeway account</AlertDialogTitle>
          <AlertDialogDescription>
            Please contact your Breezeway rep to get this information.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogDescription className="flex flex-col gap-3">
          <label
            htmlFor="breezeway-client-id"
            className="text-subtitle-sm text-primary font-medium"
          >
            ClientID
          </label>
          <Input
            id="breezeway-client-id"
            placeholder="9496125101"
            onChange={(e) => setData({ ...data, clientID: e.target.value })}
          />

          <label
            htmlFor="breezeway-client-id"
            className="text-subtitle-sm text-primary font-medium"
          >
            ClientSecret
          </label>
          <Input
            id="breezeway-client-secret"
            placeholder="9496125101"
            onChange={(e) => setData({ ...data, clientSecret: e.target.value })}
          />
        </AlertDialogDescription>
        <AlertDialogFooter>
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={() => {
              handleConnectBreezeway();
            }}
            disabled={loading || !data.clientID || !data.clientSecret}
          >
            {loading ? "Connecting..." : "Connect"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
