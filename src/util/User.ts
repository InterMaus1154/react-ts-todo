
import { ITodo } from "./Todo";
import {ISettings} from "../context/SettingsContext";
import {ThemeTypes} from "../context/ThemeContext";

export interface IUser{
    username: string;
    userTodoItems: ITodo[];
    userSettings?: ISettings;
    userPreferredTheme?: ThemeTypes;
   // setUserTodoItems(todoItems: ITodo[]): void;
}


export default class User implements IUser{
    username: string;
    userTodoItems: ITodo[];
    constructor(username: string, userTodoItems: ITodo[]) {
        this.username = username;
        this.userTodoItems = userTodoItems;
    }

    /*setUserTodoItems(items: ITodo[]): void {
        this.userTodoItems = items;
    }*/
}

export const GUEST_USER = new User("Guest", JSON.parse(window.localStorage.getItem("tsx-todo-items") as string) === null ? [] : JSON.parse(window.localStorage.getItem("tsx-todo-items") as string));


//JSON.parse(window.localStorage.getItem("tsx-todo-items") as string) === null ? [] : JSON.parse(window.localStorage.getItem("tsx-todo-items") as string)