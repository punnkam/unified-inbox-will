import {
  ArrowNarrowLeft,
  InfoCircleIcon,
} from "@/components/icons/CustomIcons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchBreezewayConnections } from "@/app/actions";
import EditBreezewayContent from "./content";
import moment from "moment";

export default async function EditBreezewayPage({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) {
  const breezewayConnections = await fetchBreezewayConnections(workspaceId);

  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex flex-col gap-4">
        <Link href="../integrations">
          <Button
            variant="link"
            className="text-tertiary flex items-center gap-2 p-2"
          >
            <ArrowNarrowLeft />
            All Integrations
          </Button>
        </Link>
        <h1 className="text-title-2xl">Breezeway</h1>
        <p className="text-body-xs font-normal text-tertiary flex items-center gap-1">
          <InfoCircleIcon />
          Added to the {breezewayConnections[0].name} Breezeway account{" "}
          {moment(breezewayConnections[0].connectionDate).fromNow()}
        </p>
      </div>

      <div className="border-b border-primary"></div>

      <EditBreezewayContent connection={breezewayConnections[0]} />
    </div>
  );
}
