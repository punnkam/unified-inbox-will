// docs: https://ui.shadcn.com/docs/components/data-table

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LabelsTagsGroups } from "./LabelsTagsGroups";
import {
  ConversationWithAllData,
  fakeIconsData,
  appliedFilters,
} from "@/lib/types";
import { IconComponent } from "@/components/icons/IconComponent";
import { ResponseStatus } from "./ResponseStatus";
import {
  CheckCircleIcon,
  MessageNotificationIcon,
  SlackIcon,
  WhatsAppIcon,
  AccountCircleIcon,
} from "@/components/icons/CustomIcons";

export const columns: ColumnDef<ConversationWithAllData>[] = [
  {
    accessorKey: "user",
    header: "User",
    enableHiding: false,
    filterFn: (row, columnId, filterValue: appliedFilters) => {
      if (!filterValue) return true;

      const tripStatus = filterValue.tripStatus;
      const checkInDate = filterValue.checkInDate;

      if (tripStatus) {
        // if the array is empty (no filter applied), return true (show all rows)
        if (tripStatus.length === 0) return true;

        const hasAnySelectedTripStatus = tripStatus.some(
          (selectedStatus) => selectedStatus.name == row.original.tripStatus
        );

        if (!hasAnySelectedTripStatus) {
          return false;
        }
      }

      if (checkInDate) {
        // if the array is empty (no filter applied), return true (show all rows)
        if (checkInDate.length === 0) return true;

        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() + (7 - today.getDay()));

        const checkInDateMatch = checkInDate.some((option) => {
          const tripStartDate = new Date(row.original.tripStartDate).getTime();
          const tripEndDate = new Date(row.original.tripEndDate).getTime();
          const todayStart = new Date(today).setHours(0, 0, 0, 0);
          const todayEnd = new Date(today).setHours(23, 59, 59, 999);
          const tomorrowStart = new Date(tomorrow).setHours(0, 0, 0, 0);
          const tomorrowEnd = new Date(tomorrow).setHours(23, 59, 59, 999);
          const endOfWeekEnd = new Date(endOfWeek).setHours(23, 59, 59, 999);

          switch (option.name) {
            case "Current Guest":
              return tripStartDate <= todayEnd && tripEndDate >= todayStart;

            case "Checking in today":
              return tripStartDate >= todayStart && tripStartDate <= todayEnd;

            case "Checking in tomorrow":
              return (
                tripStartDate >= tomorrowStart && tripStartDate <= tomorrowEnd
              );

            case "Checking in this week":
              return (
                tripStartDate >= todayStart && tripStartDate <= endOfWeekEnd
              );

            default:
              return false;
          }
        });

        if (!checkInDateMatch) {
          return false;
        }
      }

      return true;
    },
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
    filterFn: (row, columnId, filterValue: appliedFilters) => {
      if (!filterValue) return true;

      const responseStatus = filterValue.responseStatus;
      const reservationLabels = filterValue.reservationLabels;
      const conversationTags = filterValue.conversationTags;

      if (responseStatus) {
        // if the array is empty (no filter applied), return true (show all rows)
        if (responseStatus.length === 0) return true;

        // Check if at least one of the selected labels is present in the row's reservation labels
        const hasAnySelectedStatus = responseStatus.some((status) =>
          row.original.replyStatus?.includes(status.name)
        );

        // If none of the selected labels are present, return false
        if (!hasAnySelectedStatus) {
          return false;
        }
      }

      if (reservationLabels) {
        // if the array is empty (no filter applied), return true (show all rows)
        if (reservationLabels.length === 0) return true;

        // Check if at least one of the selected labels is present in the row's reservation labels
        const hasAnySelectedLabel = reservationLabels.some((label) =>
          row.original.reservationLabels?.some(
            (reservationLabel) => reservationLabel?.id === label.id
          )
        );

        // If none of the selected labels are present, return false
        if (!hasAnySelectedLabel) {
          return false;
        }
      }

      if (conversationTags) {
        // if the array is empty (no filter applied), return true (show all rows)
        if (conversationTags.length === 0) return true;

        // Check if at least one of the selected tags is present in the row's conversation tags
        const hasAnySelectedTag = conversationTags.some((tag) =>
          row.original.conversationTags?.some(
            (conversationTag) => conversationTag?.id === tag.id
          )
        );

        // If none of the selected tags are present, return false
        if (!hasAnySelectedTag) {
          return false;
        }
      }

      return true;
    },
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
    filterFn: (row, columnId, filterValue: appliedFilters) => {
      if (!filterValue) return true;

      const listingGroup = filterValue.listingGroups;
      const listings = filterValue.listings;

      if (listingGroup && listingGroup.length > 0) {
        // Check if the listing is in the listing group
        const isInListingGroup = listingGroup.some(
          (group) => group.id == row.original.listingGroupData?.id!
        );

        if (isInListingGroup) {
          return true;
        }
      }

      if (listings && listings.length > 0) {
        // Check if the listing is selected
        const isSelectedListing = listings.some(
          (listing) => listing.id == row.original.tripListing.id!
        );

        if (isSelectedListing) {
          return true;
        }
      }

      // If no filters are applied or the listing is not in the group or selected, return false
      return false;
    },
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
  {
    accessorKey: "assigneeGroup",
    header: "AssigneeGroup",
    enableHiding: false,
    filterFn: (row, columnId, filterValue: appliedFilters) => {
      // filterValue: { assigneeGroup: [{optionWithData}, {optionWithData}, {optionWithData}] }

      if (!filterValue) return true;

      const assigneeGroup = filterValue.assignee;

      if (assigneeGroup) {
        // if the array is empty (no filter applied), return true (show all rows)
        if (assigneeGroup.length === 0) return true;

        // Check if at least one of the selected members is the current row's assignee
        // or if the row is unassigned (-1 id)
        const hasAnySelectedLabel = assigneeGroup.some(
          (member) =>
            member.id == row.original.assigneeData?.id! ||
            (member.id == -1 && !row.original.assigneeData)
        );

        // If none of the selected labels are present, return false
        if (!hasAnySelectedLabel) {
          return false;
        }
      }

      return true;
    },
    cell: ({ table, row }) => {
      // unassigned
      if (!row.original.assigneeData) {
        return (
          <div className="flex items-end flex-col gap-2">
            {table.getColumn("Assignee")?.getIsVisible() && (
              <div className="w-5 h-5 rounded-full bg-primary-subtle flex items-center justify-center">
                <AccountCircleIcon className="text-icon-secondary size-4" />
              </div>
            )}
            <p className="text-body-xs font-normal text-nowrap">12:47 am</p>
          </div>
        );
      }

      // assigned
      return (
        <div className="flex items-end flex-col gap-2">
          {table.getColumn("Assignee")?.getIsVisible() && (
            <img
              src={row.original.assigneeData?.image}
              alt={row.original.assigneeData?.name}
              className="w-5 h-5 rounded-full object-cover"
            />
          )}
          <p className="text-body-xs font-normal text-nowrap">12:47 am</p>
        </div>
      );
    },
  },
];
