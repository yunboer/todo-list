import { create } from "zustand";
import { v4 as uuid } from "uuid";

// A TYPES
interface LongTermTask {
  id: string;
  title: string;
  completed: boolean;
}

interface MidTermTask {
  id: string;
  title: string;
  completed: boolean;
}

// B STORE
interface ITaskStore {
  longTermTasks: LongTermTask[];
  longToMidTermTasks: { [key: string]: MidTermTask[] };
}

const useTaskStore = create<ITaskStore>(() => ({
  longTermTasks: [],
  longToMidTermTasks: {},
}));

// C ACTIONS
// 插入新的长期任务
export const addNewLongTermTaskByTitle = (title: string) => {
  const new_id = uuid();
  const task: LongTermTask = {
    id: new_id,
    title,
    completed: false,
  };
  const newMidTermTasks: MidTermTask[] = [];
  useTaskStore.setState((state) => ({
    longTermTasks: [...state.longTermTasks, task],
    longToMidTermTasks: { ...state.longToMidTermTasks, [new_id]: newMidTermTasks },
  }));
};

export const deleteLongTermTaskById = (id: string) => {
  useTaskStore.setState((state) => ({
    longTermTasks: state.longTermTasks.filter((task) => task.id !== id),
    longToMidTermTasks: Object.fromEntries(
      Object.entries(state.longToMidTermTasks).filter(([key]) => key !== id)
    ),
  }));
};

export default useTaskStore;
