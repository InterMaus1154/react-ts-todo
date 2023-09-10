import {FC, useContext, useEffect} from 'react';

import { Routes, Route } from 'react-router-dom';

import App from "../App";
import { SocketContext } from './SocketContext';
import "../style/components_style/Gate.css";

import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';


const LoadingBox : FC = () =>{
    return(
        <div className="Loading-box">
            <h1>Connecting...</h1>
            <div className="Loading-spin"></div>
        </div>
    );
};

const StatusDependentPanel : FC = ()=>{

    const {isConnected} = useContext(SocketContext);

    return(
        <>
        {!isConnected ? <LoadingBox /> : 
        
            <Routes>
                <Route path="/" element={<div className="Gate-wrapper"><LoginPage/></div>} />
                <Route path="/register" element={<div className="Gate-wrapper"><RegisterPage /></div>} />
                <Route path="/app" element={<div className="App-wrapper"><App /></div>} />
            </Routes>
            
        }
        
        </>
    )
}

export default StatusDependentPanel;
