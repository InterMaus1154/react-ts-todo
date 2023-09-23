

import React, {createContext, useState, FC, useEffect, useContext} from 'react';

import { ITodo } from '../util/Todo';
import { LoginContext } from '../login/LoginContext';
import { GUEST_USER } from '../util/User';

interface ITodoContext{
    todoItems: ITodo[];
    setTodoItems: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

export const TodoContext = createContext({todoItems: [], setTodoItems: ()=>{}} as ITodoContext);


interface ITodoProvider{
    children: React.ReactNode;
}

const TodoProvider : FC<ITodoProvider> = ({children}) =>{

    const {setUserItems,user} = useContext(LoginContext);

    const [todoItems, setTodoItems] = useState<ITodo[]>(user.userTodoItems);

    useEffect(()=>{
        setUserItems(todoItems);
    }, [todoItems]);

    return(
        <TodoContext.Provider value={{todoItems, setTodoItems}}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoProvider;