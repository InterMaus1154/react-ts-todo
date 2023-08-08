


import {FC, createContext, useState, useEffect} from 'react';

const ENABLED : true = true;
const DISABLED : false = false;

interface ISettings{
    version: string;
    itemAddedPopUp: boolean;
    itemDeletedPopUp: boolean;
    adminTools: boolean;
}


//if default settings are modified, the version number must be changed in order to force recapture
export let DefaultSettings: ISettings = {
    version: "101",
    itemAddedPopUp: ENABLED,
    itemDeletedPopUp: ENABLED,
    adminTools: ENABLED
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

    let defSets : Partial<ISettings> = {};
    if(window.localStorage.getItem("tsx-todo-settings")){
        if(JSON.parse(window.localStorage.getItem("tsx-todo-settings") as string).version !== DefaultSettings.version){
            defSets = DefaultSettings;
        }else{
            defSets = JSON.parse(window.localStorage.getItem("tsx-todo-settings") as string);
        }
    }

    const [settings, setSettings] = useState<ISettings>(defSets as ISettings);

    useEffect(()=>{
        window.localStorage.setItem("tsx-todo-settings", JSON.stringify(settings));
    }, [settings]);

    return(
        <SettingsContext.Provider value={{settings, setSettings}}>
            {children}
        </SettingsContext.Provider>
    );
};

export default SettingsProvider;
