import {FC, useState, useEffect, useContext} from 'react';
import {LoginContext} from './LoginContext';

import App from "../App";
import GatePanel from './GatePanel';
import "../style/components_style/Gate.css";

const StatusDependentPanel : FC = ()=>{

    const {userLoggedIn} = useContext(LoginContext);

    return(
        <>
        {
            userLoggedIn ? <div className="App-wrapper"><App /></div> : <div className="Gate-wrapper"><GatePanel/></div>
        }
        </>
    )
}

export default StatusDependentPanel;