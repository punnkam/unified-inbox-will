"use client";

import { usePathname } from "next/navigation";
import { InboxSideBarOption } from "./InboxSideBarOption";
import {
  AtSignIcon,
  ChevronSelectorVertical,
  Edit05Icon,
  LugageIcon,
  MessageChatCircleIcon,
  User03Icon,
} from "@/components/icons/CustomIcons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { fakeListingGroupsData, fakeReservationLabels } from "@/lib/types";
import { SidebarTrigger } from "./SidebarTrigger";

export const InboxSidebar = () => {
  const pathname = usePathname();

  const workspaceId = pathname.split("/")[1];

  return (
    <div className="h-screen bg-primary-subtle w-[calc(100vw-74px)] md:w-[280px] md:min-w-[280px] border-e border-primary overflow-y-auto px-2 py-6">
      <div className="pb-6 px-2 flex items-center gap-3">
        <div className="p-[6px] flex items-center justify-between w-full rounded-md hover:bg-hover hover:cursor-pointer">
          <div className="flex gap-[6px] items-center">
            <div className="bg-brand rounded-lg size-6 flex items-center justify-center">
              <LugageIcon className="text-icon-primary-inverse" />
            </div>
            <h2 className="text-title-md">Guest inbox</h2>
          </div>
          <ChevronSelectorVertical className="text-icon-tertiary w-[7.5px] h-[12px]" />
        </div>
        <Button variant={"ghost"} size={"iconSm"}>
          <Edit05Icon className="text-icon-tertiary w-[15px] h-[15px]" />
        </Button>
      </div>

      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-[32px]">
          <div>
            <InboxSideBarOption
              path={`/${workspaceId}/inbox/all-conversations`}
              name="All conversations"
              selected={pathname.startsWith(
                `/${workspaceId}/inbox/all-conversations`
              )}
              icon={<MessageChatCircleIcon />}
              count={13}
            />
            <InboxSideBarOption
              path={`/${workspaceId}/inbox/your-conversations`}
              name="Your conversations"
              selected={pathname.startsWith(
                `/${workspaceId}/inbox/your-conversations`
              )}
              image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <InboxSideBarOption
              path={`/${workspaceId}/inbox/unassigned-conversations`}
              name="Unassigned conversations"
              selected={pathname.startsWith(
                `/${workspaceId}/inbox/unassigned-conversations`
              )}
              icon={<User03Icon />}
            />
          </div>

          <div className="flex flex-col gap-[28px]">
            <Accordion
              type="single"
              collapsible
              defaultValue="reservation-labels"
            >
              <AccordionItem value="reservation-labels">
                <AccordionTrigger className="px-1 rounded-md py-0.5">
                  Reservation labels
                </AccordionTrigger>
                <AccordionContent className="pb-0 pt-2">
                  {/* Using reglar emojis for now - implement this however */}
                  {fakeReservationLabels.map((label) => (
                    <InboxSideBarOption
                      key={label.id}
                      path={`/${workspaceId}/inbox/reservation-labels/res_${label.id}`}
                      name={label.name}
                      selected={pathname.startsWith(
                        `/${workspaceId}/inbox/reservation-labels/res_${label.id}`
                      )}
                      emoji={label.emojiId}
                    />
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible defaultValue="listing-groups">
              <AccordionItem value="listing-groups">
                <AccordionTrigger className="px-1 rounded-md py-0.5">
                  Listing groups
                </AccordionTrigger>

                <AccordionContent className="pb-0 pt-2">
                  {fakeListingGroupsData.map((group) => (
                    <InboxSideBarOption
                      key={group.id}
                      path={`/${workspaceId}/inbox/listing-groups/group_${group.id}`}
                      name={group.name}
                      selected={pathname.startsWith(
                        `/${workspaceId}/inbox/listing-groups/group_${group.id}`
                      )}
                      color={group.color}
                    />
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <SidebarTrigger />
      </div>
    </div>
  );
};
