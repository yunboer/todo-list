import { memo } from "react";
import type { FC, ReactNode } from "react";
import ITask from "../types/ITask";
import { getShowDate } from "../utils/date";
import "./TaskItem.scss";

interface ITaskItemProps {
  children?: ReactNode;
  task: ITask;
  toggleTaskDoneById: (id: string) => void;
  deleteTaskById: (id: string) => void;
  showContent: (id: string) => void;
  isShowingContent: boolean;
}

const TaskItem: FC<ITaskItemProps> = ({
  task,
  toggleTaskDoneById,
  deleteTaskById,
  showContent,
  isShowingContent,
}) => {
  // console.log(isShowingContent)
  return (
    <div
      key={task.id}
      className={`task${isShowingContent ? " showing" : ""}`}
      onClick={() => showContent(task.id)}
    >
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => {
          toggleTaskDoneById(task.id);
        }}
      />
      {task.title}
      <span className="date">{getShowDate(task.date)}</span>
      <button onClick={() => deleteTaskById(task.id)}>删</button>
    </div>
  );
};

export default memo(TaskItem);
