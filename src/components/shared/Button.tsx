import {FC, MouseEventHandler, FormEventHandler} from 'react';
import "../../style/App.css";
interface ButtonProps{
    text: string;
    classes?: string;
    id?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button : FC<ButtonProps> = (props : ButtonProps) => {
    return(
        <button id="" className={`Button ${props.classes}`} onClick={props.onClick} >{props.text}</button>
    )
}

export default Button;