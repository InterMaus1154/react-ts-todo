
import { ThemeTypes } from "../context/ThemeContext";

const ENABLED : true = true;
const DISABLED : false = false;

export interface ISettings{
    version: string;
    itemAddedPopUp: boolean;
    itemDeletedPopUp: boolean;
    interfaceTheme: ThemeTypes;
}


//if default settings are modified, the version number must be changed in order to force recapture
export let DefaultSettings: ISettings = {
    version: "500",
    itemAddedPopUp: ENABLED,
    itemDeletedPopUp: ENABLED,
    interfaceTheme: "light"
};
