// docs: https://ui.shadcn.com/docs/components/data-table

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LabelsTagsGroups } from "./LabelsTagsGroups";
import { ConversationWithAllData, fakeIconsData } from "@/lib/types";
import { IconComponent } from "@/components/icons/IconComponent";
import { ResponseStatus } from "./ResponseStatus";
import {
  CheckCircleIcon,
  MessageNotificationIcon,
  SlackIcon,
  WhatsAppIcon,
} from "@/components/icons/CustomIcons";

export const columns: ColumnDef<ConversationWithAllData>[] = [
  {
    accessorKey: "user",
    header: "User",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex gap-3 items-center w-full">
          {row.original.unread && (
            <div className="size-2 bg-brand rounded-full absolute top-1/2 left-[16px] " />
          )}
          <div className="relative">
            <img
              src={row.original.guestImage}
              alt={row.original.guestName}
              className="size-10 min-w-10 min-h-10 rounded-full object-cover"
            />
            {row.original.channel === "WhatsApp" ? (
              <div className="absolute bottom-0 -right-1 w-4 h-4 flex items-center justify-center bg-[#27D045] rounded-full">
                <WhatsAppIcon className="size-[10px] text-primary-inverse" />
              </div>
            ) : (
              <div className="absolute bottom-0 -right-1 w-4 h-4 flex items-center justify-center bg-primary rounded-full">
                <SlackIcon className="size-[10px]" />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-subtitle-sm text-nowrap">
              {row.original.guestName}
            </p>
            <div className="flex items-center gap-2">
              <ResponseStatus type={row.original.tripStatus} />
              <div className="flex items-center gap-2 text-secondary text-body-xs text-nowrap">
                <p>
                  {new Date(row.original.tripStartDate).toLocaleDateString(
                    "en-US",
                    { month: "short", day: "numeric" }
                  )}{" "}
                  -{" "}
                  {new Date(row.original.tripEndDate).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "guestName",
    header: "Guest Name",
    enableHiding: false,
  },
  {
    accessorKey: "messageStatus",
    header: "Message Status",
    enableHiding: false,
  },
  {
    accessorKey: "messages",
    header: "Messages",
    enableHiding: false,
    cell: ({ table, row }) => {
      const replyStatus = row.original.replyStatus;

      return (
        <div className="flex flex-col gap-2 pl-10">
          <p className="text-secondary text-body-sm font-normal truncate max-w-[80%]">
            {row.original.messages[row.original.messages.length - 1].message}
          </p>
          <div className="flex gap-1 items-center">
            {/* message status */}
            {replyStatus && (
              <LabelsTagsGroups
                text={replyStatus}
                showHosty={replyStatus == "Response Available"}
                icon={
                  (replyStatus === "Done" && (
                    <CheckCircleIcon className="text-success w-3 h-3" />
                  )) ||
                  (replyStatus == "Needs Reply" && (
                    <MessageNotificationIcon className="text-icon-error-alt w-3 h-3" />
                  ))
                }
              />
            )}

            {table.getColumn("Listing name")?.getIsVisible() &&
              row.original.tripListing && (
                <LabelsTagsGroups
                  text={row.original.tripListing.address}
                  avatar={row.original.tripListing.image}
                />
              )}

            {table.getColumn("Reservation labels")?.getIsVisible() &&
              row.original.reservationLabels &&
              row.original.reservationLabels.map((label) => (
                <LabelsTagsGroups
                  key={label?.id}
                  text={label!.name}
                  emoji={label?.emojiId}
                />
              ))}

            {/* list all tags applied */}
            {table.getColumn("Conversation tags")?.getIsVisible() &&
              row.original.conversationTags &&
              row.original.conversationTags.map((tag) => {
                const icon = fakeIconsData.find(
                  (icon) => icon.id === tag?.iconId
                );
                return (
                  <LabelsTagsGroups
                    key={tag?.id}
                    text={tag!.name}
                    icon={
                      <IconComponent
                        icon={icon!.icon}
                        classNames="size-3 text-tertiary"
                      />
                    }
                  />
                );
              })}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "listing",
    header: "Listing",
    enableHiding: false,
    cell: ({ table, row }) => {
      return (
        <div className="flex flex-col gap-2">
          {table.getColumn("Listing name")?.getIsVisible() && (
            <p className="text-body-sm truncate">
              {row.original.tripListing.title}
            </p>
          )}
          {row.original.listingGroupData && (
            <LabelsTagsGroups
              text={row.original.listingGroupData.name}
              color={row.original.listingGroupData.color}
            />
          )}
          {/* add group here */}
        </div>
      );
    },
  },
  {
    accessorKey: "assigneeGroup",
    header: "AssigneeGroup",
    enableHiding: false,
    cell: ({ table, row }) => {
      return (
        <div className="flex items-end flex-col gap-2">
          {table.getColumn("Assignee")?.getIsVisible() && (
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="team"
              className="w-5 h-5 rounded-full object-cover"
            />
          )}
          <p className=" text-body-xs font-normal text-nowrap">12:47 am</p>
        </div>
      );
    },
  },
  // These columns are hidden table columns used for condintional attributes
  {
    header: "Reservation labels",
  },
  {
    header: "Conversation tags",
  },
  {
    header: "Listing name",
  },
  {
    header: "Assignee",
  },
];
