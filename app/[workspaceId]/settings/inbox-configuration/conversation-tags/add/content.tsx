"use client";
import { Input } from "@/components/ui/input";
import {
  ConversationTag,
  conversationTagTypes,
  fakeIconsData,
} from "@/lib/types";
import { useState } from "react";
import { ArrowNarrowLeft } from "@/components/icons/CustomIcons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { saveConversationTag } from "@/app/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { TypeDropdown } from "../typeDropdown";
import { ActionDropdown } from "../actionDropdown";
import { ConvoTag } from "../convoTag";
import { IconComponent } from "@/components/icons/IconComponent";
import { X } from "lucide-react";

export default function AddConversationTagContent({
  workspaceId,
}: {
  workspaceId: number;
}) {
  const [data, setData] = useState<ConversationTag>({
    workspaceId: workspaceId,
    name: "",
    description: "",
    actionItem: "Create task",
    type: conversationTagTypes[0],
  });
  const [loading, setLoading] = useState({
    save: false,
    delete: false,
  });

  const router = useRouter();

  const handleChange = (
    key: keyof typeof data,
    value: (typeof data)[keyof typeof data]
  ) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    setLoading({ ...loading, save: true });

    // Call your API here
    const response = await saveConversationTag(data);

    setLoading({ ...loading, save: false });

    if (response.success) {
      toast.success("Conversation tag created successfully");

      // After uploading the new tag - route back to main page
      router.push("../conversation-tags/");
    } else {
      toast.error("Error creating conversation tag: " + response.message);
    }
  };

  return (
    <div className="flex flex-col gap-[28px]">
      <div className="flex flex-col gap-4">
        <Link href="../conversation-tags">
          <Button
            variant="link"
            className="text-tertiary flex items-center gap-2 p-2"
          >
            <ArrowNarrowLeft />
            All conversation tags
          </Button>
        </Link>
        <h1 className="text-title-2xl">Add conversation tag</h1>
      </div>

      <div className="border-b border-primary"></div>

      <div className="flex flex-col gap-3">
        <div>
          <label htmlFor="tag-name" className="text-subtitle-sm text-primary">
            Tag name
          </label>
          <p className="text-tertiary text-body-xs font-normal">
            Short, descriptive names work best
          </p>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size={"icon"}
                className="w-10 h-10 px-0"
              >
                <IconComponent
                  icon={
                    fakeIconsData.find((icon) => icon.id === data.iconId)
                      ?.icon || fakeIconsData[0].icon
                  }
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="grid grid-cols-5">
              {fakeIconsData.map((icon) => (
                <DropdownMenuItem key={icon.id} className="w-fit p-0">
                  <Button
                    variant="ghost"
                    size={"icon"}
                    className="h-10 w-10 px-0 text-icon-disabled hover:text-icon-tertiary"
                    onClick={() => {
                      handleChange("iconId", icon.id);
                    }}
                  >
                    <IconComponent icon={icon.icon} />
                  </Button>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Input
            id="tag-name"
            placeholder="Maintenance issue"
            value={data.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <label
            htmlFor="tag-description"
            className="text-subtitle-sm text-primary"
          >
            Tag description
          </label>
          <p className="text-tertiary text-body-xs font-normal">
            A message should be tagged when...
          </p>
        </div>
        <Textarea
          id="tag-description"
          placeholder="When a guest says something is broken or not working"
          value={data.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <div className="flex justify-between items-center gap-2">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-subtitle-sm text-primary">Type</p>
              <p className="text-tertiary text-body-xs font-normal">
                Choose category of tag
              </p>
            </div>
            <TypeDropdown data={data} handleChange={handleChange} />
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-subtitle-sm text-primary">Action item</p>
              <p className="text-tertiary text-body-xs font-normal">
                What you must do to un-tag the conversation
              </p>
            </div>
            <ActionDropdown
              actionItem={data.actionItem}
              handleChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full max-w-[415px]">
          <div className="h-[66px] bg-primary-subtle rounded-xl"></div>
          <ConvoTag convoTag={data} />
          <div className="h-[48px] bg-secondary rounded-xl"></div>
          <div className="text-body-xs text-tertiary font-normal self-end">
            *This will display in the conversation sidebar
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button
          size={"sm"}
          variant="outline"
          onClick={() => handleChange("inboxDashboard", !data.inboxDashboard)}
          className="flex items-center gap-2"
        >
          {data.inboxDashboard && data.inboxDashboard == true ? (
            <>
              <X className="h-4 w-4" />
              <p>Remove from inbox dashboard</p>
            </>
          ) : (
            <>
              <X className="h-4 w-4 rotate-45" />
              <p>Add to inbox dashboard</p>
            </>
          )}
        </Button>
        <Button
          size={"sm"}
          variant="default"
          onClick={() => handleSave()}
          disabled={loading.save || data.name === "" || data.description === ""}
        >
          {loading.save ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}
