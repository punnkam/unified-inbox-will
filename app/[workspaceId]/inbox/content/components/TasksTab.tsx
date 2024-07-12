import React from "react";
import { TaskItem, TaskStatusEnum } from "@/lib/realDataSchema";
import { ReusableCard } from "./ReusableCard";

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
  return (
    <div className="flex flex-col gap-2">
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
