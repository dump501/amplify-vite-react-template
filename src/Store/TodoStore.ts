import { action, makeAutoObservable, observable } from "mobx";

class TodoStore {
  todos: Array<string> = ["Task 1", "Task 1", "Task 1", "Task 1"];
  constructor() {
    makeAutoObservable(this, {
      todos: observable,
      addTodo: action,
    });
  }

  addTodo(content: string) {
    this.todos.push(content);
  }
}

export default new TodoStore();
