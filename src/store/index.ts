import { create } from "zustand";
import ITask from "../types/ITask";


const useStore = create((set)=>({
    taskList : [new ITask("task1",true,"content1","first","2021-10-01")],
    
}))
export default useStore;