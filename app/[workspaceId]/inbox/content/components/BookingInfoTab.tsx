import { Button } from "@/components/ui/button";
import { ListingCard } from "./ListingCard";
import { PlusIcon } from "lucide-react";
import {
  Conversation,
  ReservationLabel,
  fakeReservationLabels,
} from "@/lib/realDataSchema";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";

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
  const [reservationLabels, setReservationLabels] = useState<
    ReservationLabel[]
  >(conversationData.reservation.reservationLabels || []);

  // Rerendrer when the times when the conversation data changes
  useEffect(() => {
    setCheckInDate(new Date(conversationData.reservation.arrivalDate));
    setCheckOutDate(new Date(conversationData.reservation.departureDate));
    setSelectedCheckInTime(new Date(conversationData.reservation.checkInTime));
    setSelectedCheckOutTime(
      new Date(conversationData.reservation.checkOutTime)
    );

    setReservationLabels(conversationData.reservation.reservationLabels || []);
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

  const handleSelectReservationLabel = (label: ReservationLabel) => {
    // update the reservation labels state
    setReservationLabels((prevLabels) => {
      const isLabelPresent = prevLabels.some(
        (reservationLabel) => reservationLabel.id === label.id
      );
      if (isLabelPresent) {
        return prevLabels.filter(
          (reservationLabel) => reservationLabel.id !== label.id
        );
      } else {
        return [...prevLabels, label];
      }
    });

    // TODO API: handle updating reservation labels

    toast.success("Reservation labels updated successfully");
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
            {reservationLabels.map((label) => (
              <LabelsTagsGroups
                key={label?.id}
                text={label!.name}
                emoji={label?.emojiId}
                className="bg-primary border-primary text-secondary"
              />
            ))}

            {/* TODO: add logic for adding a new label */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size={"iconXs"}>
                  <PlusIcon className="text-icon-secondary size-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="text-subtitle-xs p-0"
              >
                <Command>
                  <CommandInput
                    placeholder={`Search reservation labels`}
                    autoFocus={true}
                  />
                  <CommandList>
                    <CommandEmpty>No filter found.</CommandEmpty>
                    <CommandGroup>
                      {fakeReservationLabels.map((label) => {
                        const isChecked = reservationLabels.some(
                          (reservationLabel) =>
                            reservationLabel?.id === label.id
                        );

                        return (
                          <CommandItem
                            key={label.id!}
                            value={label.name}
                            onSelect={() => {
                              handleSelectReservationLabel(label);
                            }}
                            className="hover:cursor-pointer"
                          >
                            <div className="flex items-center gap-2 text-subtitle-xs truncate">
                              <Checkbox checked={isChecked} />
                              <span
                                role="img"
                                aria-label="Emoji"
                                className="text-body-2xs"
                              >
                                {String.fromCodePoint(
                                  parseInt(label.emojiId, 16)
                                )}
                              </span>

                              <p className="truncate">{label.name}</p>
                            </div>
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </DropdownMenuContent>
            </DropdownMenu>
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

      <div className="border-b border-primary"></div>

      {/* Contact info */}
      <div className="px-[28px] flex flex-col gap-4">
        <div className="flex items-center gap-4">
          {conversationData.reservation.guest.phone && (
            <BookingInfo
              title="Guest phone number"
              description={conversationData.reservation.guest.phone}
            />
          )}
          {conversationData.reservation.guest.email && (
            <BookingInfo
              title="Guest email"
              description={conversationData.reservation.guest.email}
            />
          )}
        </div>
        <div className="flex items-center gap-4">
          {conversationData.reservation.guest.whatsapp && (
            <BookingInfo
              title="Whatsapp"
              description={conversationData.reservation.guest.whatsapp}
            />
          )}
        </div>
      </div>

      {conversationData.reservation.customFields && (
        <div className="flex flex-col gap-5">
          <div className="border-b border-primary"></div>

          {/* Custom fields */}
          <div className="px-[28px] flex flex-col gap-4">
            <Accordion
              type="single"
              collapsible
              defaultValue="reservation-labels"
            >
              <AccordionItem value="custom-fields">
                <AccordionTrigger className="px-1 rounded-md py-0.5">
                  Custom fields
                </AccordionTrigger>
                <AccordionContent className="pb-0 pt-2">
                  <div className="flex flex-wrap gap-y-4">
                    {conversationData.reservation.customFields.map((field) => (
                      <div className="w-1/2">
                        <BookingInfo
                          title={field.field}
                          description={field.value}
                        />
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      )}
    </div>
  );
};
