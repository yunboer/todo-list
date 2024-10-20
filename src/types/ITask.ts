export default class ITask {
  constructor(
    public title: string,
    public done: boolean,
    public content: string,
    public id: string,
    public date: string // "yyyy-mm-dd"
  ) {}
}
