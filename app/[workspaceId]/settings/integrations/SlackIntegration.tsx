"use server";

import { Button } from "@/components/ui/button";
import { SlackIcon } from "@/components/icons/CustomIcons";
import Link from "next/link";
import { fetchSlackConnections } from "@/app/actions";

export const SlackIntegration = async ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  const connections = await fetchSlackConnections(workspaceId);
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
              <SlackIcon />
            </div>
          </div>
          <div>
            <p className="text-subtitle-xs">
              You have a Slack workspace connected to HostAI
            </p>
            <p className="text-body-2xs font-normal text-tertiary">
              Slack can be used to notify your whole team of activity you care
              about in HostAI
            </p>
          </div>
        </div>
        <div>
          <Link href="./integrations/slack/">
            <Button variant={"outline"} size={"sm"}>
              Edit
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center ">
      <div>
        <p className="text-subtitle-xs">
          You don’t have a Slack workspace connected to HostAI
        </p>
        <p className="text-body-2xs font-normal text-tertiary">
          Slack can be used to notify your whole team of activity you care about
          in HostAI
        </p>
      </div>
      <div>
        <a href={`#`}>
          <Button variant={"outline"}>
            <div className="flex gap-2 items-center">
              <SlackIcon />
              Connect Slack account
            </div>
          </Button>
        </a>
      </div>
    </div>
  );
};
