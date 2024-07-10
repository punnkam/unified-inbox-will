import { BookingChannel, Reservation } from "@/lib/realDataSchema";
import { ReservationStatus } from "./ReservationStatus";

export const BookingInfo = ({
  title,
  description,
  bookingChannel,
  reservationStatus,
  imageUrl,
}: {
  title: string;
  description?: string;
  bookingChannel?: BookingChannel | string;
  reservationStatus?: Reservation["status"];
  imageUrl?: string;
}) => {
  return (
    <div className="flex flex-col gap-[2px] w-full">
      <p className="p-1 text-body-xs text-secondary">{title}</p>

      <div className="p-[2px] flex items-center gap-1">
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

        {reservationStatus && (
          <div className="p-[2px]">
            <ReservationStatus type={reservationStatus} />
          </div>
        )}

        {description && (
          <div className="p-[2px]">
            <p className="text-subtitle-sm">{description}</p>
          </div>
        )}
      </div>
    </div>
  );
};
