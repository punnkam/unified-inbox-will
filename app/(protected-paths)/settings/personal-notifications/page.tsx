"use client";

import ArrowCircleBrokenUpLeftIcon from "@/components/icons/ArrowCircleBrokenUpLeftIcon";
import MailIcon from "@/components/icons/MailIcon";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { toast } from "sonner";

// The types for every input to save
interface Data {
  pushNotifications: boolean;
  email: boolean;
  newGuestMessages: boolean;
  conversationTag: boolean;
  assignedToGuestConversation: boolean;
  mentionedInConversationNote: boolean;
  newDetectedUpsells: boolean;
  expiringUpsells: boolean;
  newTasks: boolean;
  assignedTask: boolean;
  taskMarkedAsDone: boolean;
}

export default function PersonalNotificationsPage() {
  // All the data that needs to be saved (with default values)
  const [data, setData] = useState<Data>({
    pushNotifications: false,
    email: false,
    newGuestMessages: false,
    conversationTag: false,
    assignedToGuestConversation: false,
    mentionedInConversationNote: false,
    newDetectedUpsells: false,
    expiringUpsells: false,
    newTasks: false,
    assignedTask: false,
    taskMarkedAsDone: false,
  });

  // Handle the change of the data by updating the state
  // This function is used by every input field
  const handleChange = (key: keyof Data, value: boolean) => {
    if (data) {
      setData((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  // Debounce the data (Wait for 3 seconds before saving the data)
  const debouncedData = useDebounce(data, 1000);

  // This is where the save function will be called
  useEffect(() => {
    // Save the data here
    // console.log("Debounced data", debouncedData);

    // some sort of validation from api response
    // if success, show a message
    toast.success("Settings saved successfully");
  }, [debouncedData]);

  // This will only run once when the component is mounted
  useEffect(() => {
    // Fetch/Load the data into state here
    setData({
      pushNotifications: true,
      email: false,
      newGuestMessages: true,
      conversationTag: false,
      assignedToGuestConversation: false,
      mentionedInConversationNote: false,
      newDetectedUpsells: true,
      expiringUpsells: false,
      newTasks: true,
      assignedTask: false,
      taskMarkedAsDone: false,
    });
  }, []);

  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex flex-col gap-3">
        <h1 className="text-title-2xl">Personal Notifications</h1>
        <p className="text-subtitle-sm text-tertiary">
          Select where and when you’ll be notified
        </p>
      </div>

      <div className="border-b stroke-primary"></div>

      <div className="flex flex-col gap-5">
        <p className="text-title-lg text-tertiary">Notification methods</p>

        <div className="flex justify-between items-start border border-stroke rounded-md p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex justify-center items-center">
              <ArrowCircleBrokenUpLeftIcon className="text-icon-tertiary" />
            </div>
            <div>
              <p className="text-subtitle-xs">Push Notifications</p>
              <p className="text-body-2xs font-normal text-tertiary">
                Receive personal notifications on desktop for any selected
                notification types.
              </p>
            </div>
          </div>
          <div>
            <Switch
              checked={data.pushNotifications}
              onCheckedChange={() =>
                handleChange("pushNotifications", !data.pushNotifications)
              }
            />
          </div>
        </div>

        <div className="flex justify-between items-start border border-stroke rounded-md p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex justify-center items-center">
              <MailIcon className="text-icon-tertiary" />
            </div>
            <div>
              <p className="text-subtitle-xs">Email</p>
              <p className="text-body-2xs font-normal text-tertiary">
                With personal email notifications, we'll send an email to you
                for any selected notification types.
              </p>
            </div>
          </div>
          <div>
            <Switch
              checked={data.email}
              onCheckedChange={() => handleChange("email", !data.email)}
            />
          </div>
        </div>
      </div>

      <div className="border-b stroke-primary"></div>

      <div className="flex flex-col gap-5">
        <p className="text-title-lg text-tertiary">Guest messaging</p>

        <div className="border border-stroke rounded-md p-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="newGuestMessages"
                checked={data.newGuestMessages}
                onCheckedChange={() =>
                  handleChange("newGuestMessages", !data.newGuestMessages)
                }
              />
              <label htmlFor="newGuestMessages" className="text-subtitle-xs">
                All new guest messages
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="conversationTag"
                checked={data.conversationTag}
                onCheckedChange={() =>
                  handleChange("conversationTag", !data.conversationTag)
                }
              />
              <label htmlFor="conversationTag" className="text-subtitle-xs">
                A message is tagged with a conversation tag
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="assignedToGuestConversation"
                checked={data.assignedToGuestConversation}
                onCheckedChange={() =>
                  handleChange(
                    "assignedToGuestConversation",
                    !data.assignedToGuestConversation
                  )
                }
              />
              <label
                htmlFor="assignedToGuestConversation"
                className="text-subtitle-xs"
              >
                You’re assigned to a guest conversation
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="mentionedInConversationNote"
                checked={data.mentionedInConversationNote}
                onCheckedChange={() =>
                  handleChange(
                    "mentionedInConversationNote",
                    !data.mentionedInConversationNote
                  )
                }
              />
              <label
                htmlFor="mentionedInConversationNote"
                className="text-subtitle-xs"
              >
                You’re mentioned in a conversation note
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b stroke-primary"></div>

      <div className="flex flex-col gap-5">
        <p className="text-title-lg text-tertiary">Upsells</p>

        <div className="border border-stroke rounded-md p-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="newDetectedUpsells"
                checked={data.newDetectedUpsells}
                onCheckedChange={() =>
                  handleChange("newDetectedUpsells", !data.newDetectedUpsells)
                }
              />
              <label htmlFor="newDetectedUpsells" className="text-subtitle-xs">
                All new detected upsells
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="expiringUpsells"
                checked={data.expiringUpsells}
                onCheckedChange={() =>
                  handleChange("expiringUpsells", !data.expiringUpsells)
                }
              />
              <label htmlFor="expiringUpsells" className="text-subtitle-xs">
                Upsells that are expiring in 24 hours
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b stroke-primary"></div>

      <div className="flex flex-col gap-5">
        <p className="text-title-lg text-tertiary">Tasks</p>

        <div className="border border-stroke rounded-md p-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="newTasks"
                checked={data.newTasks}
                onCheckedChange={() => handleChange("newTasks", !data.newTasks)}
              />
              <label htmlFor="newTasks" className="text-subtitle-xs">
                All new tasks
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="assignedTask"
                checked={data.assignedTask}
                onCheckedChange={() =>
                  handleChange("assignedTask", !data.assignedTask)
                }
              />
              <label htmlFor="assignedTask" className="text-subtitle-xs">
                You’re assigned a task
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="taskMarkedAsDone"
                checked={data.taskMarkedAsDone}
                onCheckedChange={() =>
                  handleChange("taskMarkedAsDone", !data.taskMarkedAsDone)
                }
              />
              <label htmlFor="taskMarkedAsDone" className="text-subtitle-xs">
                A task you’re assigned to is marked as done
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
