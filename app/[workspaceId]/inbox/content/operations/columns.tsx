// docs: https://ui.shadcn.com/docs/components/data-table

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LabelsTagsGroups } from "../components/LabelsTagsGroups";
import { ResponseStatus } from "../components/ResponseStatus";
import {
  CheckCircleIcon,
  MessageNotificationIcon,
  SlackIcon,
  WhatsAppIcon,
  AccountCircleIcon,
  MessageCheckCircleIcon,
} from "@/components/icons/CustomIcons";
import { Conversation, appliedFilters } from "@/lib/realDataSchema";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<Conversation>[] = [
  {
    accessorKey: "user",
    header: "User",
    enableHiding: false,
    filterFn: (row, columnId, filterValue: appliedFilters) => {
      if (!filterValue) return true;

      const tripStatus = filterValue.reservationStatus;
      const checkInDate = filterValue.checkInDate;

      if (tripStatus) {
        // if the array is empty (no filter applied), return true (show all rows)
        if (tripStatus.length === 0) return true;

        const hasAnySelectedTripStatus = tripStatus.some(
          (selectedStatus) =>
            selectedStatus.name == row.original.reservation.status
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

        // TODO: these dates are being set in local time, causing 2024-06-26 to show the 25th

        const checkInDateMatch = checkInDate.some((option) => {
          const tripStartDate = new Date(
            row.original.reservation.arrivalDate
          ).getTime();
          const tripEndDate = new Date(
            row.original.reservation.departureDate
          ).getTime();
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
    cell: ({ table, row }) => {
      const searchParams = useSearchParams();
      const conversationId = searchParams.get("c");

      console.log("conversationId", conversationId);

      const replyStatus = row.original.archived
        ? "Done"
        : row.original.lastMessage?.author === "guest"
        ? "Needs Reply"
        : row.original.hasInboxMessageQueue
        ? "Response Available"
        : row.original.lastMessage?.author === "host"
        ? "Replied to"
        : null;

      return (
        <div
          className={cn(
            "flex flex-col w-full max-w-[300px] gap-3 px-5 py-4",
            parseInt(conversationId!) === row.original.id
              ? "bg-primary"
              : "bg-primary-subtle"
          )}
        >
          <div className={`flex gap-3 items-center w-full`}>
            <div className="relative">
              <img
                src={row.original.reservation.guest.imageUrl!}
                alt={row.original.reservation.guest.name || "Guest"}
                className="size-12 min-w-12 min-h-12 rounded-full object-cover"
              />
              {row.original.hasUnreadMessages && (
                <div className="size-2 bg-brand rounded-full absolute top-1/2 -translate-y-1/2 -left-[14px] " />
              )}
              {replyStatus && (
                <LabelsTagsGroups
                  // text={replyStatus}
                  showHosty={replyStatus === "Response Available"}
                  icon={
                    (replyStatus === "Replied to" && (
                      <MessageCheckCircleIcon className="text-icon-tertiary w-3 h-3" />
                    )) ||
                    (replyStatus === "Needs Reply" && (
                      <MessageNotificationIcon className="text-icon-error-alt w-3 h-3" />
                    )) ||
                    (replyStatus === "Done" && (
                      <CheckCircleIcon className="text-icon-success w-3 h-3" />
                    ))
                  }
                  className="size-[18px] p-0 flex items-center justify-center absolute bottom-0 right-0 bg-white border-primary"
                />
              )}
            </div>

            <div className="flex flex-col gap-1 truncate w-full">
              <div className="w-full flex items-center justify-between">
                <p className="text-subtitle-md text-nowrap w-full">
                  {row.original.reservation.guest.name}
                </p>
                <p className="text-body-xs text-tertiary text-nowrap">
                  Just now
                </p>
              </div>
              <p className="text-tertiary text-body-sm font-normal truncate max-w-full h-5">
                {row.original.lastMessage?.text}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-tertiary text-subtitle-xs text-nowrap">
              <p>
                {new Date(
                  row.original.reservation.arrivalDate
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}{" "}
                -{" "}
                {new Date(
                  row.original.reservation.departureDate
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            {row.original.reservation.status && (
              <ResponseStatus type={row.original.reservation.status} />
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "guestName",
    header: "Guest Name",
    enableHiding: false,
    filterFn: (row, columnId, filterValue: string) => {
      return row.original.reservation.guest
        .name!.toLowerCase()
        .includes(filterValue.toLowerCase());
    },
  },
  {
    accessorKey: "messageStatus",
    header: "Message Status",
    enableHiding: false,
    filterFn: (row, columnId, filterValue: boolean) => {
      return row.original.archived! == filterValue;
    },
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

        const replyStatus = row.original.archived
          ? "Done"
          : row.original.lastMessage?.author === "guest"
          ? "Needs Reply"
          : row.original.hasInboxMessageQueue
          ? "Response Available"
          : row.original.lastMessage?.author === "host"
          ? "Replied to"
          : null;

        const hasAnySelectedStatus = responseStatus.some(
          (status) => replyStatus == status.name
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
          row.original.reservation.reservationLabels?.some(
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
          row.original.tags?.some(
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
      return null;
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
        //listing group is an array of listing ids that are in that group
        const isInListingGroup = listingGroup.some(
          (group) => group.id == row.original.reservation.listing.listingId
        );

        if (!isInListingGroup) {
          return false;
        }
      }

      if (listings) {
        if (listings.length === 0) return true;

        // Check if the listing is selected
        const isSelectedListing = listings.some(
          (listing) => listing.id == row.original.reservation.listing.listingId
        );

        if (!isSelectedListing) {
          return false;
        }
      }

      return true;
    },
    cell: ({ table, row }) => {
      return null;
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
        // or if the row is unassigned (null id)
        const hasAnySelectedLabel = assigneeGroup.some(
          (member) =>
            member.id == row.original.assigneeData?.id! ||
            (member.id == null && !row.original.assigneeData)
        );

        // If none of the selected labels are present, return false
        if (!hasAnySelectedLabel) {
          return false;
        }
      }

      return true;
    },
    cell: () => {
      // assigned
      return null;
    },
  },
];
