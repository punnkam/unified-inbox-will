import { BookingChannel, Reservation } from "@/lib/realDataSchema";
import { ReservationStatus } from "../../components/ReservationStatus";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "@/components/icons/CustomIcons";
import { useState } from "react";

export const BookingInfo = ({
  title,
  description,
  bookingChannel,
  reservationStatus,
  imageUrl,
  isDropdown,
  dropdownContent,
}: {
  title: string;
  description?: string;
  bookingChannel?: BookingChannel | string;
  reservationStatus?: Reservation["status"];
  imageUrl?: string;
  isDropdown?: boolean;
  dropdownContent?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const MainData = (
    <div className="p-1 flex items-center gap-1">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={bookingChannel}
          className="w-5 h-5 rounded-full object-cover"
        />
      )}

      {bookingChannel && (
        <p className="text-subtitle-sm capitalize">{bookingChannel}</p>
      )}

      {reservationStatus && <ReservationStatus type={reservationStatus} />}

      {description && <p className="text-subtitle-sm">{description}</p>}
    </div>
  );

  if (isDropdown) {
    return (
      <div className="flex flex-col gap-[2px] w-full">
        <p className="p-1 text-body-xs text-secondary">{title}</p>
        <DropdownMenu open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center justify-between w-full rounded-md hover:bg-hover hover:cursor-pointer">
              {MainData}
              <ChevronDownIcon className="size-fit text-icon-tertiary pe-1" />
            </div>
          </DropdownMenuTrigger>
          {dropdownContent}
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[2px] w-full">
      <p className="p-1 text-body-xs text-secondary">{title}</p>
      {MainData}
    </div>
  );
};
