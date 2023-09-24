


import {FC, createContext, useState, useEffect, useContext} from 'react';
import { LoginContext } from '../login/LoginContext';
import { GUEST_USER } from '../util/User';
import { SocketContext } from '../login/SocketContext';

import { ISettings } from '../util/Settings';





interface ISettingsContext{
    settings: ISettings;
    setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
}

export const SettingsContext = createContext({settings: {} as ISettings, setSettings:  () =>{} } as ISettingsContext);

interface ISettingsProvider{
    children: React.ReactNode;
}

const SettingsProvider : FC<ISettingsProvider> = ({children}) =>{

    //const {socket} = useContext(SocketContext);
    const {user} = useContext(LoginContext);

    const [settings, setSettings] = useState<ISettings>(user.userSettings);

    useEffect(()=>{
        if(user !== undefined){
            setSettings(user.userSettings);
        }
        console.log(settings);
    }, [user]);

    return(
        <SettingsContext.Provider value={{settings, setSettings}}>
            {children}
        </SettingsContext.Provider>
    );
};

export default SettingsProvider;
