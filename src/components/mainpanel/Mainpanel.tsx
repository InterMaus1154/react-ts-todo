import { FC, useContext, useEffect, useState } from "react";
import "../../style/components_style/Mainpanel.css";
import TodoBox from "./TodoBox";
import { TodoContext } from "../../context/TodoContext";
import { TodoSelectorContext, DEFAULT_COUNTER_DELTA } from "../../context/TodoSelectorContext";
import { FilterContext } from "../../context/FilterContext";
import { ITodo } from "../../util/Todo";

const Mainpanel : FC<{isMobile: boolean}> = ({isMobile}) =>{

    const {todoItems} = useContext(TodoContext);
    const {counter} = useContext(TodoSelectorContext);
    const {filter, setFilter} = useContext(FilterContext);

    const [filteredItems, setFilteredItems] = useState<ITodo[]>(todoItems.filter(element => filter.itemName.trim().length > 0 ? element.name.toLowerCase().includes(filter.itemName.toLowerCase()) : element));

    useEffect(()=>{
        setFilteredItems(previous => {
            previous = todoItems.filter(element => filter.itemName.trim().length > 0 ? element.name.toLowerCase().includes(filter.itemName.toLowerCase()) : element);
            setFilter({...filter, numberOfResults: previous.length});
            return previous;
        });
    },[filter.itemName, todoItems]);

    return(
        <div className="Mainpanel">
                {
                    todoItems.length > 0 ?
                    <>
                        {
                            !isMobile?
                            <>
                                {filteredItems.slice(counter-DEFAULT_COUNTER_DELTA,counter).map((item, idx) =>{
                                return(
                                    <TodoBox key={item.id} idx={idx} todoItem={item}/>
                                )
                                })}
                            </> :
                            <>
                                {
                                    filteredItems.map((item, idx) =>{
                                        return <TodoBox key={item.id} idx={idx} todoItem={item}/>
                                    })
                                }
                            </>
                        }
                    </> : 
                    <>
                        <h1 className="No-todo-heading">You got nothing to do here!</h1>
                    </>
                }
        </div>
    )
}

export default Mainpanel;

/***
 * todoItems.length > 0 ?
                        
                        filteredItems.slice(counter-DEFAULT_COUNTER_DELTA,counter).map((item, idx) =>{
                            return(
                                <TodoBox key={item.id} idx={idx} todoItem={item}/>
                            )
                        }) : (
                            <h1 className="No-todo-heading">You got nothing to do here!</h1>
                        )
 * 
 * 
 */