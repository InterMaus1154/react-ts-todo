
import { ITodo } from "./Todo";
import {ISettings, DefaultSettings} from "../context/SettingsContext";
import {ThemeTypes} from "../context/ThemeContext";
import { ICategory, DEFAULT_CATEGORIES } from "./Category";

export interface IUser{
    username: string;
    userTodoItems: ITodo[];
    userSettings: ISettings;
    userDisplayName: string;
    userCategories: ICategory[];
}


export default class User implements IUser{
    username: string;
    userTodoItems: ITodo[];
    userDisplayName: string;
    userSettings: ISettings;
    userCategories: ICategory[];
    constructor(username: string, userTodoItems: ITodo[], userDisplayName: string, userSettings: ISettings, userCategories: ICategory[]) {
        this.username = username;
        this.userTodoItems = userTodoItems;
        this.userDisplayName = userDisplayName;
        this.userSettings = userSettings;
        this.userCategories = userCategories;
    }

    /*setUserTodoItems(items: ITodo[]): void {
        this.userTodoItems = items;
    }*/
}

export const GUEST_USER = new User("Guest", [], "Guest", DefaultSettings, DEFAULT_CATEGORIES);


//JSON.parse(window.localStorage.getItem("tsx-todo-items") as string) === null ? [] : JSON.parse(window.localStorage.getItem("tsx-todo-items") as string)