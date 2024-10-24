import type ITask from '../types/ITask';

const TASKLIST = 'taskList';

function getITaskList(): ITask[] {
    const taskListJSON = localStorage.getItem(TASKLIST);
    return taskListJSON ? JSON.parse(taskListJSON) : [
        {
            title: "task1",
            done: true,
            content: "content1",
            id: "first",
            date: "2021-10-01",
        },
        {
            title: "task2",
            done: false,
            content: "content2",
            id: "second",
            date: "2021-10-02",
        },
    ];
}

function setITaskList(taskList: ITask[]): void {
    localStorage.setItem(TASKLIST, JSON.stringify(taskList));
}

export { getITaskList, setITaskList };
