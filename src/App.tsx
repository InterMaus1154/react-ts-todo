import {FC, useState, useEffect, useContext} from 'react';
import { ThemeContext, ThemeTypes } from "./context/ThemeContext";
import Sidepanel from "./components/sidepanel/Sidepanel";
import Toppanel from "./components/toppanel/Toppanel";
import Mainpanel from "./components/mainpanel/Mainpanel";

import TodoProvider from "./context/TodoContext";
import SettingsProvider from "./context/SettingsContext";
import TodoSelectorProvider from "./context/TodoSelectorContext";
import CategoryContextProvider from "./context/CategoryContext";
import FilterProvider from "./context/FilterContext";
import { LoginContext } from './login/LoginContext';

import { useNavigate } from 'react-router-dom';

import { Socket } from 'socket.io-client';

const App : FC = () =>{

  const {isAuthorized} = useContext(LoginContext);

  const navigate = useNavigate();

  useEffect(()=>{
    if(!isAuthorized){
      alert("You are not authorized to access this page!");
      navigate("/");
    }
  }, []);

  const [theme, setTheme]  = useState<ThemeTypes>(window.localStorage.getItem("todo-tsx-preferred-theme") ? window.localStorage.getItem("todo-tsx-preferred-theme") as ThemeTypes : "light");

  //only small view
  const [isSidepanelVisible, setSidepanelVisible] = useState<boolean>(false);

  const toggleTheme = () : void =>{
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(()=>{
    window.localStorage.setItem("todo-tsx-preferred-theme", theme);
  }, [theme]);

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



  return (

    <SettingsProvider>
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
    </SettingsProvider>
  );
}

export default App;


/**
 * 
 * 
 * 
 */