import {FC, useState, useEffect, useContext} from 'react';
import {LoginContext} from './LoginContext';
import { SocketContext } from './SocketContext';


import App from "../App";
import GatePanel from './GatePanel';
import "../style/components_style/Gate.css";

import {io, Socket} from "socket.io-client";

const StatusDependentPanel : FC = ()=>{
    
    const {userLoggedIn} = useContext(LoginContext);

    const {socket} = useContext(SocketContext);

    return(
        <>
        {
            userLoggedIn ? <div className="App-wrapper"><App/></div> : <div className="Gate-wrapper"><GatePanel/></div>
        }
        </>
    )
}

export default StatusDependentPanel;