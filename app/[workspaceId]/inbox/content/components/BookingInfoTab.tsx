import { Button } from "@/components/ui/button";
import { ListingCard } from "./ListingCard";
import { PlusIcon } from "lucide-react";
import { Conversation } from "@/lib/realDataSchema";
import { LabelsTagsGroups } from "./LabelsTagsGroups";
import { BookingInfo } from "./BookingInfo";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  formatTimestampTo12Hour,
  generateTimeOptions,
  handleValueChange,
} from "@/lib/utils";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const timeOptions = generateTimeOptions();

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
  const [selectedCheckInTime, setSelectedCheckInTime] = useState<Date>(
    new Date(conversationData.reservation.checkInTime)
  );
  const [selectedCheckOutTime, setSelectedCheckOutTime] = useState<Date>(
    new Date(conversationData.reservation.checkOutTime)
  );

  // Rerendrer when the times when the conversation data changes
  useEffect(() => {
    setCheckInDate(new Date(conversationData.reservation.arrivalDate));
    setCheckOutDate(new Date(conversationData.reservation.departureDate));
    setSelectedCheckInTime(new Date(conversationData.reservation.checkInTime));
    setSelectedCheckOutTime(
      new Date(conversationData.reservation.checkOutTime)
    );
  }, [conversationData]);

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

  const handleCheckInTime = (selectedTime: Date) => {
    console.log("Selected time:", selectedTime);
    // Here you can store the selectedTime in your database

    setSelectedCheckInTime(selectedTime);
  };

  const handleCheckOutTime = (selectedTime: Date) => {
    // Here you can store the selectedTime in your database

    if (selectedTime === selectedCheckOutTime) return;
    console.log("Selected time:", selectedTime);

    setSelectedCheckOutTime(selectedTime);

    console.log("Selected time:", selectedCheckOutTime);
  };

  const handleSave = () => {
    console.log("Check-in date selected: ", checkInDate);
    console.log("Check-out date selected: ", checkOutDate);
    console.log("Check-in time selected: ", selectedCheckInTime);
    console.log("Check-out time selected: ", selectedCheckOutTime);

    // TODO API: handle save changes

    toast.success("Saved changes");
  };

  const handleCancel = () => {
    // Rest to original
    setCheckInDate(new Date(conversationData.reservation.arrivalDate));
    setCheckOutDate(new Date(conversationData.reservation.departureDate));
    setSelectedCheckInTime(new Date(conversationData.reservation.checkInTime));
    setSelectedCheckOutTime(
      new Date(conversationData.reservation.checkOutTime)
    );
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
                <DropdownMenuContent align="end" asChild>
                  <div className="!p-0">
                    <Calendar
                      mode="single"
                      defaultMonth={checkInDate}
                      selected={checkInDate}
                      onSelect={(date) => handleCheckInDate(date)}
                      toDate={checkOutDate}
                    />
                  </div>
                </DropdownMenuContent>
              }
            />
            <BookingInfo
              title="Check-in time"
              description={formatTimestampTo12Hour(selectedCheckInTime)}
              isDropdown={true}
              dropdownContent={
                <DropdownMenuContent
                  align="start"
                  className="h-64 overflow-y-auto text-subtitle-xs"
                >
                  {timeOptions.map((time) => (
                    <DropdownMenuItem
                      key={time}
                      onClick={() => {
                        setSelectedCheckInTime((prevTime) => {
                          const newTime = handleValueChange(time, prevTime);
                          return new Date(newTime);
                        });
                      }}
                    >
                      {time}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              }
            />
          </div>
          <div className="flex items-center gap-4">
            <BookingInfo
              title="Checkout date"
              description={format(checkOutDate, "MM/dd/yyyy")}
              isDropdown={true}
              dropdownContent={
                <DropdownMenuContent align="end" asChild>
                  <div className="!p-0">
                    <Calendar
                      mode="single"
                      defaultMonth={checkOutDate}
                      selected={checkOutDate}
                      onSelect={(date) => handleCheckOutDate(date!)}
                      fromDate={checkInDate}
                    />
                  </div>
                </DropdownMenuContent>
              }
            />
            <BookingInfo
              title="Checkout time"
              description={formatTimestampTo12Hour(selectedCheckOutTime)}
              isDropdown={true}
              dropdownContent={
                <DropdownMenuContent
                  align="start"
                  className="h-64 overflow-y-auto text-subtitle-xs"
                >
                  {timeOptions.map((time) => (
                    <DropdownMenuItem
                      key={time}
                      onClick={() => {
                        setSelectedCheckOutTime((prevTime) => {
                          const newTime = handleValueChange(time, prevTime);
                          return new Date(newTime);
                        });
                      }}
                    >
                      {time}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              }
            />
          </div>
        </div>

        {/* Actions */}
        {/* Show the actions only if the dates or times have changed */}
        {new Date(conversationData.reservation.departureDate).getTime() !==
          checkOutDate.getTime() ||
        new Date(conversationData.reservation.arrivalDate).getTime() !==
          checkInDate.getTime() ||
        new Date(conversationData.reservation.checkInTime).getTime() !==
          selectedCheckInTime.getTime() ||
        new Date(conversationData.reservation.checkOutTime).getTime() !==
          selectedCheckOutTime.getTime() ? (
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
