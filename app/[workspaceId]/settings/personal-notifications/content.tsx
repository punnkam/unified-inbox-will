"use client";

import {
  ArrowCircleBrokenUpLeftIcon,
  MailIcon,
} from "@/components/icons/CustomIcons";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useDebouncedSave } from "@/lib/hooks/useDebouncedSave";
import { PersonalNotifications } from "@/lib/types";
import { savePersonalNotifications } from "@/app/actions";

export default function PersonalNotificationsContent({
  memberId,
  memberNotificationSettings,
}: {
  memberId: number;
  memberNotificationSettings: PersonalNotifications | undefined;
}) {
  const initialData: PersonalNotifications = memberNotificationSettings || {
    pushNotifications: true,
    email: true,
    newGuestMessages: true,
    conversationTag: true,
    assignedToGuestConversation: true,
    mentionedInConversationNote: true,
    newDetectedUpsells: true,
    expiringUpsells: true,
    newTasks: true,
    assignedTask: true,
    taskMarkedAsDone: true,
  };

  const saveData = async (data: PersonalNotifications) => {
    // Call API to save the data
    const response = await savePersonalNotifications(memberId, data);

    if (!response.success) {
      toast.error("Error saving personal notifications: " + response.message);
      return;
    }

    toast.success("Personal notifications saved successfully");
  };

  const { data, handleChange, setData } =
    useDebouncedSave<PersonalNotifications>({
      initialData,
      saveData,
    });

  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex flex-col gap-3">
        <h1 className="text-title-2xl">Personal Notifications</h1>
        <p className="text-subtitle-sm text-tertiary">
          Select where and when you’ll be notified
        </p>
      </div>

      <div className="border-b border-primary"></div>

      <div className="flex flex-col gap-5">
        <p className="text-title-lg text-tertiary">Notification methods</p>

        <div className="flex justify-between items-start border border-secondary rounded-md p-4">
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

        <div className="flex justify-between items-start border border-secondary rounded-md p-4">
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

      <div className="border-b border-primary"></div>

      <div className="flex flex-col gap-5">
        <p className="text-title-lg text-tertiary">Guest messaging</p>

        <div className="border border-secondary rounded-md p-4">
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

      <div className="border-b border-primary"></div>

      <div className="flex flex-col gap-5">
        <p className="text-title-lg text-tertiary">Upsells</p>

        <div className="border border-secondary rounded-md p-4">
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

      <div className="border-b border-primary"></div>

      <div className="flex flex-col gap-5">
        <p className="text-title-lg text-tertiary">Tasks</p>

        <div className="border border-secondary rounded-md p-4">
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
