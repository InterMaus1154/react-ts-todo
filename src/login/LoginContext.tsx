import {FC, createContext, useState, useEffect, useContext} from 'react';
import User, { IUser } from '../util/User';
import { ITodo } from '../util/Todo';
import { TodoContext } from '../context/TodoContext';

interface ILoginContext{
    userLoggedIn: boolean;
    setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    user: IUser;
    setUser: React.Dispatch<React.SetStateAction<IUser>>
    userItems : ITodo[];
    setUserItems: React.Dispatch<React.SetStateAction<ITodo[]>>;

}

export const LoginContext = createContext({userLoggedIn: false, setUserLoggedIn: ()=>{}, user: new User("", []), setUser: ()=>{}, userItems: [], setUserItems: ()=>{}} as ILoginContext);

interface ILoginProvider{
    children: React.ReactNode;
}

const LoginProvider : FC<ILoginProvider> = ({children}) =>{
    
    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<IUser>(new User("", []));
    const [userItems, setUserItems] = useState<ITodo[]>([]);

    const {setTodoItems} = useContext(TodoContext);

    return(
        <LoginContext.Provider value={{userLoggedIn, setUserLoggedIn, user, setUser, userItems, setUserItems}}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginProvider;