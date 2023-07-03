import {FC, MouseEventHandler, FormEventHandler} from 'react';

interface ButtonProps{
    text: string;
    classes?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button : FC<ButtonProps> = (props : ButtonProps) => {
    return(
        <button className={`Button ${props.classes}`} onClick={props.onClick} >{props.text}</button>
    )
}

export default Button;