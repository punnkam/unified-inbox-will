import { Button } from "@/components/ui/button";
import { ConvoSummary } from "./sidebar/ConvoSummary";
import {
  ChevronDownIcon,
  CurrencyDollarIcon,
  PauseSqareIcon,
  PhoneIcon,
  ArrowCircleBrokenRightIcon,
  FilledCheckCircleIcon,
  Loading02Icon,
  SkinnyCircleIcon,
  XCircleIcon,
  PlusIcon,
  HorizontalDotsIcon,
  BreezewayIcon,
} from "@/components/icons/CustomIcons";
import { Avatar } from "./sidebar/Avatar";
import {
  Conversation,
  ConversationTag,
  Member,
  MessageItem,
  TaskItem,
  TaskStatusEnum,
  TaskTypeEnum,
  UnifiedConversationType,
  UpsellItem,
  UpsellStatusEnum,
  fakeMembersData,
} from "@/lib/realDataSchema";
import { Assignee } from "./sidebar/Assignee";
import { ConversationTagItem } from "./sidebar/ConversationTag";
import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { GuestJourney } from "./sidebar/GuestJourney";
import {
  CustomTabs,
  CustomTabsContent,
  CustomTabsList,
  CustomTabsTrigger,
} from "@/components/ui/custom-tabs";
import { BookingInfoTab } from "../components/BookingInfoTab";
import { UpsellsTab } from "../components/UpsellsTab";
import { useOpsRightSidebar } from "../../OpsRightSidebarContext";
import { TaskAndUpsellOptions } from "./TaskAndUpsellOptions";
import { format, set } from "date-fns";
import { StatusDropdown } from "../components/StatusDropdown";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { AutosizeTextarea } from "@/components/ui/textarea";
import CountBadge from "@/components/custom/CountBadge";
import { TasksTab } from "../components/TasksTab";
import {
  TaskAssigneeDropdown,
  TaskStatusDropdown,
  TaskTypeDropdown,
} from "../components/TaskDropdowns";
import { Input } from "@/components/ui/input";

export const OperationsRightSidebar = ({
  conversationData,
  onTagClick,
  selectedTagId,
  addMessage,
}: {
  conversationData: Conversation;
  onTagClick: (tagId: ConversationTag["id"]) => void;
  selectedTagId: number | null;
  addMessage: (message: MessageItem) => void;
}) => {
  const { selectedTab, setSelectedTab } = useOpsRightSidebar();

  const [lastSelectedTab, setLastSelectedTab] = useState<
    "booking" | "upsells" | "tasks" | "calls"
  >("booking");
  const [upsells, setUpsells] = useState<UpsellItem[]>(
    conversationData.reservation.upsells || []
  );
  // useState to store the edited upsell text
  const [editedUpsellText, setEditedUpsellText] = useState<string | null>("");

  // State to store all tasks data
  const [tasks, setTasks] = useState<TaskItem[]>(
    conversationData.reservation.tasks || []
  );

  // State to store the edited task name
  const [editedTask, setEditedTask] = useState<TaskItem>();

  // useEffect to update the state data when the conversation id
  useEffect(() => {
    setUpsells(conversationData.reservation.upsells || []);
    setTasks(conversationData.reservation.tasks || []);
    setSelectedTab("default");
  }, [conversationData.id]);

  useEffect(() => {
    if (selectedTab.type == "upsell") {
      setEditedUpsellText(
        selectedTab.data ? selectedTab.data.finalMessage : null
      );
    }
    if (selectedTab.type == "task") {
      setEditedTask(selectedTab.data ? selectedTab.data : null);
    }
  }, [selectedTab]);

  // handler to update an upsell status
  const updateUpsellData = (
    upsellId: string,
    key: keyof UpsellItem,
    value: UpsellItem[keyof UpsellItem]
  ) => {
    console.log("Updating upsell data", upsellId, key, value);

    // TODO API: handle updating an upsell status on backend
    setUpsells((prevUpsells) =>
      prevUpsells.map((upsell) => {
        if (upsell.id === upsellId) {
          const updatedUpsell = { ...upsell, [key]: value };

          // Update the selected tab data (so the status dropdown updates)
          setSelectedTab({ type: "upsell", data: updatedUpsell });
          return updatedUpsell;
        }
        return upsell;
      })
    );
  };

  const updateTaskData = (
    taskId: string,
    key: keyof TaskItem,
    value: TaskItem[keyof TaskItem]
  ) => {
    console.log("Updating task data", taskId, key, value);

    // TODO API: handle updating task data
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const updatedTask = { ...task, [key]: value };

          console.log("Updated task", updatedTask);

          // Update the selected tab data (so the status dropdown updates)
          setSelectedTab({ type: "task", data: updatedTask });
          return updatedTask;
        }
        return task;
      })
    );
  };

  // handleTagClick is called when a tag is clicked
  const handleTagClick = (tag: ConversationTag) => {
    // call the onTagClick function for parent to handle
    onTagClick(tag.id);
  };

  const handlePauseAi = (time: "30min" | "1hr" | "indefinitely") => {
    if (time === "30min") {
      // TODO API: handle pause ai for 30 min
    } else if (time === "1hr") {
      // TODO API: handle pause ai for 1 hr
    } else if (time === "indefinitely") {
      // TODO API: handle pause ai indefinitely
    }

    toast.success("AI paused successfully: " + time);
  };

  const handleSendUpsell = () => {
    console.log("Send upsell", editedUpsellText);
    toast.success("Upsell sent successfully");

    // TODO API: handle send upsell

    // update the finaltext to the original text
    updateUpsellData(selectedTab.data.id, "finalMessage", editedUpsellText!);

    // update the status to sent
    updateUpsellData(selectedTab.data.id, "status", UpsellStatusEnum.Awaiting);

    // TODO API: add the message to the conversation
    addMessage({
      id: Date.now().toString(),
      author: "host",
      text: editedUpsellText!,
      isIncoming: false,
      isSeen: false,
      status: "delivered",
      type: UnifiedConversationType.Airbnb,
      timestamp: Math.floor(Date.now() / 1000),
    });
  };

  const handleDeleteUpsell = () => {
    console.log("Delete upsell", selectedTab.data.id);
    toast.success("Upsell deleted successfully");

    // TODO API: handle delete upsell

    // go back to the default tab (since we deleted the upsell we are on)
    setSelectedTab("default");

    // remove the upsell from the state
    setUpsells(upsells.filter((upsell) => upsell.id !== selectedTab.data.id));
  };

  const handleDeleteTaskMessage = (messageId: string) => {
    console.log("Delete message", messageId);
    // TODO API: handle delete message

    // Remove the message from the task edit state
    setEditedTask((prevTask) => ({
      ...prevTask!,
      messages: prevTask!.messages?.filter(
        (message: MessageItem) => message.id.toString() !== messageId
      ),
    }));
  };

  const handleDeleteTask = () => {
    console.log("Delete task", selectedTab.data.id);
    toast.success("Task deleted successfully");

    // TODO API: handle delete task

    // go back to the default tab (since we deleted the task we are on)
    setSelectedTab("default");

    // remove the task from the state
    setTasks(tasks.filter((task) => task.id !== selectedTab.data.id));
  };

  const handleSaveTask = () => {
    console.log("Save task", selectedTab.data.id);

    // TODO API: handle save task

    // update all task data state (set tasks sate to replace the past one with editedTask data)
    setTasks(
      tasks.map((task) => {
        if (task.id === selectedTab.data.id) {
          return editedTask!;
        }
        return task;
      })
    );

    toast.success("Task saved successfully");

    // go back to the default tab
    setSelectedTab("default");
  };

  const handleSendTaskToBreezeway = () => {
    // this does not go into the edited state (goes straight to the main task state)

    console.log("Send task to breezeway id:", selectedTab.data.id);

    // TODO API: handle send task to breezeway

    // update the task data state
    updateTaskData(selectedTab.data.id, "sendToBreezeway", true);

    toast.success("Task sent to Breezeway successfully");
  };

  return (
    <ScrollArea className="bg-primary-subtle">
      <div className="w-[400px] min-w-[400px] pb-6 overflow-y-auto">
        {selectedTab === "default" && (
          <div>
            <div className="pt-3 pb-6 border-b border-primary">
              <p className="px-6 py-5 text-title-05xl">At a glance</p>

              <div className="flex flex-col gap-2 px-6">
                {/* Guest Journey Card */}
                <GuestJourney
                  arrivalDate={conversationData.reservation.arrivalDate}
                  departureDate={conversationData.reservation.departureDate}
                />

                {/* Conversation Summary */}
                <ConvoSummary
                  title="Robb is doing pretty well."
                  summary="The Lannister scouts thought Robb only had twenty thousand troops in his batallion."
                />
              </div>
            </div>

            {/* Conversation */}
            <div className="flex flex-col gap-4 pt-6 pb-8">
              <div className="flex items-center gap-[10px] px-6">
                <div className="flex items-center justify-between w-full">
                  <p className="text-title-05xl">Conversation</p>

                  {/* Avatar in chat */}
                  <Avatar
                    size={"small"}
                    image={
                      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    greenDot={true}
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button variant={"ghost"} size={"iconMd"}>
                    <PhoneIcon className="text-icon-brand size-[15px]" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant={"ghost"} size={"iconMd"}>
                        <PauseSqareIcon className="text-icon-brand size-[15px]" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="text-subtitle-xs"
                    >
                      <DropdownMenuItem onClick={() => handlePauseAi("30min")}>
                        Pause AI for 30 min
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handlePauseAi("1hr")}>
                        Pause AI for 1 hr
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handlePauseAi("indefinitely")}
                      >
                        Pause AI indefinitely
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Conversation Stuff */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 px-6">
                  <p className="text-body-xs text-secondary">Assignee</p>

                  {/* Assignee */}
                  <Assignee
                    assigneeData={conversationData.assigneeData}
                    conversationId={conversationData.id}
                  />
                </div>

                {conversationData.tags && (
                  <div className="flex flex-col gap-2 px-6">
                    <p className="text-body-xs text-secondary">
                      Conversation Tags
                    </p>

                    {/* Conversation Tags */}
                    {conversationData.tags!.map((tag) => (
                      <ConversationTagItem
                        key={tag.id}
                        tag={tag}
                        onTagClick={handleTagClick}
                        selected={selectedTagId === tag.id}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Tabs */}
            <CustomTabs
              className="flex flex-col"
              defaultValue={lastSelectedTab}
              onValueChange={(value) => {
                // Update the last selected tab
                setLastSelectedTab(value as typeof lastSelectedTab);
              }}
            >
              <CustomTabsList>
                <CustomTabsTrigger value="booking">Booking</CustomTabsTrigger>
                <CustomTabsTrigger value="upsells">
                  <div className="flex items-center gap-1 h-[19.2px]">
                    Upsells
                    <CountBadge
                      todo
                      count={upsells.length}
                      selected={lastSelectedTab === "upsells"}
                    />
                  </div>
                </CustomTabsTrigger>
                <CustomTabsTrigger value="tasks">
                  <div className="flex items-center gap-1 h-[19.2px]">
                    Tasks
                    <CountBadge
                      todo
                      count={0}
                      selected={lastSelectedTab === "tasks"}
                    />
                  </div>
                </CustomTabsTrigger>
                <CustomTabsTrigger value="calls">
                  <div className="flex items-center gap-1 h-[19.2px]">
                    Calls
                    <CountBadge
                      todo
                      count={0}
                      selected={lastSelectedTab === "calls"}
                    />
                  </div>
                </CustomTabsTrigger>
              </CustomTabsList>
              <CustomTabsContent value="booking" className="px-0">
                <BookingInfoTab conversationData={conversationData} />
              </CustomTabsContent>
              <CustomTabsContent value="upsells">
                <UpsellsTab
                  upsells={upsells}
                  updateUpsellData={updateUpsellData}
                />
              </CustomTabsContent>
              <CustomTabsContent value="tasks">
                <TasksTab tasks={tasks} updateTaskData={updateTaskData} />
              </CustomTabsContent>
              <CustomTabsContent value="calls">
                <p>calls</p>
              </CustomTabsContent>
            </CustomTabs>
          </div>
        )}
        {selectedTab.type === "upsell" && (
          <div>
            <div className="py-3 border-b border-primary">
              <div className="px-6 py-5 flex flex-col gap-[10px]">
                <div
                  className="text-secondary text-subtitle-xs flex items-center gap-2 hover:cursor-pointer hover:text-primary"
                  onClick={() => {
                    // reset the status to not sent
                    setSelectedTab("default");
                  }}
                >
                  <ChevronDownIcon className="rotate-90" />
                  Back
                </div>
                <p className="text-title-05xl">{selectedTab.data.type}</p>
              </div>
            </div>

            {/* Data */}
            <div className="flex flex-col gap-6 py-6">
              <div className="px-6">
                <TaskAndUpsellOptions
                  title="Type"
                  value={selectedTab.data.type}
                />
                <TaskAndUpsellOptions
                  title="Original dates"
                  value={`${format(
                    conversationData.reservation.arrivalDate,
                    "MMM dd"
                  )} - ${format(
                    conversationData.reservation.departureDate,
                    "MMM dd"
                  )}`}
                />
                {selectedTab.data.newCheckInDate &&
                  selectedTab.data.newCheckOutDate && (
                    <TaskAndUpsellOptions
                      title="New dates"
                      value={`${format(
                        selectedTab.data.newCheckInDate,
                        "MMM dd"
                      )} - ${format(
                        selectedTab.data.newCheckOutDate,
                        "MMM dd"
                      )}`}
                    />
                  )}

                <TaskAndUpsellOptions
                  title="Discounted price"
                  value={`${selectedTab.data.totalPriceWithDiscount} ${selectedTab.data.currency} `}
                />

                {/* <DropdownMenuTrigger asChild> */}
                <TaskAndUpsellOptions
                  title="Status"
                  value={
                    (selectedTab.data.status == UpsellStatusEnum.Awaiting &&
                      "Sent") ||
                    (selectedTab.data.status ==
                      UpsellStatusEnum.GuestAccepted &&
                      "Accepted") ||
                    (selectedTab.data.status ==
                      UpsellStatusEnum.GuestDeclined &&
                      "Declined") ||
                    (selectedTab.data.status == UpsellStatusEnum.NotSent &&
                      "Not sent") ||
                    "Unknown"
                  }
                  icon={
                    <div
                      className={cn(
                        "flex items-center justify-center size-6 min-w-6 min-h-6 rounded-full",
                        selectedTab.data.status == UpsellStatusEnum.Awaiting &&
                          "text-amber-600 bg-amber-100",
                        selectedTab.data.status ==
                          UpsellStatusEnum.GuestAccepted &&
                          "text-green-600 bg-success-subtle",
                        selectedTab.data.status ==
                          UpsellStatusEnum.GuestDeclined &&
                          "text-error bg-error-subtle",
                        selectedTab.data.status == UpsellStatusEnum.NotSent &&
                          "text-gray-600"
                      )}
                    >
                      <CurrencyDollarIcon className="h-[13.3px] w-fit" />
                    </div>
                  }
                  isDropdown
                  dropdownContent={
                    <StatusDropdown
                      onUpdateStatus={(newStatus) => {
                        updateUpsellData(
                          selectedTab.data.id,
                          "status",
                          newStatus
                        );
                      }}
                    />
                  }
                />
              </div>

              <div className="border-b border-primary"></div>

              {/* Edit Message */}
              <div className="px-6">
                <AutosizeTextarea
                  disabled={
                    selectedTab.data.status !== UpsellStatusEnum.NotSent
                  }
                  placeholder="Your upsell message here..."
                  defaultValue={editedUpsellText!}
                  onChange={(e) => setEditedUpsellText(e.target.value)}
                  className="resize-none bg-primary"
                  maxHeight={300}
                  minHeight={80}
                />
              </div>

              {/* Only show the actions if the upsell is not sent */}
              {selectedTab.data.status === UpsellStatusEnum.NotSent && (
                <div className="flex gap-2 px-6">
                  <Button
                    variant="secondary"
                    size="xs"
                    className="w-full"
                    onClick={handleDeleteUpsell}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="default"
                    size="xs"
                    className="w-full"
                    onClick={handleSendUpsell}
                  >
                    Send
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedTab.type === "task" && (
          <div>
            <div className="py-3 border-b border-primary">
              <div className="px-6 py-5 flex flex-col gap-[10px]">
                <div
                  className="text-secondary text-subtitle-xs flex items-center gap-2 hover:cursor-pointer hover:text-primary"
                  onClick={() => {
                    // reset the status to not sent
                    setSelectedTab("default");
                  }}
                >
                  <ChevronDownIcon className="rotate-90" />
                  Back
                </div>
                <p className="text-title-05xl">
                  {selectedTab.data ? "Edit" : "Add"} task
                </p>
              </div>
            </div>

            {/* Data */}
            <div className="flex flex-col gap-6 py-6">
              {/* Name in an input field */}
              <div className="px-6 flex flex-col gap-2">
                <p className="text-subtitle-xs">Task name</p>

                <Input
                  className="h-9"
                  placeholder="Task name"
                  value={editedTask?.name || ""}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask!, name: e.target.value })
                  }
                />
              </div>

              <div className="border-b border-primary"></div>

              <div className="px-6">
                <TaskAndUpsellOptions
                  title="Assignee"
                  value={
                    editedTask?.assignee
                      ? editedTask?.assignee.name!
                      : "Unassigned"
                  }
                  isDropdown
                  icon={
                    <div className="pe-1">
                      <Avatar
                        image={
                          editedTask?.assignee && editedTask?.assignee.image
                        }
                        size="small"
                      />
                    </div>
                  }
                  dropdownContent={
                    <TaskAssigneeDropdown
                      onUpdateAssignee={(newAssignee: Member | undefined) =>
                        // update the task edit data
                        setEditedTask((prevTask) => ({
                          ...prevTask!,
                          assignee: newAssignee,
                        }))
                      }
                      availableMembers={fakeMembersData}
                    />
                  }
                />

                <TaskAndUpsellOptions
                  title="Category"
                  value={editedTask?.type!}
                  icon={
                    <div className="pe-1">
                      <div
                        className={cn(
                          "size-[11px] rounded-full",
                          editedTask?.type === TaskTypeEnum.Cleaning &&
                            "bg-icon-success",
                          editedTask?.type === TaskTypeEnum.Maintenance &&
                            "bg-icon-active",
                          editedTask?.type === TaskTypeEnum.Safety &&
                            "bg-icon-error",
                          editedTask?.type === TaskTypeEnum.Supplies &&
                            "bg-orange-500",
                          editedTask?.type === TaskTypeEnum.Other &&
                            "bg-icon-disabled"
                        )}
                      ></div>
                    </div>
                  }
                  isDropdown
                  dropdownContent={
                    <TaskTypeDropdown
                      value={editedTask?.type!}
                      setValue={(newType: TaskTypeEnum) => {
                        // update the task edit data
                        setEditedTask((prevTask) => ({
                          ...prevTask!,
                          type: newType,
                        }));
                      }}
                    />
                  }
                />

                <TaskAndUpsellOptions
                  title="Status"
                  value={editedTask?.status!}
                  icon={
                    <div>
                      {editedTask?.status === TaskStatusEnum.Cancelled && (
                        <XCircleIcon className="text-icon-error h-[13.3px] w-fit" />
                      )}
                      {editedTask?.status === TaskStatusEnum.Done && (
                        <FilledCheckCircleIcon className="text-icon-success h-[13.3px] w-fit" />
                      )}
                      {editedTask?.status === TaskStatusEnum.InProgress && (
                        <ArrowCircleBrokenRightIcon className="text-icon-active h-[13.3px] w-fit" />
                      )}
                      {editedTask?.status === TaskStatusEnum.Todo && (
                        <SkinnyCircleIcon className="text-icon-secondary h-[13.3px] w-fit" />
                      )}
                      {editedTask?.status === TaskStatusEnum.Backlog && (
                        <Loading02Icon className="text-icon-tertiary h-[13.3px] w-fit" />
                      )}
                    </div>
                  }
                  isDropdown
                  dropdownContent={
                    <TaskStatusDropdown
                      onUpdateStatus={(newStatus: TaskStatusEnum) => {
                        // update the task edit data
                        setEditedTask((prevTask) => ({
                          ...prevTask!,
                          status: newStatus,
                        }));
                      }}
                    />
                  }
                />

                <TaskAndUpsellOptions
                  title="Send task to Breezeway"
                  value={
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={selectedTab.data?.sendToBreezeway}
                      className="h-[30px]"
                      onClick={handleSendTaskToBreezeway}
                    >
                      <div className="flex gap-2 items-center">
                        <BreezewayIcon className="size-fit" />
                        {selectedTab.data?.sendToBreezeway ? "Sent" : "Send"}
                      </div>
                    </Button>
                  }
                />
              </div>

              <div className="border-b border-primary"></div>

              {/* Edit Message */}
              <div className="px-6 flex flex-col gap-2">
                <div className="flex items-center justify-between py-2 h-[28px]">
                  <p className="text-subtitle-xs">Attach messages</p>
                  <div className="pr-2">
                    {/* TODO: (no design) add logic for adding a new message */}
                    <Button variant={"secondary"} size={"iconXs"}>
                      <PlusIcon />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                {editedTask?.messages?.map((message: MessageItem) => (
                  <div className="flex justify-between p-3 border border-secondary bg-primary rounded-md">
                    <div className="flex gap-2 w-full">
                      <Avatar
                        size={"small"}
                        image={conversationData.guest.imageUrl!}
                      />
                      <div className="flex flex-col gap-[2px]">
                        <div className="flex items-center gap-1">
                          <p className="text-subtitle-sm">
                            {conversationData.guest.name}
                          </p>
                          <p className="text-body-xs text-secondary">
                            {format(message.timestamp, "h:mm a")}
                          </p>
                        </div>
                        <p className="text-body-xs text-secondary break-all">
                          {message.text}
                        </p>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="iconXs"
                          className="size-4 min-w-4 min-h-4"
                        >
                          <HorizontalDotsIcon className="text-icon-tertiary w-[9px] min-w-[9px]" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="text-subtitle-xs"
                      >
                        <DropdownMenuItem
                          onSelect={() => {
                            handleDeleteTaskMessage(message.id.toString());
                          }}
                        >
                          Remove message
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>

              <div className="border-b border-primary"></div>

              <div className="flex gap-2 px-6">
                <Button
                  variant="destructive"
                  size="xs"
                  className="w-full"
                  onClick={handleDeleteTask}
                >
                  Delete
                </Button>
                <Button
                  variant="default"
                  size="xs"
                  className="w-full"
                  onClick={handleSaveTask}
                  disabled={selectedTab.data == editedTask}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};
