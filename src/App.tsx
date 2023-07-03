

import {FC, useState, useEffect} from 'react';


import { ThemeContext, ThemeTypes } from "./context/ThemeContext";
import Sidepanel from "./components/sidepanel/Sidepanel";
import Toppanel from "./components/toppanel/Toppanel";
import Mainpanel from "./components/mainpanel/Mainpanel";

import TodoProvider from "./context/TodoContext";
import SettingsProvider from "./context/SettingsContext";
import TodoSelectorProvider from "./context/TodoSelectorContext";
import CategoryContextProvider from "./context/CategoryContext";
import FilterProvider from "./context/FilterContext";


const App : FC = () =>{

  const [theme, setTheme]  = useState<ThemeTypes>(window.localStorage.getItem("todo-tsx-preferred-theme") ? window.localStorage.getItem("todo-tsx-preferred-theme") as ThemeTypes : "light");

  //only small view
  const [isSidepanelVisible, setSidepanelVisible] = useState<boolean>(false);

  const toggleTheme = () : void =>{
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(()=>{
    window.localStorage.setItem("todo-tsx-preferred-theme", theme);
  }, [theme]);


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
            <Mainpanel />
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