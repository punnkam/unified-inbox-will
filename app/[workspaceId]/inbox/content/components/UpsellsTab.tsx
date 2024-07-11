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
  upsells,
  updateUpsellData,
  onSendMessage,
  messages,
  guestData,
}: {
  upsells: UpsellItem[];
  updateUpsellData: (
    upsellId: string,
    key: keyof UpsellItem,
    value: UpsellItem[keyof UpsellItem]
  ) => void;
  onSendMessage?: (message: MessageItem) => void;
  messages?: MessageItem[];
  guestData?: Guest;
}) => {
  // Filter out the upsells that are sent vs suggested
  const sentUpsells = upsells.filter(
    (upsell) => upsell.status !== UpsellStatusEnum.NotSent
  );
  const suggestedUpsells = upsells.filter(
    (upsell) => upsell.status === UpsellStatusEnum.NotSent
  );

  return (
    <div className="flex flex-col gap-5">
      {sentUpsells.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-body-xs text-secondary">Sent</p>
          {sentUpsells.map((upsell) => (
            <ReusableCard
              key={upsell.id}
              title={upsell.type}
              description={upsell.finalMessage}
              type="upsell"
              upsellData={upsell}
              onUpdateStatus={(newStatus: UpsellStatusEnum) =>
                updateUpsellData(upsell.id, "status", newStatus)
              }
            />
          ))}
        </div>
      )}
      {suggestedUpsells.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-body-xs text-secondary">Suggested</p>
          {suggestedUpsells.map((upsell) => (
            <ReusableCard
              key={upsell.id}
              title={upsell.type}
              description={upsell.finalMessage}
              type="upsell"
              upsellData={upsell}
              onUpdateStatus={(newStatus: UpsellStatusEnum) =>
                updateUpsellData(upsell.id, "status", newStatus)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};
