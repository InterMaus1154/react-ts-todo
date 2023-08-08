
import {FC, useState, useEffect, useContext} from 'react';
import Button from '../../shared/Button';
import { TodoContext } from '../../../context/TodoContext';
import { TodoSelectorContext, DEFAULT_COUNTER_DELTA } from '../../../context/TodoSelectorContext';


const TodoVisibilityController : FC = ()=>{

    const {todoItems} = useContext(TodoContext);
    const {counter, setCounter} = useContext(TodoSelectorContext);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [maxPage, setMaxPage] = useState<number>(Math.ceil(todoItems.length / DEFAULT_COUNTER_DELTA));

    const setPreviousPage = () :void =>{
        if(counter === DEFAULT_COUNTER_DELTA){
            return;
        }
        setCounter(current =>{
            setCurrentPage((current - DEFAULT_COUNTER_DELTA) / DEFAULT_COUNTER_DELTA);
            return current - DEFAULT_COUNTER_DELTA;
        });
    };

    const setNextPage = () :void =>{

        if(currentPage === maxPage || currentPage >= maxPage || maxPage === 0){
            return;
        }

        setCounter(current =>{
            setCurrentPage((current + DEFAULT_COUNTER_DELTA) / DEFAULT_COUNTER_DELTA);
            return current + DEFAULT_COUNTER_DELTA;
        });
    };

    useEffect(()=>{
        setMaxPage(Math.ceil(todoItems.length / DEFAULT_COUNTER_DELTA));
    }, [todoItems]);

    return(
        <div className="Todo-visibility-controller">
            <Button text="Prev" onClick={()=>{setPreviousPage()}} />
            <span className="Page-counter">{currentPage} / {maxPage}</span>
            <Button text="Next" onClick={()=>{setNextPage()}} />
        </div>
    )
};

export default TodoVisibilityController;