"use client";

import { Button } from "@/components/ui/button";
import { ReservationLabel } from "@/lib/types";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteReservationLabel } from "@/app/actions";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const ReservationLabelComponent = ({
  reservationLabel,
  selectedEmoji,
}: {
  reservationLabel: ReservationLabel;
  selectedEmoji:
    | { n: string[]; u: string; a: string; v?: undefined }
    | { n: string[]; u: string; v: string[]; a: string }
    | undefined;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleDeleteReservationLabel = async () => {
    setIsDialogOpen(false);
    const response = await deleteReservationLabel(reservationLabel);

    if (response.success) {
      toast.success("Reservation label deleted successfully");

      // refresh the page to reflect the changes
      router.refresh();
    } else {
      toast.error("Error deleting reservation label: " + response.message);
    }
  };

  return (
    <div className="flex items-start justify-between border border-secondary rounded-md gap-2 hover:bg-hover active:bg-pressed">
      <Link
        key={reservationLabel.id}
        href={`./reservation-labels/${reservationLabel.id}`}
        className="p-5 w-full"
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center">
            {selectedEmoji ? (
              <span
                role="img"
                aria-label={selectedEmoji.a}
                className="text-2xl"
              >
                {String.fromCodePoint(parseInt(selectedEmoji.u, 16))}
              </span>
            ) : (
              <span role="img" aria-label="Emoji">
                🎉
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <p className="text-subtitle-xs">{reservationLabel.name}</p>
            <p className="text-body-2xs text-tertiary font-normal mt-1">
              {reservationLabel.description}
            </p>
          </div>
        </div>
      </Link>

      <div className="p-5">
        <AlertDialog open={isDialogOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size={"icon"}
                className="h-8 w-8 hover:bg-pressed z-10"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4 text-icon-tertiary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="text-subtitle-xs">
              <Link href={`./reservation-labels/${reservationLabel.id}`}>
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </Link>
              <AlertDialogTrigger
                onClick={() => setIsDialogOpen(true)}
                className="w-full"
              >
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete label?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button
                variant={"secondary"}
                size={"sm"}
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteReservationLabel()}
              >
                Delete reservation label
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
