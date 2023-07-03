import {FC, createContext, useState} from 'react';

interface ILoginContext{
    userLoggedIn: boolean;
    setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;

}

export const LoginContext = createContext({userLoggedIn: false, setUserLoggedIn: ()=>{}} as ILoginContext);

interface ILoginProvider{
    children: React.ReactNode;
}

const LoginProvider : FC<ILoginProvider> = ({children}) =>{
    
    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
    
    return(
        <LoginContext.Provider value={{userLoggedIn, setUserLoggedIn}}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginProvider;