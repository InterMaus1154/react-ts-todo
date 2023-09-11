
import {FC, createContext, useState, useEffect, useContext} from 'react';
import { ICategory, DEFAULT_CATEGORIES } from '../util/Category';
import { LoginContext } from '../login/LoginContext';
import { SocketContext } from '../login/SocketContext';

interface ICategoryContext{
    categories: ICategory[],
    setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
}

export const CategoryContext = createContext<ICategoryContext>({categories: [], setCategories: ()=>{}} as ICategoryContext);


interface ICategoryProvider{
    children: React.ReactNode
}

const CategoryContextProvider : FC<ICategoryProvider> = ({children}) =>{

    const {user} = useContext(LoginContext);
    const {socket} = useContext(SocketContext);
    
    const [categories, setCategories] = useState<ICategory[]>(user.userCategories ? user.userCategories : DEFAULT_CATEGORIES);
    
    useEffect(()=>{
        socket.emit("update_user_categories", {userCategories: categories, username: user.username});
        user.userCategories = categories;
    }, [categories]);

    useEffect(()=>{
        setCategories(user.userCategories);
    }, [user]);

    return(
        <CategoryContext.Provider value={{categories, setCategories}}>
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryContextProvider;