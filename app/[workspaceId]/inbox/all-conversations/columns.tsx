// docs: https://ui.shadcn.com/docs/components/data-table

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LabelsTagsGroups } from "./LabelsTagsGroups";
import { ConversationWithAllData, fakeIconsData } from "@/lib/types";
import { IconComponent } from "@/components/icons/IconComponent";

export const columns: ColumnDef<ConversationWithAllData>[] = [
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      return (
        <div className="flex gap-3 items-center w-full">
          <img
            src={row.original.guestImage}
            alt={row.original.guestName}
            className="w-10 h-10 rounded-full object-cover"
          />

          <p className="text-subtitle-sm text-nowrap">
            {row.original.guestName}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "guestName",
    header: "Guest Name",
  },
  {
    accessorKey: "messageStatus",
    header: "Message Status",
  },
  {
    accessorKey: "messages",
    header: "Messages",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-2 pl-10">
          <p className="text-secondary text-subtitle-xs truncate max-w-[80%]">
            {row.original.messages[row.original.messages.length - 1].message}
          </p>
          <div className="flex gap-1 items-center">
            {/* List the listing */}
            {row.original.tripListing && (
              <LabelsTagsGroups
                text={row.original.tripListing.address}
                avatar={row.original.tripListing.image}
              />
            )}

            {/*  list all reservation labels applied */}
            {row.original.reservationLabels &&
              row.original.reservationLabels.map((label) => (
                <LabelsTagsGroups
                  key={label?.id}
                  text={label!.name}
                  emoji={label?.emojiId}
                />
              ))}

            {/* list all tags applied */}
            {row.original.conversationTags &&
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
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-2 ">
          <p className="text-subtitle-xs truncate">
            {row.original.tripListing.title}
          </p>
          <div className="flex items-center gap-2 text-secondary text-subtitle-2xs">
            <p>{row.original.tripStatus}</p>
            <div className="size-0.5 bg-icon-tertiary rounded-full" />
            <p>
              {new Date(row.original.tripStartDate).toLocaleDateString(
                "en-US",
                { month: "short", day: "numeric" }
              )}{" "}
              -{" "}
              {new Date(row.original.tripEndDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "teamResponse",
    header: "Team Response",
    cell: ({ row }) => {
      return (
        <div className="flex items-end flex-col gap-2">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="team"
            className="w-5 h-5 rounded-full object-cover"
          />
          <p className=" text-body-2xs font-normal text-nowrap">12:47 am</p>
        </div>
      );
    },
  },
];
