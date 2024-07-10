import { Button } from "@/components/ui/button";
import { ListingCard } from "./ListingCard";
import { PlusIcon } from "lucide-react";
import { Conversation } from "@/lib/realDataSchema";
import { LabelsTagsGroups } from "./LabelsTagsGroups";
import { BookingInfo } from "./BookingInfo";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { toast } from "sonner";

export const BookingInfoTab = ({
  conversationData,
}: {
  conversationData: Conversation;
}) => {
  const [checkInDate, setCheckInDate] = useState<Date>(
    new Date(conversationData.reservation.arrivalDate)
  );
  const [checkOutDate, setCheckOutDate] = useState<Date>(
    new Date(conversationData.reservation.departureDate)
  );

  const handleCheckInDate = (date: Date | undefined) => {
    if (!date) {
      // set back to original
      setCheckInDate(new Date(conversationData.reservation.arrivalDate));
      return;
    }

    setCheckInDate(date!);
  };

  const handleCheckOutDate = (date: Date) => {
    if (!date) {
      // set back to original
      setCheckOutDate(new Date(conversationData.reservation.departureDate));
      return;
    }
    setCheckOutDate(date);
  };

  const handleSave = () => {
    console.log("Check-in date selected: ", checkInDate);
    console.log("Check-out date selected: ", checkOutDate);

    // TODO API: handle save changes

    toast.success("Saved changes");
  };

  const handleCancel = () => {
    // Rest to original
    setCheckInDate(new Date(conversationData.reservation.arrivalDate));
    setCheckOutDate(new Date(conversationData.reservation.departureDate));
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Listing Card + Reservation Labels */}
      <div className="px-6 flex flex-col gap-5">
        <ListingCard listingData={conversationData.reservation.listing} />
        <div className="px-[4px] flex flex-col gap-[2px]">
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

      <div className="px-[28px] flex flex-col gap-3">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <BookingInfo
              title="Check-in date"
              description={format(checkInDate, "MM/dd/yyyy")}
              isDropdown={true}
              dropdownContent={
                <Calendar
                  mode="single"
                  defaultMonth={checkInDate}
                  selected={checkInDate}
                  onSelect={(date) => handleCheckInDate(date)}
                  toDate={checkOutDate}
                />
              }
            />
            <BookingInfo
              title="Check-in time"
              description={conversationData.reservation.checkInTime}
            />
          </div>
          <div className="flex items-center gap-4">
            <BookingInfo
              title="Checkout date"
              description={format(checkOutDate, "MM/dd/yyyy")}
              isDropdown={true}
              dropdownContent={
                <Calendar
                  mode="single"
                  defaultMonth={checkOutDate}
                  selected={checkOutDate}
                  onSelect={(date) => handleCheckOutDate(date!)}
                  fromDate={checkInDate}
                />
              }
            />
            <BookingInfo
              title="Checkout time"
              description={conversationData.reservation.checkOutTime}
            />
          </div>
        </div>

        {/* Actions */}
        {new Date(conversationData.reservation.departureDate).getTime() !==
          checkOutDate.getTime() ||
        new Date(conversationData.reservation.arrivalDate).getTime() !==
          checkInDate.getTime() ? (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="xs"
              className="w-full bg-transparent h-[28px]"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              size="xs"
              className="w-full h-[28px]"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        ) : null}
      </div>

      <div className="border-b border-primary"></div>

      {/* Extra booking info */}
      <div className="px-[28px] flex flex-col gap-4">
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
