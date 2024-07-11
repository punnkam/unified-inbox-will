import {
  Conversation,
  MessageItem,
  Guest,
  UpsellStatusEnum,
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
  const upsells = conversationData.reservation.upsells || [];

  let sentUpsells: any[] = [];
  let suggestedUpsells: any[] = [];

  upsells.forEach((upsell) => {
    if (upsell.status == UpsellStatusEnum.NotSent) {
      suggestedUpsells.push(upsell);
    } else {
      sentUpsells.push(upsell);
    }
  });

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
          />
        ))}
      </div>
    </div>
  );
};
