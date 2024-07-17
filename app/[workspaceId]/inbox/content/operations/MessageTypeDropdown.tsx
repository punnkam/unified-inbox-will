import { useState } from "react";
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
import { UnifiedConversationType } from "@/lib/realDataSchema";
import { useHotkeys } from "react-hotkeys-hook";
import { KeyboardShortcut } from "@/components/custom/KeyBoardShortcut";

export const messageTypes: {
  type: UnifiedConversationType;
  image: string;
}[] = [
  { type: UnifiedConversationType.Airbnb, image: "/images/host_airbnb.svg" },
  { type: UnifiedConversationType.SMS, image: "/images/host_sms.svg" },
  { type: UnifiedConversationType.Guesty, image: "/images/host_guesty.svg" },
  {
    type: UnifiedConversationType.Whatsapp,
    image: "/images/host_whatsapp.svg",
  },
  { type: UnifiedConversationType.Email, image: "/images/host_gmail.svg" },
];

export const MessageTypeDropdown = ({
  messageType,
  setMessageType,
  chatWindow = false,
  enableHotkey = false,
}: {
  messageType: UnifiedConversationType;
  setMessageType: (newMessageType: UnifiedConversationType) => void;
  chatWindow?: boolean;
  enableHotkey?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedMessageType, setSelectedMessageType] =
    useState<UnifiedConversationType>(messageType);

  const handleSelectMessageType = (messageType: UnifiedConversationType) => {
    setSelectedMessageType(messageType);
    setMessageType(messageType);
    setIsOpen(false);
  };

  if (enableHotkey) {
    useHotkeys("T", () => setIsOpen(!isOpen));
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DropdownMenuTrigger asChild>
        {chatWindow ? (
          <Button
            variant={"ghost"}
            size={"xs"}
            className="flex items-center gap-2"
          >
            <img
              src={
                messageTypes.find((type) => type.type === selectedMessageType)
                  ?.image
              }
              alt={selectedMessageType}
              className="w-6 h-6 rounded-full"
              style={
                selectedMessageType === UnifiedConversationType.Guesty
                  ? {
                      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    }
                  : undefined
              }
            />
            <div className="flex items-center gap-2">
              <p className="text-subtitle-sm text-secondary capitalize">
                {selectedMessageType}
              </p>
              <KeyboardShortcut shortcut="T" />
              <ChevronDownIcon />
            </div>
          </Button>
        ) : (
          <Button
            onClick={() => setIsOpen(!isOpen)}
            size={"sm"}
            variant={"ghost"}
            className="text-tertiary flex items-center gap-1 justify-between self-end capitalize"
          >
            Via {selectedMessageType}
            <ChevronDownIcon className="text-tertiary size-3" />
          </Button>
        )}
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
                type.type == UnifiedConversationType.Guesty
                  ? {
                      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    }
                  : undefined
              }
            />
            <p
              className={`text-subtitle-xs capitalize ${
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
