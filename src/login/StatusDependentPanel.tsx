import {FC, useState, useEffect, useContext} from 'react';
import {LoginContext} from './LoginContext';
import { SocketContext } from './SocketContext';
import { Routes, Route } from 'react-router-dom';

import App from "../App";
import GatePanel from './GatePanel';
import "../style/components_style/Gate.css";


import {io, Socket} from "socket.io-client";
import RegisterPage from './RegisterPage';

const StatusDependentPanel : FC = ()=>{
    
    const {userLoggedIn} = useContext(LoginContext);

    const {socket} = useContext(SocketContext);

    return(
        <>
        {
            <Routes>
                <Route path="/" element={<div className="Gate-wrapper"><GatePanel/></div>} />
                <Route path="/register" element={<div className="Gate-wrapper"><RegisterPage /></div>} />
                <Route path="/app" element={<div className="App-wrapper"><App /></div>} />
            </Routes>
            
        }
        </>
    )
}

export default StatusDependentPanel;
