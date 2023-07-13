import {FC, useContext} from 'react';
import Button from '../components/shared/Button';
import { LoginContext } from './LoginContext';



const LoginPage : FC<{isRegisterVisible : boolean, setIsRegisterVisible : React.Dispatch<React.SetStateAction<boolean>>}> = ({isRegisterVisible, setIsRegisterVisible}) =>{

    const {userLoggedIn, setUserLoggedIn} = useContext(LoginContext);

    const handleLogin = (event: React.FormEvent<HTMLFormElement>, isGuest?: boolean) : void => {
        event.preventDefault();
        setUserLoggedIn(true);
    }

    return(
        <div className={isRegisterVisible ? "Visibility-hidden" : "Login-page"}>
            <form className="InputFields" onSubmit={handleLogin}>
                <label>Username
                    <input type="text" placeholder="Username" required/>
                </label>

                <Button text="Login" />
            </form>
            <form className="InputFields ButtonDivision" onSubmit={(e)=>{e.preventDefault()}}>
                <Button text="Login as Guest" onClick={handleLogin as React.FormEventHandler}/>
                <Button text="Register" onClick={()=>{setIsRegisterVisible(true)}}/>
            </form>
            
        </div>
    );
}

export default LoginPage;