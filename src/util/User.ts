
import { ITodo } from "./Todo";

export interface IUser{
    username: string;
    userTodoItems: ITodo[];
    setUserTodoItems(todoItems: ITodo[]): void;
}


export default class User implements IUser{
    username: string;
    userTodoItems: ITodo[];
    constructor(username: string, userTodoItems: ITodo[]) {
        this.username = username;
        this.userTodoItems = userTodoItems;
    }

    setUserTodoItems(items: ITodo[]): void {
        this.userTodoItems = items;
    }

}

export const GUEST_USER = new User("Guest", window.localStorage.getItem("tsx-todo-items") ? JSON.parse(window.localStorage.getItem("tsx-todo-items") as string) : []);