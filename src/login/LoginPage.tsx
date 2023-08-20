import {FC, useContext, useState} from 'react';
import Button from '../components/shared/Button';
import { LoginContext } from './LoginContext';
import User, {GUEST_USER} from '../util/User';
import {Todo, ITodoDate} from '../util/Todo';
import {Category, DEFAULT_CATEGORIES} from '../util/Category';
import { IMPORTANCE_GRADES } from '../util/Importance';
import { SocketContext } from './SocketContext';

const LoginPage : FC<{isRegisterVisible : boolean, setIsRegisterVisible : React.Dispatch<React.SetStateAction<boolean>>}> = ({isRegisterVisible, setIsRegisterVisible}) =>{

    const {userLoggedIn, setUserLoggedIn, setUser} = useContext(LoginContext);
    const [username, setUsername] = useState<string>("");
    const {socket} = useContext(SocketContext);

    const handleLogin = (event: React.FormEvent<HTMLFormElement>, isGuest: boolean = false) : void => {
        event.preventDefault();
        /**
         * if the user is guest, the todo items will be saved and loaded on the local storage
         * guest = not logged in with an account
         * */
        if(isGuest){
            //setUser(new User("somebody", [new Todo("test", "hello", new Category(56, "test", "test"), {date: "2025-17-12", allDay: false}, IMPORTANCE_GRADES[1], false)]));
            setUser(GUEST_USER);
            setUserLoggedIn(true);
            socket.emit("user_is_guest", {isGuest: true});
            return;
        }
        if(username.trim().length === 0) return;
        setUser(new User(username, []));
    }

    return(
        <div className={isRegisterVisible ? "Visibility-hidden" : "Login-page"}>
            <h2>Log in if you already have an account</h2>
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