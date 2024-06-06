"use client";

import { usePathname } from "next/navigation";
import { SettingsSideBarOption } from "./SettingsSideBarOption";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const SettingsSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="h-screen bg-primary-subtle w-[280px] border-e border-primary overflow-y-auto px-2">
      <h2 className="py-8 px-4 text-title-md">Settings</h2>

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
        path="/settings/personal-notifications"
        name="Personal notifications"
        selected={pathname === "/settings/personal-notifications"}
      />
      <SettingsSideBarOption
        path="/settings/signature"
        name="Signature"
        selected={pathname === "/settings/signature"}
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
        path="/settings/general"
        name="General"
        selected={pathname === "/settings/general"}
      />
      <SettingsSideBarOption
        path="/settings/members"
        name="Members"
        selected={
          pathname === "/settings/members" ||
          pathname === "/settings/members/add"
        }
      />
      <SettingsSideBarOption
        path="/settings/teams"
        name="Teams"
        selected={
          pathname === "/settings/teams" || pathname === "/settings/teams/add"
        }
      />
      <SettingsSideBarOption
        path="/settings/integrations"
        name="Integrations"
        selected={pathname === "/settings/integrations"}
      />

      {/* Connected Channels */}
      <Accordion type="single" collapsible defaultValue="connected-channels">
        <AccordionItem value="connected-channels">
          <AccordionTrigger className="px-4 mt-8 rounded-md py-0.5">
            Connected Channels
          </AccordionTrigger>
          <AccordionContent className="pb-0 pt-2">
            <SettingsSideBarOption
              path="/settings/connected-channels/airbnb"
              name="Airbnb"
              selected={pathname === "/settings/connected-channels/airbnb"}
            />
            <SettingsSideBarOption
              path="/settings/connected-channels/pms"
              name="PMS"
              selected={pathname === "/settings/connected-channels/pms"}
            />
            <SettingsSideBarOption
              path="/settings/connected-channels/email"
              name="Email"
              selected={pathname === "/settings/connected-channels/email"}
            />
            <SettingsSideBarOption
              path="/settings/connected-channels/whatsapp"
              name="WhatsApp"
              selected={pathname === "/settings/connected-channels/whatsapp"}
            />
            <SettingsSideBarOption
              path="/settings/connected-channels/sms"
              name="SMS"
              selected={pathname === "/settings/connected-channels/sms"}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Inbox Configuration */}
      <Accordion type="single" collapsible defaultValue="inbox-configuration">
        <AccordionItem value="inbox-configuration">
          <AccordionTrigger className="px-4 mt-[28px] rounded-md py-0.5">
            Inbox Configuration
          </AccordionTrigger>
          <AccordionContent className="pb-0 pt-2">
            <SettingsSideBarOption
              path="/settings/inbox-configuration/general"
              name="General"
              selected={pathname === "/settings/inbox-configuration/general"}
            />
            <SettingsSideBarOption
              path="/settings/inbox-configuration/ai-settings"
              name="AI Settings"
              selected={
                pathname === "/settings/inbox-configuration/ai-settings"
              }
            />
            <SettingsSideBarOption
              path="/settings/inbox-configuration/reservation-labels"
              name="Reservation Labels"
              selected={
                pathname === "/settings/inbox-configuration/reservation-labels"
              }
            />
            <SettingsSideBarOption
              path="/settings/inbox-configuration/conversation-tags"
              name="Conversation Tags"
              selected={
                pathname === "/settings/inbox-configuration/conversation-tags"
              }
            />
            <SettingsSideBarOption
              path="/settings/inbox-configuration/saved-replies"
              name="Saved Replies"
              selected={
                pathname === "/settings/inbox-configuration/saved-replies"
              }
            />
            <SettingsSideBarOption
              path="/settings/inbox-configuration/sla"
              name="SLA"
              selected={pathname === "/settings/inbox-configuration/sla"}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Add accordian */}
      <div></div>
    </div>
  );
};
