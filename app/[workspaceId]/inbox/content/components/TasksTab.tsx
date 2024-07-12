import React from "react";
import { TaskItem, TaskStatusEnum } from "@/lib/realDataSchema";
import { ReusableCard } from "./ReusableCard";
import { PlusIcon } from "@/components/icons/CustomIcons";
import { useOpsRightSidebar } from "../../OpsRightSidebarContext";

export const TasksTab = ({
  tasks,
  updateTaskData,
}: {
  tasks: TaskItem[];
  updateTaskData: (
    taskId: string,
    key: keyof TaskItem,
    value: TaskItem[keyof TaskItem]
  ) => void;
}) => {
  const { setSelectedTab } = useOpsRightSidebar();

  return (
    <div className="flex flex-col gap-2">
      <div
        className="flex items-center gap-[7px] px-4 py-6 border border-dashed border-secondary-disabled rounded-md hover:bg-hover active:bg-pressed cursor-pointer"
        onClick={() => {
          setSelectedTab({ type: "task", data: null });
        }}
      >
        <PlusIcon className="text-icon-tertiary size-[10.67px]" />
        <p className="text-subtitle-xs text-secondary">Create new task</p>
      </div>
      {tasks.length > 0 &&
        tasks.map((task) => (
          <ReusableCard
            key={task.id}
            title={task.name}
            description={task.type}
            type="task"
            taskData={task}
            onUpdateTaskStatus={(newStatus: TaskStatusEnum) =>
              updateTaskData(task.id, "status", newStatus)
            }
          />
        ))}
    </div>
  );
};
