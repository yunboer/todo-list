import { v4 as uuidv4 } from "uuid";
// 学习点 1
//  数组存储是为了保持顺序
//  对象存储是为了快速索引


class Task {
  private id: string; // 任务id
  private title: string; // 任务标题
  private done: boolean; // 任务是否完成
  private content: string; // 任务内容
  private date: number; // 任务创建时间
  private deadline: number; // 任务截止时间
  private duration: number; // 任务持续时间
  constructor(title: string = "Untitled Task", duration: number = 86400000) {
    this.id = uuidv4();
    this.title = title;
    this.done = false;
    this.content = "";
    this.date = Date.now();
    this.duration = duration;
    this.deadline = this.date + duration;
  }
  getId() {
    return this.id;
  }
  getTitle() {
    return this.title;
  }
  setTitle(title: string) {
    this.title = title;
  }
  getDone() {
    return this.done;
  }
  setDone() {
    this.done = !this.done;
  }
  getContent() {
    return this.content;
  }
  setContent(content: string) {
    this.content = content;
  }
  getDate() {
    return this.date;
  }
  getDeadline() {
    return this.deadline;
  }
  setDeadline(date: number) {
    this.deadline = date;
    this.duration = date - this.date;
  }
  getDuration() {
    return this.duration;
  }
  setDuration(duration: number) {
    this.duration = duration;
    this.deadline = this.date + duration;
  }
}

class LongTermTask extends Task {
  private subtasks: ITask[] = [];
  constructor(title: string = "Untitled Task", duration: number = 86400000) {
    super(title, duration);
  }
  getSubtasks() {
    return this.subtasks;
  }
  addSubtask(task: ITask) {
    this.subtasks.push(task);
  }
  removeSubtask(task: ITask) {
    this.subtasks = this.subtasks.filter((t) => t.getId() !== task.getId());
  }
  removeAllSubtasks() {
    this.subtasks = [];
  }
  removeSubtaskById(id: string) {
    this.subtasks = this.subtasks.filter((t) => t.getId() !== id);
  }
  addSubTaskByTitle(title: string, duration: number = 86400000) {
    const task = new ITask(title, duration);
    this.addSubtask(task);
  }
  toString(){
    return `Title: ${this.getTitle()}
Content: ${this.getContent()}
Date: ${this.getDate()}
Deadline: ${this.getDeadline()}
Duration: ${this.getDuration()}
Subtasks: ${this.getSubtasks().map((t) => t.getTitle()).join(", ")}`;
  }
}

class ITask extends Task {
  private DoneTask: TinyTask; 
  private subtasks: TinyTask[] = [];
  constructor(title: string = "Untitled Task", duration: number = 86400000) {
    super(title, duration);
    this.DoneTask = new TinyTask(this, "done", -1);  // 为了方便处理，添加一个虚拟节点作为DAG的完成节点。
  }
  getDoneTask() {
    return this.DoneTask;
  }
  addSubtask(task: TinyTask) {
    this.subtasks.push(task);
  }
  removeSubtask(task: TinyTask) {
    this.subtasks = this.subtasks.filter((t) => t.getId() !== task.getId());
  }
}

class TinyTask extends Task{
  private parents: TinyTask[] = [];  // 父亲的个数代表依赖数
  private children: TinyTask[] = [];
  private fatherTask: ITask;
  constructor(fatherTask:ITask, title: string = "Untitled Task", duration: number = 86400000) {
    super(title, duration);
    this.fatherTask = fatherTask;
    this.fatherTask.addSubtask(this);
  }
  getParents() {
    return this.parents;
  }
  getChildren() {
    return this.children;
  }
  addParent(parent: TinyTask) {
    this.parents.push(parent);
    parent.addChild(this);
  }
  removeParent(parent: TinyTask) {
    this.parents = this.parents.filter((p) => p !== parent);
    parent.removeChild(this);
  }
  removeParentById(id: string) {
    this.parents = this.parents.filter((p) => {
      if (p.getId() === id) {
        p.removeChild(this);
        return false;
      }
      else return true;
    });
    
  }
  addChild(child: TinyTask) {
    this.children.push(child);
    child.addParent(this);
  }
  removeChild(child: TinyTask) {
    this.children = this.children.filter((c) => c !== child);
    child.removeParent(this);
  }
  removeChildById(id: string) {
    this.children = this.children.filter((c) => {
      if (c.getId() === id) {
        c.removeParent(this);
        return false;
      }
      else return true;
    });
  }
  isRoot(){
    return this.parents.length === 0;
  }
}


function main(){
  // const task1 = new LongTermTask("学英语");
  // task1.addSubTaskByTitle("背单词");
  // task1.addSubTaskByTitle("看电影");
  // task1.addSubTaskByTitle("写作文");
  // console.log(task1.toString());
  const task1 = new ITask("task1", 1000);
}
main();