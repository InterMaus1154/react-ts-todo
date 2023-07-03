import {FC} from 'react';
import LoginPage from './LoginPage';

const GatePanel :FC = () =>{
    return(
        <div className="Gate-panel">
            <h1>Welcome to Verina Todo App {new Date().getFullYear()}</h1>
            <h2>Current Version: 0.1.0 Stable</h2>
            <LoginPage />
        </div>
    )
}

export default GatePanel;