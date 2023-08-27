import {FC} from 'react';

import { Routes, Route } from 'react-router-dom';

import App from "../App";
import "../style/components_style/Gate.css";



import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';

const StatusDependentPanel : FC = ()=>{


    return(
        <>
        {
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
