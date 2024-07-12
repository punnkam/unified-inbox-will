import { AutosizeTextarea } from "@/components/ui/textarea";
import { Member, fakeMembersData } from "@/lib/realDataSchema";
import { Avatar } from "./Avatar";
import { formatDistance } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowNarrowLeft,
  ChevronDownIcon,
  CornerUpLeftIcon,
  Edit05Icon,
  Trash02Icon,
} from "@/components/icons/CustomIcons";
import { useEffect, useRef, useState } from "react";

interface NoteMessageData {
  id: number;
  author: Member;
  text: string;
  timestamp: number;
  thread?: NoteMessageData[];
}

const NotesMessages: NoteMessageData[] = [
  {
    id: 1,
    author: fakeMembersData[2],
    text: "This guest is weird bro",
    timestamp: new Date().getTime() - 4 * 60 * 1000, // 4 minutes ago
    thread: [
      {
        id: 4,
        author: fakeMembersData[1],
        text: "Everyone chill out",
        timestamp: new Date().getTime() - 1 * 60 * 1000, // 1 minute ago
      },
    ],
  },
  {
    id: 2,
    author: fakeMembersData[1],
    text: "I actually think he's kinda mellow",
    timestamp: new Date().getTime() - 2 * 60 * 1000, // 2 minutes ago
  },
  {
    id: 3,
    author: fakeMembersData[0],
    text: "What's the status with the broken door?",
    timestamp: new Date().getTime() - 2 * 60 * 1000,
    thread: [
      {
        id: 4,
        author: fakeMembersData[3],
        text: "Everyone chill out",
        timestamp: new Date().getTime() - 1 * 60 * 1000, // 1 minute ago
      },
      {
        id: 5,
        author: fakeMembersData[2],
        text: "This guest is weird bro",
        timestamp: new Date().getTime() - 4 * 60 * 1000, // 4 minutes ago
      },
      {
        id: 6,
        author: fakeMembersData[1],
        text: "I actually think he's kinda mellow",
        timestamp: new Date().getTime() - 2 * 60 * 1000, // 2 minutes ago
      },
    ],
  },
  {
    id: 4,
    author: fakeMembersData[3],
    text: "Everyone chill out",
    timestamp: new Date().getTime() - 1 * 60 * 1000, // 1 minute ago
  },
];

