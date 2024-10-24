import { memo, useState } from "react";
import type { FC, ReactNode } from "react";
import useTaskStore, { addNewLongTermTaskByTitle, deleteLongTermTaskById } from "../../store/taskStore";
import "./A.scss";

interface IAProps {
  children?: ReactNode;
}

const A: FC<IAProps> = () => {
  const longTermTasks = useTaskStore((state) => state.longTermTasks);
  const [inputText, setInputText] = useState<string>("");
  const submitTask = () => {
    if (inputText === "") return;
    addNewLongTermTaskByTitle(inputText);
    setInputText("");
  };
  return (
    <div className="test-a">
      <h1>LongTermTask</h1>
      <div className="form">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submitTask()}
        />
        <button onClick={submitTask}>submit</button>
      </div>
      <div className="task-list">
        {longTermTasks.map((task) => (
          <div className="task-item" key={task.id}>
            {task.title}
            <button onClick={()=>deleteLongTermTaskById(task.id)}>del</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(A);
