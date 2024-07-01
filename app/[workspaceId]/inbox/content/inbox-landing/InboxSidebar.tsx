"use client";

import { usePathname } from "next/navigation";
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
import {
  fakeListingGroupsData,
  fakeReservationLabels,
} from "@/lib/realDataSchema";
import { SidebarTrigger } from "../../SidebarTrigger";
import { useSidebar } from "../../SidebarContext";
import Link from "next/link";
import cn from "classnames";
import { colorMap } from "@/lib/types";
import { useWindowSize } from "@/lib/hooks/useWindowSize";

export const InboxSidebar = () => {
  const pathname = usePathname();

  const workspaceId = pathname.split("/")[1];

  return (
    <div className="h-screen flex flex-col justify-between bg-primary-subtle w-[calc(100vw-74px)] md:w-[280px] md:min-w-[280px] border-e border-primary overflow-y-auto px-2 py-6">
      <div className="flex flex-col">
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
      <div className="block md:hidden">
        <SidebarTrigger />
      </div>
    </div>
  );
};

export const InboxSideBarOption = ({
  path,
  name,
  selected,
  icon,
  image,
  count,
  color,
  emoji,
}: {
  path: string;
  name: string;
  selected: boolean;
  icon?: React.ReactNode;
  image?: string;
  emoji?: string;
  count?: number;
  color?: keyof typeof colorMap;
}) => {
  const { toggleSidebar } = useSidebar();
  const size = useWindowSize();

  return (
    <Link href={path}>
      <div
        className={cn(
          "flex items-center justify-between w-full px-2 py-1 h-8 active:bg-pressed rounded-md gap-2",
          selected ? "bg-selected hover:bg-selected" : "hover:bg-hover"
        )}
        onClick={() => {
          if (size.width! <= 705) {
            toggleSidebar();
          }
        }}
      >
        <div className="text-subtitle-sm flex items-center gap-2">
          {color && (
            <div className={cn(`w-2 h-2 rounded-full`, colorMap[color])}></div>
          )}

          {icon && (
            <div
              className={cn(
                "size-[18px] flex justify-center items-center",
                selected ? "text-icon-brand" : "text-icon-tertiary"
              )}
            >
              {icon}
            </div>
          )}

          {emoji && (
            <span role="img" aria-label="Emoji" className="text-body-2xs">
              {String.fromCodePoint(parseInt(emoji, 16))}
            </span>
          )}

          {image && (
            <img
              src={image}
              alt="icon"
              className="size-[18px] rounded-full object-cover"
            />
          )}
          <p>{name}</p>
        </div>
        {count && (
          <div
            className={cn(
              "rounded-lg text-subtitle-xs h-6 w-[28px] flex items-center justify-center",
              selected ? "text-brand bg-primary" : "text-tertiary"
            )}
          >
            {count}
          </div>
        )}
      </div>
    </Link>
  );
};
