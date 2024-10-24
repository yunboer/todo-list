import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import type { FC, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TodoListPage.scss";
import { getITaskList, getYMD, isLast7Days, isToday, isTomorow, setITaskList } from "../utils/";
import ITask from "../types/ITask";
import TaskItem from "../components/element/TaskItem";
import FlexThree from "../components/layout/FlexThree";
import MdEditor from "../components/element/MdEditor";

interface ITodoListPageProps {
  children?: ReactNode;
}

const filterMap = {
  today: "今天",
  tomorrow: "明天",
  last7days: "最近7天",
  all: "全部",
  今天: "today",
  明天: "tomorrow",
  最近7天: "last7days",
  全部: "all",
};

const TodoListPage: FC<ITodoListPageProps> = () => {
  ///// A 列表的增删
  // 1 任务列表（TaskList）
  const [taskList, setTaskList] = React.useState<ITask[]>(getITaskList());
  useEffect(() => {
    return () => {
      setITaskList(taskList);
    }
  }, [taskList]);
  // 2 新任务（input）
  const [newTaskTitle, setNewTaskTitle] = React.useState<string>("");
  // 3 任务的增加
  const addTask = useCallback(() => {
    if (newTaskTitle.trim()) {
      const newTask = new ITask(newTaskTitle, false, "", uuidv4(), getYMD());
      setTaskList((tmp) => [newTask, ...tmp]);
      setShowingId(newTask.id);
      setNewTaskTitle("");
    }
  }, [newTaskTitle]);
  // 4 任务的删除
  const deleteTaskById = useCallback((id: string) => {
    setTaskList((tmp) => tmp.filter((task) => task.id !== id));
  }, []);
  // 5 任务的完成/取消完成
  const toggleTaskDoneById = useCallback((id: string) => {
    setTaskList((tmp) =>
      tmp.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            done: !task.done,
          };
        } else {
          return task;
        }
      })
    );
  }, []);

  ///// B content展示
  const [showingId, setShowingId] = React.useState<string>("");
  const showingContent = useMemo(() => {
    const task = taskList.find((task) => task.id === showingId);
    console.log(task?.content);
    return task ? task.content : "";
  }, [showingId, taskList]);
  const showingTitle = useMemo(() => {
    const task = taskList.find((task) => task.id === showingId);
    return task ? task.title : "";
  }, [showingId, taskList]);
  const showContent = (id: string) => {
    setShowingId(id);
  };
  const updateContentById = useCallback(
    (content: string, id: string) => {
      setTaskList((tmp) =>
        tmp.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              content: content,
            };
          } else {
            return task;
          }
        })
      );
      console.log(id);
    },
    [setTaskList]
  );

  ///// C 过滤
  const [filterMode, setFilterMode] = useState<
    "today" | "tomorrow" | "last7days" | "all"
  >("all");
  const filterByDate = (
    taskList: ITask[],
    mode: "today" | "tomorrow" | "last7days" | "all"
  ) => {
    if (mode == "today") {
      return taskList.filter((task) => {
        return isToday(task.date);
      });
    } else if (mode == "tomorrow") {
      return taskList.filter((task) => {
        return isTomorow(task.date);
      });
    } else if (mode == "last7days") {
      return taskList.filter((task) => {
        return isLast7Days(task.date);
      });
    } else {
      return taskList;
    }
  };
  const filtedList = useMemo(
    () => filterByDate(taskList, filterMode),
    [taskList, filterMode]
  );

  return (
    <div className="todo-list-page">
      <FlexThree
        aCompent={
          <div className="task-filter">
            <div
              className="task-filter-item"
              onClick={() => setFilterMode("all")}
            >
              <div className="icon">
                <div className="icon-calendar-clock"></div>
              </div>
              全部
            </div>
            <div
              className="task-filter-item"
              onClick={() => setFilterMode("today")}
            >
              <div className="icon">
                <div className="icon-calendar-clock"></div>
              </div>
              今天
            </div>
            <div
              className="task-filter-item"
              onClick={() => setFilterMode("tomorrow")}
            >
              <div className="icon">
                <div className="icon-calendar-clock"></div>
              </div>
              明天
            </div>
            <div
              className="task-filter-item"
              onClick={() => setFilterMode("last7days")}
            >
              <div className="icon">
                <div className="icon-calendar-clock"></div>
              </div>
              最近7天
            </div>
          </div>
        }
        bCompent={
          <div className="task-nav">
            <div className="header">
              <h1>{filterMap[filterMode]}</h1>
            </div>
            <div className="input">
              <input
                placeholder="+添加新的任务到任务列表"
                type="text"
                value={newTaskTitle}
                onChange={(e) => {
                  setNewTaskTitle(e.target.value);
                }}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    addTask();
                  }
                }}
              />
              <button onClick={addTask}>&#x21B5;</button>
            </div>
            <div className="task-list">
              {filtedList.map((task) => {
                return (
                  <TaskItem
                    task={task}
                    toggleTaskDoneById={toggleTaskDoneById}
                    deleteTaskById={deleteTaskById}
                    showContent={showContent}
                    isShowingContent={task.id === showingId}
                  />
                );
              })}
            </div>
          </div>
        }
        cCompent={
          <div className="task-main">
            {showingId && (
              <>
                <div className="showing-title">{showingTitle}</div>
                <MdEditor
                  key={showingId}
                  initText={showingContent}
                  showingId={showingId}
                  updateMarkdown={updateContentById}
                />
              </>
            )}
          </div>
        }
      />
    </div>
  );
};

export default memo(TodoListPage);
