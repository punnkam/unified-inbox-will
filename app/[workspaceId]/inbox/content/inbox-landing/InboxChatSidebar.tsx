"use client";

import { usePathname } from "next/navigation";
import { InboxSideBarOption } from "./InboxSideBarOption";
import {
  ArrowNarrowLeft,
  AtSignIcon,
  ChevronSelectorVertical,
  Edit05Icon,
  FilterLinesIcon,
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
import {
  fakeListingGroupsData,
  fakeReservationLabels,
} from "@/lib/realDataSchema";
import { SidebarTrigger } from "../../SidebarTrigger";
import Link from "next/link";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export const InboxChatSidebar = () => {
  const pathname = usePathname();

  const workspaceId = pathname.split("/")[1];

  return (
    <div className="h-screen flex flex-col justify-between bg-primary-subtle w-[calc(100vw-74px)] md:w-[280px] md:min-w-[280px] border-e border-primary overflow-y-auto px-2">
      <div className="flex flex-col gap-5 px-5 pt-8 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <div className="flex gap-2 items-center">
              <Link
                className="size-5 flex items-center justify-center hover:bg-hover rouneded-xl"
                href="../"
              >
                <ArrowNarrowLeft className="text-icon-secondary size-3" />
              </Link>
              <h2 className="text-title-lg">All Conversations</h2>
            </div>
          </div>
          <Button variant={"ghost"} size={"iconSm"}>
            <FilterLinesIcon className="text-icon-tertiary" />
          </Button>
        </div>

        <div className="flex items-center relative w-full sm:w-fit">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </span>
          <Input
            placeholder="Search"
            // value={
            //   (table.getColumn("guestName")?.getFilterValue() as string) ?? ""
            // }
            // onChange={(event) =>
            //   table.getColumn("guestName")?.setFilterValue(event.target.value)
            // }
            className="pl-10 rounded-xl w-full"
          />
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
                    {fakeReservationLabels.map((label) => (
                      <InboxSideBarOption
                        key={label.id}
                        path={`/${workspaceId}/inbox/reservation-label/${label.id}`}
                        name={label.name}
                        selected={pathname.startsWith(
                          `/${workspaceId}/inbox/reservation-label/${label.id}`
                        )}
                        emoji={label.emojiId}
                      />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion
                type="single"
                collapsible
                defaultValue="listing-groups"
              >
                <AccordionItem value="listing-groups">
                  <AccordionTrigger className="px-1 rounded-md py-0.5">
                    Listing groups
                  </AccordionTrigger>

                  <AccordionContent className="pb-0 pt-2">
                    {fakeListingGroupsData.map((group) => (
                      <InboxSideBarOption
                        key={group.id}
                        path={`/${workspaceId}/inbox/listing-group/${group.id}`}
                        name={group.name}
                        selected={pathname.startsWith(
                          `/${workspaceId}/inbox/listing-group/${group.id}`
                        )}
                        color={group.color}
                      />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
