
import {FC, useEffect, useContext} from 'react';
import { SettingsContext } from '../../../context/SettingsContext';
import { ThemeContext } from '../../../context/ThemeContext';

const SettingsComponent : FC = () =>{
    
    const {settings, setSettings} = useContext(SettingsContext);
    const {toggleTheme} = useContext(ThemeContext);

    useEffect(()=>{ 
        console.log(settings);
    }, [settings]);

    return(
        <>
            <label>Item added pop-up: 
                <input type="checkbox" checked={settings.itemAddedPopUp} onChange={()=>{
                    setSettings({...settings, itemAddedPopUp: !settings.itemAddedPopUp});
                }}/>
            </label>
            <label>Item deleted pop-up:
                <input type="checkbox" checked={settings.itemDeletedPopUp} onChange={()=>{
                    setSettings({...settings, itemDeletedPopUp: !settings.itemDeletedPopUp});
                }} />
            </label>
            <label>Dark mode:
                <input type="checkbox" checked={settings.interfaceTheme === 'dark'} onChange={()=>{
                    setSettings({...settings, interfaceTheme: settings.interfaceTheme === 'light' ? 'dark' : 'light'});
                    toggleTheme();
                }} />
            </label>
        </>
    );
};

export default SettingsComponent;