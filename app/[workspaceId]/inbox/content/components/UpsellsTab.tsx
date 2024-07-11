import React, { useState } from "react";
import {
  Conversation,
  MessageItem,
  Guest,
  UpsellStatusEnum,
  UpsellItem,
} from "@/lib/realDataSchema";
import { ReusableCard } from "./ReusableCard";

export const UpsellsTab = ({
  conversationData,
  onSendMessage,
  messages,
  guestData,
}: {
  conversationData: Conversation;
  onSendMessage?: (message: MessageItem) => void;
  messages?: MessageItem[];
  guestData?: Guest;
}) => {
  // Store the upsells in state so we can update them live
  const [upsells, setUpsells] = useState<UpsellItem[]>(
    conversationData.reservation.upsells || []
  );

  // handler to update an upsell status
  const updateUpsellData = (
    upsellId: string,
    key: keyof UpsellItem,
    value: UpsellItem[keyof UpsellItem]
  ) => {
    // TODO API: handle updating an upsell status on backend

    setUpsells((prevUpsells) =>
      prevUpsells.map((upsell) =>
        upsell.id === upsellId ? { ...upsell, [key]: value } : upsell
      )
    );
  };

  // Filter out the upsells that are sent vs suggested
  const sentUpsells = upsells.filter(
    (upsell) => upsell.status !== UpsellStatusEnum.NotSent
  );
  const suggestedUpsells = upsells.filter(
    (upsell) => upsell.status === UpsellStatusEnum.NotSent
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <p className="text-body-xs text-secondary">Sent</p>
        {sentUpsells.map((upsell) => (
          <ReusableCard
            key={upsell.id}
            title={upsell.type}
            description={upsell.finalMessage}
            type="upsell"
            upsellAcceptStatus={upsell.status}
            onUpdateStatus={(newStatus: UpsellStatusEnum) =>
              updateUpsellData(upsell.id, "status", newStatus)
            }
          />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-body-xs text-secondary">Suggested</p>
        {suggestedUpsells.map((upsell) => (
          <ReusableCard
            key={upsell.id}
            title={upsell.type}
            description={upsell.finalMessage}
            type="upsell"
            upsellAcceptStatus={upsell.status}
            onUpdateStatus={(newStatus: UpsellStatusEnum) =>
              updateUpsellData(upsell.id, "status", newStatus)
            }
          />
        ))}
      </div>
    </div>
  );
};
