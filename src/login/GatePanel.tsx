import {FC, useState} from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';


const GatePanel :FC = () =>{


    return(
        <div className="Gate-panel">
            <h1>Welcome to Verina Todo App {new Date().getFullYear()}</h1>
            <h2 style={{fontStyle: "italic", fontWeight: "normal"}}>Current Version: 0.2 Stable</h2>
            <LoginPage />
        </div>
    )
}

export default GatePanel;