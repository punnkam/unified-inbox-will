import ArrowCircleBrokenUpLeftIcon from "@/components/icons/ArrowCircleBrokenUpLeftIcon";
import MailIcon from "@/components/icons/MailIcon";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

export default function PersonalNotificationsPage() {
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
            <Switch defaultChecked />
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
            <Switch />
          </div>
        </div>
      </div>

      <div className="border-b stroke-primary"></div>

      <div className="flex flex-col gap-5">
        <p className="text-title-lg text-tertiary">Guest messaging</p>

        <div className="border border-stroke rounded-md p-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Checkbox id="check1" defaultChecked />
              <label htmlFor="check1" className="text-subtitle-xs">
                All new guest messages
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="check2" />
              <label htmlFor="check2" className="text-subtitle-xs">
                A message is tagged with a conversation tag
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="check3" />
              <label htmlFor="check3" className="text-subtitle-xs">
                You’re assigned to a guest conversation
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="check4" />
              <label htmlFor="check4" className="text-subtitle-xs">
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
              <Checkbox id="check5" defaultChecked />
              <label htmlFor="check5" className="text-subtitle-xs">
                All new detected upsells
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="check6" />
              <label htmlFor="check6" className="text-subtitle-xs">
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
              <Checkbox id="check7" defaultChecked />
              <label htmlFor="check7" className="text-subtitle-xs">
                All new tasks
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="check8" />
              <label htmlFor="check8" className="text-subtitle-xs">
                You’re assigned a task
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="check8" />
              <label htmlFor="check8" className="text-subtitle-xs">
                A task you’re assigned to is marked as done
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
