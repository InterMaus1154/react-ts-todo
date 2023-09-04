


import {FC, createContext, useState, useEffect, useContext} from 'react';
import { LoginContext } from '../login/LoginContext';
import { GUEST_USER } from '../util/User';
import { ThemeTypes } from './ThemeContext';
import { SocketContext } from '../login/SocketContext';

const ENABLED : true = true;
const DISABLED : false = false;

export interface ISettings{
    version: string;
    itemAddedPopUp: boolean;
    itemDeletedPopUp: boolean;
    adminTools: boolean;
    interfaceTheme: ThemeTypes;
}


//if default settings are modified, the version number must be changed in order to force recapture
export let DefaultSettings: ISettings = {
    version: "500",
    itemAddedPopUp: ENABLED,
    itemDeletedPopUp: ENABLED,
    adminTools: DISABLED,
    interfaceTheme: "light"
};


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

    let defSets : Partial<ISettings> = {};
    if(window.localStorage.getItem("tsx-todo-settings")){
        if(JSON.parse(window.localStorage.getItem("tsx-todo-settings") as string).version !== DefaultSettings.version){
            defSets = DefaultSettings;
        }else{
            defSets = JSON.parse(window.localStorage.getItem("tsx-todo-settings") as string);
        }
    }

    const [settings, setSettings] = useState<ISettings>(user.userSettings);

    useEffect(()=>{
        if(user !== undefined){
            setSettings(user.userSettings);
        }
    }, [user]);

    return(
        <SettingsContext.Provider value={{settings, setSettings}}>
            {children}
        </SettingsContext.Provider>
    );
};

export default SettingsProvider;
