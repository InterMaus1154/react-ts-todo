import {FC, useState} from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const GatePanel :FC = () =>{

    const [isRegisterVisible, setIsRegisterVisible] = useState<boolean>(false);

    return(
        <div className="Gate-panel">
            <h1>Welcome to Verina Todo App {new Date().getFullYear()}</h1>
            <h2>Current Version: 0.1.0 Stable</h2>
            <LoginPage isRegisterVisible={isRegisterVisible} setIsRegisterVisible={setIsRegisterVisible}/>
            <RegisterPage isRegisterVisible={isRegisterVisible} setIsRegisterVisible={setIsRegisterVisible}/>
        </div>
    )
}

export default GatePanel;