import {FC, createContext, useState, useEffect, useContext} from 'react';
import User, { IUser } from '../util/User';
import { ITodo } from '../util/Todo';
import { DefaultSettings, ISettings } from '../context/SettingsContext';
import { SocketContext } from './SocketContext';

interface ILoginContext{
    userLoggedIn: boolean;
    setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    user: IUser;
    setUser: React.Dispatch<React.SetStateAction<IUser>>
    userItems : ITodo[];
    setUserItems: React.Dispatch<React.SetStateAction<ITodo[]>>;
    isAuthorized: boolean;
    setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginContext = createContext({userLoggedIn: false, setUserLoggedIn: ()=>{}, user: new User("", [], "", DefaultSettings,[]), setUser: ()=>{}, userItems: [], setUserItems: ()=>{}, isAuthorized: false, setIsAuthorized: ()=>{}} as ILoginContext);

interface ILoginProvider{
    children: React.ReactNode;
}

const LoginProvider : FC<ILoginProvider> = ({children}) =>{
    
    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<IUser>({} as IUser);
    const [userItems, setUserItems] = useState<ITodo[]>([]);
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

    const {socket} = useContext(SocketContext);

    useEffect(()=>{
        user.userTodoItems = userItems;
        if(user !== undefined){
            console.log(userItems);
            socket.emit("save_todo_items", {username: user.username, todoItems: user.userTodoItems});
        }
        
    }, [userItems]);

    useEffect(()=>{
        setIsAuthorized(userLoggedIn);
    }, [userLoggedIn]);

    return(
        <LoginContext.Provider value={{userLoggedIn, setUserLoggedIn, user, setUser, userItems, setUserItems, isAuthorized, setIsAuthorized}}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginProvider;