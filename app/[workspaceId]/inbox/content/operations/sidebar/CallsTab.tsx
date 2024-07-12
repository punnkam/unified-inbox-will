import React from "react";
import { Call } from "@/lib/realDataSchema";
import { ReusableCard } from "./ReusableCard";

export const CallsTab = ({ calls }: { calls: Call[] }) => {
  return (
    <div className="flex flex-col gap-2">
      {calls.length > 0 &&
        calls.map((call) => (
          <ReusableCard
            key={call.callId}
            title={`Guest called ${call.userData?.name}`}
            description={`${call.userData?.name?.split(" ")[0]} and ${
              call.guestName?.split(" ")[0]
            } talked for 30 min`}
            type="call"
            callData={call}
          />
        ))}
    </div>
  );
};