export const Notes = () => {
  const [messages, setMessages] = useState<NoteMessageData[]>([]);
  const [message, setMessage] = useState("");
  const [view, setView] = useState<"all" | "thread">("all");
  const [selectedThread, setSelectedThread] = useState<NoteMessageData | null>(
    null
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(NotesMessages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedThread]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (message.trim() === "") return;

    const newMessage: NoteMessageData = {
      id: Date.now(),
      author: fakeMembersData[0], // Assume the current user is the first in the fakeMembersData array
      text: message,
      timestamp: Date.now(),
    };

    if (view === "all") {
      setMessages([...messages, newMessage]);
    } else if (selectedThread) {
      const updatedMessages = messages.map((msg) => {
        if (msg.id === selectedThread.id) {
          return {
            ...msg,
            thread: [...(msg.thread || []), newMessage],
          };
        }
        return msg;
      });
      setMessages(updatedMessages);
      setSelectedThread({
        ...selectedThread,
        thread: [...(selectedThread.thread || []), newMessage],
      });
    }

    setMessage("");
  };

  return (
    <div className="flex flex-col gap-4 h-screen">
      <div className="py-3 border-b border-primary">
        {view === "all" ? (
          <div className="px-6 py-5 flex flex-col gap-[10px]">
            <p className="text-title-05xl">Notes</p>
            <p className="text-secondary text-body-sm">
              Mention your teammates and shit
            </p>
          </div>
        ) : (
          <div className="px-6 py-5 flex flex-col gap-[10px]">
            <div
              className="text-secondary text-subtitle-xs flex items-center gap-2 hover:cursor-pointer hover:text-primary"
              onClick={() => {
                setView("all");
              }}
            >
              <ChevronDownIcon className="rotate-90" />
              Back
            </div>
            <p className="text-title-05xl">Thread</p>
          </div>
        )}
      </div>

      {/* Data */}
      <div className="overflow-y-auto">
        {view === "all" ? (
          <div className="flex flex-col px-4">
            {messages.map((message) => (
              <NoteMessage
                key={message.id}
                message={message}
                onClick={(selectedThread) => {
                  setSelectedThread(selectedThread);
                  setView("thread");
                }}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="px-4">
            <NoteMessage
              key={selectedThread?.id}
              message={selectedThread!}
              inThread
            />
            <div className="px-3 flex items-center gap-1 text-tertiary">
              <p className="text-body-xs text-nowrap">
                {selectedThread?.thread?.length}{" "}
                {selectedThread?.thread?.length! > 1 ? "replies" : "reply"}
              </p>
              <div className="border-b border-secondary h-[1px] w-full" />
            </div>
            <div className="flex flex-col">
              {selectedThread &&
                selectedThread.thread?.map((message) => (
                  <NoteMessage key={message.id} message={message} />
                ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </div>

      <div className="px-6 pb-4 relative">
        <AutosizeTextarea
          placeholder="Write message here"
          className="resize-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxHeight={300}
          minHeight={80}
        />
        {message.length > 0 && (
          <div
            className="absolute bottom-7 right-9 rounded-full bg-brand size-[22px] p-[6px] flex items-center justify-center hover:cursor-pointer"
            onClick={sendMessage}
          >
            <ArrowNarrowLeft className="text-icon-primary-inverse rotate-90" />
          </div>
        )}
      </div>
    </div>
  );
};

export const NoteMessage = ({
  message,
  inThread,
  onClick,
}: {
  message: NoteMessageData;
  inThread?: boolean;
  onClick?: (selectedThread: NoteMessageData) => void;
}) => {
  return (
    <div className="group flex gap-2 px-3 py-4 rounded-md hover:bg-hover relative">
      <Avatar size={"medium"} image={message.author.image} greenDot={true} />
      <div className="flex flex-col gap-1 w-full">
        <div className="flex flex-col gap-[6px]">
          <div className="flex items-center gap-1">
            <p className="text-subtitle-sm">{message.author.name}</p>
            <p className="text-body-xs text-secondary">
              {formatDistance(message.timestamp, new Date(), {
                addSuffix: true,
              })}
            </p>
          </div>

          <p className="text-body-sm">{message.text}</p>
        </div>

        {/* Thread */}
        {!inThread && message.thread && (
          <div
            className="group/thread p-[6px] flex items-center justify-between w-full rounded-md hover:bg-primary hover:cursor-pointer"
            onClick={() => {
              onClick && onClick(message);
            }}
          >
            <div className="flex items-center gap-2">
              {message.thread.length > 1 ? (
                <div className="flex space-x-[-4px]">
                  <Avatar size={"xxs"} image={message.thread[0].author.image} />
                  <Avatar size={"xxs"} image={message.thread[1].author.image} />
                </div>
              ) : (
                <Avatar size={"xxs"} image={message.thread[0].author.image} />
              )}

              <div className="flex items-end gap-1">
                <p className="text-subtitle-xs text-brand-hover">
                  {message.thread.length}{" "}
                  {message.thread.length > 1 ? "replies" : "reply"}
                </p>
                <p className="text-body-2xs text-secondary">View thread</p>
              </div>
            </div>
            <div className="hidden group-hover/thread:flex size-3 items-center justify-center  text-primary">
              <ChevronDownIcon className="w-[7px] min-w-[7px] -rotate-90" />
            </div>
          </div>
        )}
      </div>

      {/* reply, edit, delete */}
      <div className="hidden group-hover:flex absolute -top-[17px] right-[2px]  items-center gap-[2px] bg-primary p-[3px] rounded-md border border-primary">
        <Tooltip>
          <TooltipTrigger>
            <Button size="iconXs" variant={"ghost"}>
              <CornerUpLeftIcon className="size-3 text-icon-secondary" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Reply</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button size="iconXs" variant={"ghost"}>
              <Edit05Icon className="size-3 text-icon-secondary" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Button size="iconXs" variant={"ghost"}>
              <Trash02Icon className="size-3 text-icon-secondary" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
