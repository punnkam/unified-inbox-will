import { SlackIntegration } from "./SlackIntegration";
import { BreezewayIntegration } from "./BreezewayIntegration";
import { Suspense } from "react";

export default async function IntegrationsPage({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) {
  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-3">
          <h1 className="text-title-2xl">Integrations</h1>
          <p className="text-subtitle-sm text-tertiary">
            Enhance your HostAI experience with a variety of add-ons and
            integrations.
          </p>
        </div>
      </div>
      <div className="border-b border-primary"></div>

      <div className="flex flex-col gap-5">
        <p className="text-title-lg text-tertiary">Slack</p>

        <div className="border border-secondary rounded-md p-6">
          <Suspense fallback={<div>Loading...</div>}>
            <SlackIntegration workspaceId={workspaceId} />
          </Suspense>
        </div>
      </div>

      <div className="border-b border-primary"></div>

      <div className="flex flex-col gap-5">
        <p className="text-title-lg text-tertiary">Breezeway</p>

        <div className="border border-secondary rounded-md p-6">
          <Suspense fallback={<div>Loading...</div>}>
            <BreezewayIntegration workspaceId={workspaceId} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
