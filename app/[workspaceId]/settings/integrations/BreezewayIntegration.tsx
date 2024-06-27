"use server";

import { Button } from "@/components/ui/button";
import { BreezewayIcon } from "@/components/icons/CustomIcons";
import { fetchBreezewayConnections } from "@/app/actions";
import Link from "next/link";
import { formatDistance } from "date-fns";
import { BreezewayDialog } from "./breezewayDialog";

export const BreezewayIntegration = async ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  const connections = await fetchBreezewayConnections(workspaceId);
  const connection = connections[0];

  if (connection && connection.connected) {
    return (
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className="relative">
            <img
              src={connection.image}
              alt={connection.name}
              className="w-9 h-9 rounded-full object-cover"
            />
            <div className="absolute bottom-0 right-0 h-[14px] w-[14px] flex items-center justify-center rounded-full bg-white p-0.5">
              <BreezewayIcon className="h-3 w-3" />
            </div>
          </div>
          <div>
            <p className="text-subtitle-xs">{connection.name}</p>
            <p className="text-body-2xs font-normal text-tertiary">
              Added by you{" "}
              {formatDistance(new Date(connection.connectionDate), new Date(), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        <div>
          <Link href="./integrations/breezeway/">
            <Button variant={"outline"} size={"sm"}>
              Edit
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="text-subtitle-xs">Connect Breezeway to HostAI</p>
        <p className="text-body-2xs font-normal text-tertiary">
          Breezeway can be used to notify your whole team of activity you care
          about in HostAI
        </p>
      </div>
      <div>
        <BreezewayDialog />
      </div>
    </div>
  );
};
