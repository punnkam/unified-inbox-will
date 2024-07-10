import { Button } from "@/components/ui/button";
import { ListingCard } from "./ListingCard";
import { PlusIcon } from "lucide-react";
import { Conversation } from "@/lib/realDataSchema";
import { LabelsTagsGroups } from "./LabelsTagsGroups";
import { BookingInfo } from "./BookingInfo";

export const BookingInfoTab = ({
  conversationData,
}: {
  conversationData: Conversation;
}) => {
  return (
    <div className="flex flex-col gap-5">
      {/* Listing Card + Reservation Labels */}
      <div className="px-6 flex flex-col gap-5">
        <ListingCard listingData={conversationData.reservation.listing} />
        <div className="flex flex-col gap-[2px]">
          <p className="p-[2px] text-body-xs text-secondary">
            Reservation labels
          </p>
          <div className="flex items-center gap-1 py-1">
            {conversationData.reservation.reservationLabels?.map((label) => (
              <LabelsTagsGroups
                key={label?.id}
                text={label!.name}
                emoji={label?.emojiId}
                className="bg-primary border-primary text-secondary"
              />
            ))}

            {/* TODO: add logic for adding a new label */}
            <Button variant="ghost" size={"iconXs"}>
              <PlusIcon className="text-icon-secondary size-3" />
            </Button>
          </div>
        </div>
      </div>

      <div className="border-b border-primary"></div>

      {/* Extra booking info */}
      <div className="px-6 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <BookingInfo
            title="Reservation status"
            reservationStatus={conversationData.reservation.status}
          />
          <BookingInfo
            title="Booking channel"
            description={conversationData.reservation.channel}
            imageUrl={"/images/host_airbnb.svg"} // TODO: add booking channel images
          />
        </div>
        <div className="flex items-center gap-4">
          <BookingInfo
            title="Number of guests"
            description={`${conversationData.reservation.numberOfGuests} ${
              conversationData.reservation.numberOfGuests > 1
                ? "guests"
                : "guest"
            }`}
          />
          <BookingInfo
            title="Number of nights"
            description={`${conversationData.reservation.numNights} nights`}
          />
        </div>
        <div className="flex items-center gap-4">
          <BookingInfo
            title="Total price"
            description={`${conversationData.reservation.payment?.totalPrice} ${conversationData.reservation.payment?.currency}`}
          />
          <BookingInfo
            title="Has paid"
            description={`${
              conversationData.reservation.payment?.isPaid ? "Yes" : "No"
            }`}
          />
        </div>
      </div>
    </div>
  );
};
