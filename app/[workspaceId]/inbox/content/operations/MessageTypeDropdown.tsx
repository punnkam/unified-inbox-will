import { useState } from "react";
import { initialMessageType } from "./ChatInput";
import {
  AirbnbIcon,
  ChevronDownIcon,
  GuestyImageIcon,
  SMSImageIcon,
} from "@/components/icons/CustomIcons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// TODO: this dosnt work - shows same icon for all
const messageTypes: {
  type: initialMessageType;
  image: string;
}[] = [
  { type: "Airbnb", image: "/images/host_airbnb.svg" },
  { type: "SMS", image: "/images/host_sms.svg" },
  { type: "Guesty", image: "/images/host_guesty.svg" },
  { type: "WhatsApp", image: "/images/host_whatsapp.svg" },
  { type: "Email", image: "/images/host_gmail.svg" },
];

export const MessageTypeDropdown = ({
  messageType,
  setMessageType,
}: {
  messageType: initialMessageType;
  setMessageType: (newMessageType: initialMessageType) => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedMessageType, setSelectedMessageType] =
    useState<initialMessageType>(messageType);

  const handleSelectMessageType = (messageType: initialMessageType) => {
    setSelectedMessageType(messageType);
    setMessageType(messageType);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size={"sm"}
          variant={"ghost"}
          className="text-tertiary flex items-center gap-1 justify-between self-end"
        >
          Via {selectedMessageType}
          <ChevronDownIcon className="text-tertiary size-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[248px]" defaultValue={messageType}>
        {messageTypes.map((type) => (
          <DropdownMenuItem
            key={type.type}
            className="hover:cursor-pointer gap-2"
            onClick={(e) => handleSelectMessageType(type.type)}
          >
            <img
              src={type.image}
              alt={type.type}
              className="w-6 h-6 rounded-full"
              style={
                type.type == "Guesty"
                  ? {
                      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    }
                  : undefined
              }
            />
            <p
              className={`text-subtitle-xs ${
                selectedMessageType === type.type && "text-primary"
              }`}
            >
              {type.type}
            </p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
