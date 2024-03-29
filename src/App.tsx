import {FC, useState, useEffect, useContext, useRef} from 'react';
import { ThemeContext, ThemeTypes } from "./context/ThemeContext";
import Sidepanel from "./components/sidepanel/Sidepanel";
import Toppanel from "./components/toppanel/Toppanel";
import Mainpanel from "./components/mainpanel/Mainpanel";

import TodoProvider from "./context/TodoContext";
import TodoSelectorProvider from "./context/TodoSelectorContext";
import CategoryContextProvider from "./context/CategoryContext";
import FilterProvider from "./context/FilterContext";
import { LoginContext } from './login/LoginContext';
import { GUEST_USER } from './util/User';
import { SettingsContext } from './context/SettingsContext';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from './login/SocketContext';



const App : FC = () =>{

  const {user,isAuthorized} = useContext(LoginContext);
  const {socket} = useContext(SocketContext);
  const {settings, setSettings} = useContext(SettingsContext);

  const navigate = useNavigate();

  useEffect(()=>{
    if(!isAuthorized){
      alert("You are not authorized to access this page!");
      navigate("/");
      
      return;
    }
  }, []);

  


  const [theme, setTheme]  = useState<ThemeTypes>(user.userSettings ? user.userSettings.interfaceTheme : "light");

  //only small view
  const [isSidepanelVisible, setSidepanelVisible] = useState<boolean>(false);

  const toggleTheme = () : void =>{
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(()=>{
    setSettings({...settings, interfaceTheme: theme});
  }, [theme]);


  useEffect(()=>{
    user.userSettings = settings;
    if(user !== undefined && user !== null && user.username !== undefined && user.username !== GUEST_USER.username){
      socket.emit("user_settings_modified", {username: user.username, userSettings: user.userSettings})
    }

  }, [settings]);

  const [width, setWidth] = useState<number>(window.innerWidth);

  const handleWindowSizeChange = () : void =>{
    setWidth(window.innerWidth);
  };

  useEffect(()=>{
    window.addEventListener("resize", handleWindowSizeChange);
    return () =>{
      window.removeEventListener("resize", handleWindowSizeChange);
    }
  }, []);
  

  const [isMobile, setIsMobile] = useState<boolean>(width < 1000);

  useEffect(()=>{
    setIsMobile(width < 1000);
  }, [width]);

  
  if(!isAuthorized){
    return <></>;
  }

  return (
      <TodoProvider>
        <FilterProvider>
        <CategoryContextProvider>
        <TodoSelectorProvider>
        <ThemeContext.Provider value={{theme, toggleTheme}}>
          <main className="App" id={theme}>
            <Sidepanel isVisible={isSidepanelVisible} setVisible={setSidepanelVisible}/>
            <Toppanel isSidePanelVisible={isSidepanelVisible} setSidePanelVisible={setSidepanelVisible}/>
            <Mainpanel isMobile={isMobile}/>
          </main>
        </ThemeContext.Provider>
        </TodoSelectorProvider>
        </CategoryContextProvider>
        </FilterProvider>
      </TodoProvider>
  );
}

export default App;


/**
 * 
 * 
 * 
 */