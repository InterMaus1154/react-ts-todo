

import {useContext, useState, FC, useEffect} from 'react';
import { TodoContext } from '../../context/TodoContext';
import { ITodo } from '../../util/Todo';
import Button from '../shared/Button';

interface ITodoBox{
    todoItem : ITodo;
    idx: number;
}

const TodoBox : FC<ITodoBox> = ({todoItem, idx}) =>{
    const {todoItems, setTodoItems} = useContext(TodoContext);


    const [isCompleted, setIsCompleted] = useState<boolean>(todoItem.isCompleted);

    const deleteItem = () : void =>{
        setTodoItems((existing)=>{
            return existing.filter(current => current.id !== todoItem.id);
        });
    }

    const toggleComplete = () : void =>{
        if(todoItem.isCompleted) todoItem.isCompleted = false;
        else todoItem.isCompleted = true;


        setTodoItems(todoItems.map((item, index) => {
            if(index !== idx){
                return item;
            }
            return todoItem;
        }))
        
    }

    useEffect(()=>{
        setIsCompleted(todoItem.isCompleted);
    }, [todoItem.isCompleted]);

    return(
        <div className={"Todo-item-box"}>
            <h2 className="Todo-name"><span className={isCompleted ? "Crossed-item" : "Uncrossed-item"} style={{"--line-color": todoItem.importance.accentColor} as React.CSSProperties}>{todoItem.name}</span>
                <div className="Todo-importance" style={{backgroundColor: todoItem.importance.accentColor}}></div>
            </h2>
            
            {
                todoItem.description?.trim().length === 0 ? null  : <p className="Todo-description">{todoItem.description}</p>
            }
            <h3 className="Todo-category">{todoItem.category.label}</h3>
            <h3 className="Todo-date">Date: {todoItem.date.date}</h3>
            <h3 className="Todo-all-day">All day: {todoItem.date.allDay ? "Yes" : "No"} </h3>
            {
                todoItem.date.allDay === false ? <h3>Time: {todoItem.date.time}</h3> : null
            }
            
            <Button text="Delete" onClick={deleteItem}/>
            <Button text={isCompleted ? "Mark incompleted" : "Mark completed"} onClick={toggleComplete}/>
            
        </div> 
    );

};

export default TodoBox;