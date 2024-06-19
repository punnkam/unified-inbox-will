"use client";

import { usePathname } from "next/navigation";
import { SettingsSideBarOption } from "./SettingsSideBarOption";
import {
  PuzzlePieceIcon,
  Settings04Icon,
} from "@/components/icons/CustomIcons";
import { SettingsSidebarHeader } from "@/components/custom/SettingsSidebarHeader";

export const SettingsSidebar = () => {
  const pathname = usePathname();

  const workspaceId = pathname.split("/")[1];

  return (
    <div className="h-screen bg-primary-subtle w-[280px] min-w-[280px] border-e border-primary overflow-y-auto px-2 py-8">
      <h2 className="pb-8 px-4 text-title-md">Settings</h2>
      {/* User Card */}
      <div className="flex px-4 pb-2 gap-2 mb-1">
        <img
          src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="User Image"
          className="rounded-full w-[30px] h-[30px] object-cover"
        />
        <div className="flex flex-col gap-[2px]">
          <p className="text-subtitle-2xs">Cole Rubin</p>
          <p className="text-subtitle-3xs text-tertiary">Account</p>
        </div>
      </div>
      <SettingsSideBarOption
        path={`/${workspaceId}/settings/personal-notifications`}
        name="Personal notifications"
        selected={pathname.startsWith(
          `/${workspaceId}/settings/personal-notifications`
        )}
      />
      <SettingsSideBarOption
        path={`/${workspaceId}/settings/signature`}
        name="Signature"
        selected={pathname.startsWith(`/${workspaceId}/settings/signature`)}
      />
      {/* Workspace Card */}
      <div className="flex px-4 pb-2 gap-2 mt-6 mb-1">
        <img
          src="https://plus.unsplash.com/premium_photo-1661914978519-52a11fe159a7?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Workspace Image"
          className="rounded-[3px] w-[30px] h-[30px] object-cover"
        />
        <div className="flex flex-col gap-[2px]">
          <p className="text-subtitle-2xs">Ekwede Group</p>
          <p className="text-subtitle-3xs text-tertiary">Workspace</p>
        </div>
      </div>
      <SettingsSideBarOption
        path={`/${workspaceId}/settings/general`}
        name="General"
        selected={pathname.startsWith(`/${workspaceId}/settings/general`)}
      />
      <SettingsSideBarOption
        path={`/${workspaceId}/settings/members/`}
        name="Members"
        selected={pathname.startsWith(`/${workspaceId}/settings/members`)}
      />
      <SettingsSideBarOption
        path={`/${workspaceId}/settings/teams`}
        name="Teams"
        selected={pathname.startsWith(`/${workspaceId}/settings/teams`)}
      />
      <SettingsSideBarOption
        path={`/${workspaceId}/settings/integrations`}
        name="Integrations"
        selected={pathname.startsWith(`/${workspaceId}/settings/integrations`)}
      />

      <div className="flex flex-col gap-[28px] mt-[32px]">
        <div>
          {/* channel connector */}
          <SettingsSidebarHeader
            title="Channel Connector"
            icon={<PuzzlePieceIcon />}
          />

          <SettingsSideBarOption
            path={`/${workspaceId}/settings/connected-channels/airbnb`}
            name="Airbnb"
            selected={pathname.startsWith(
              `/${workspaceId}/settings/connected-channels/airbnb`
            )}
          />
          <SettingsSideBarOption
            path={`/${workspaceId}/settings/connected-channels/pms`}
            name="PMS"
            selected={pathname.startsWith(
              `/${workspaceId}/settings/connected-channels/pms`
            )}
          />
          <SettingsSideBarOption
            path={`/${workspaceId}/settings/connected-channels/email`}
            name="Email"
            selected={pathname.startsWith(
              `/${workspaceId}/settings/connected-channels/email`
            )}
          />
          <SettingsSideBarOption
            path={`/${workspaceId}/settings/connected-channels/whatsapp`}
            name="WhatsApp"
            selected={pathname.startsWith(
              `/${workspaceId}/settings/connected-channels/whatsapp`
            )}
          />
          <SettingsSideBarOption
            path={`/${workspaceId}/settings/connected-channels/sms`}
            name="SMS"
            selected={pathname.startsWith(
              `/${workspaceId}/settings/connected-channels/sms`
            )}
          />
        </div>

        <div>
          {/* Inbox Configuration */}
          <SettingsSidebarHeader
            title="Inbox Configuration"
            icon={<Settings04Icon />}
          />
          <SettingsSideBarOption
            path={`/${workspaceId}/settings/inbox-configuration/general`}
            name="General"
            selected={pathname.startsWith(
              `/${workspaceId}/settings/inbox-configuration/general`
            )}
          />
          <SettingsSideBarOption
            path={`/${workspaceId}/settings/inbox-configuration/ai-settings`}
            name="AI Settings"
            selected={pathname.startsWith(
              `/${workspaceId}/settings/inbox-configuration/ai-settings`
            )}
          />
          <SettingsSideBarOption
            path={`/${workspaceId}/settings/inbox-configuration/reservation-labels`}
            name="Reservation Labels"
            selected={pathname.startsWith(
              `/${workspaceId}/settings/inbox-configuration/reservation-labels`
            )}
          />
          <SettingsSideBarOption
            path={`/${workspaceId}/settings/inbox-configuration/conversation-tags`}
            name="Conversation Tags"
            selected={pathname.startsWith(
              `/${workspaceId}/settings/inbox-configuration/conversation-tags`
            )}
          />
          <SettingsSideBarOption
            path={`/${workspaceId}/settings/inbox-configuration/saved-replies`}
            name="Saved Replies"
            selected={pathname.startsWith(
              `/${workspaceId}/settings/inbox-configuration/saved-replies`
            )}
          />
          <SettingsSideBarOption
            path={`/${workspaceId}/settings/inbox-configuration/sla`}
            name="SLA"
            selected={pathname.startsWith(
              `/${workspaceId}/settings/inbox-configuration/sla`
            )}
          />
        </div>
      </div>
    </div>
  );
};
