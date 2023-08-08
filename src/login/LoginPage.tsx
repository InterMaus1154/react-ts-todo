import {FC, useContext, useState} from 'react';
import Button from '../components/shared/Button';
import { LoginContext } from './LoginContext';
import User, {GUEST_USER} from '../util/User';

const LoginPage : FC<{isRegisterVisible : boolean, setIsRegisterVisible : React.Dispatch<React.SetStateAction<boolean>>}> = ({isRegisterVisible, setIsRegisterVisible}) =>{

    const {userLoggedIn, setUserLoggedIn, setUser} = useContext(LoginContext);
    const [username, setUsername] = useState<string>("");

    const handleLogin = (event: React.FormEvent<HTMLFormElement>, isGuest: boolean = false) : void => {
        event.preventDefault();
        /**
         * if the user is guest, the todo items will be saved and loaded on the local storage
         * guest = not logged in with an account
         * */
        if(isGuest){
            setUser(GUEST_USER);
            console.log(window.localStorage.getItem("tsx-todo-items") === null ? "alma" : "körte");
            setUserLoggedIn(true);
            return;
        }
        if(username.trim().length === 0) return;
        setUser(new User(username, []));
    }

    return(
        <div className={isRegisterVisible ? "Visibility-hidden" : "Login-page"}>
            <form className="InputFields" onSubmit={handleLogin}>
                <label>Username
                    <input type="text" placeholder="Username" required onChange={e=>{setUsername(e.target.value)}}/>
                </label>

                <Button text="Login" />
            </form>
            <form className="InputFields ButtonDivision" onSubmit={(e)=>{e.preventDefault()}}>
                <Button text="Login as Guest" onClick={(e)=>{handleLogin(e as any, true)}}/>
                <Button text="Register" onClick={()=>{setIsRegisterVisible(true)}}/>
            </form>
            
        </div>
    );
}

export default LoginPage;