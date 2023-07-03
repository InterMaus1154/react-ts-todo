import { FC, useContext, useState, useEffect, useRef } from "react";

import "../../style/components_style/Toppanel.css";
import ReactSwitch from "react-switch";

import { ThemeContext } from "../../context/ThemeContext";
import { TodoContext } from "../../context/TodoContext";
import Button from "../shared/Button";
import Modal from "../shared/modals/Modal";
import { AllTodoRemovedModal, FilterModal } from "../shared/modals/ModalTypes";
import TodoVisibilityController from "./components/TodoVisibilityController";
import { LoginContext } from "../../login/LoginContext";


interface IToppanel{
    isSidePanelVisible: boolean;
    setSidePanelVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Toppanel : FC<IToppanel> = ({isSidePanelVisible, setSidePanelVisible}) =>{

    const {theme, toggleTheme} = useContext(ThemeContext);
    const {setTodoItems} = useContext(TodoContext);
    const [allRemovedModalVisible, setAllRemovedModalVisible] = useState<boolean>(false);
    const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);
    const allRemovedModalRef = useRef<HTMLDivElement>(document.createElement("div"));
    const filterModalRef = useRef<HTMLDivElement>(document.createElement("div"));

    const {userLoggedIn, setUserLoggedIn} = useContext(LoginContext);

    const onDeleteItems = () : void =>{
        setTodoItems([]);
        setAllRemovedModalVisible(true);
    };

    useEffect(()=>{

        const handleClick = (e: any) : void =>{
            if(allRemovedModalVisible && allRemovedModalRef.current != null && !allRemovedModalRef.current.contains(e.target)){
                setAllRemovedModalVisible(false);
            }

            if(filterModalVisible && filterModalRef.current != null && !filterModalRef.current.contains(e.target)){
                setFilterModalVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClick);

        return ()=>{
            document.removeEventListener("mousedown", handleClick);
        }

    }, [allRemovedModalVisible, filterModalVisible]);

    const toggleSidepanel = () : void =>{
        setSidePanelVisible(!isSidePanelVisible);
    }

    const openFilter = () : void =>{
        setFilterModalVisible(true);
    }

    const handleLogOut = () : void =>{
        setUserLoggedIn(false);
    }

    return(
        <div className="Toppanel">
            <Button classes={"Sidemenu-button"} text="Sidemenu" onClick={toggleSidepanel}/>
            <div className="ThemeSwitch">
                <label>Toggle theme:
                    <ReactSwitch checked={theme === "dark"} onChange={toggleTheme}/>
                </label>
            </div>
            
            <Button text={"Clear all todo"} onClick={onDeleteItems}></Button>
            <Button text={"Save to server"} onClick={()=>alert("Not available...")}></Button>
            <TodoVisibilityController/>
            <Button text={"Filter"} classes="Filter-button" onClick={openFilter}></Button>
            <Button text={"Log out"} onClick={handleLogOut}/>
            <Modal title="All item has been removed!" visible={allRemovedModalVisible} setVisible={setAllRemovedModalVisible} modalContent={<AllTodoRemovedModal/>} innerRef={allRemovedModalRef}/>
            <Modal title="" visible={filterModalVisible} setVisible={setFilterModalVisible} modalContent={<FilterModal />} innerRef={filterModalRef}/>
        </div>
    )

}

export default Toppanel;