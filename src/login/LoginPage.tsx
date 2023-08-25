import {FC, useContext, useEffect, useState, useRef} from 'react';
import Button from '../components/shared/Button';
import { LoginContext } from './LoginContext';
import User, {GUEST_USER} from '../util/User';
import { SocketContext } from './SocketContext';

import { useNavigate } from 'react-router-dom';

const LoginPage : FC = () =>{

    const {setUserLoggedIn, setUser, setIsAuthorized} = useContext(LoginContext);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const {socket} = useContext(SocketContext);

    const passwordRef = useRef(document.createElement("input"));

    const navigate = useNavigate();

    const handleLogin = (event: React.FormEvent<HTMLFormElement>, isGuest: boolean = false) : void => {
        event.preventDefault();
        /**
         * if the user is guest, the todo items will be saved and loaded on the local storage
         * guest = not logged in with an account
         * */
        if(isGuest){

            setUser(GUEST_USER);
            setUserLoggedIn(true);
            setIsAuthorized(true);
            socket.emit("user_is_guest", {isGuest: true});
            navigate("/app");
            return;
        }
        if(username.trim().length === 0) return;
        socket.emit("request_user_auth", {username: username, password: password});
        ///setUser(new User(username, []));
    }

    useEffect(()=>{

        socket.on("user_auth_response", data =>{
            if(data.isUserExist){
                setIsAuthorized(true);
                setUserLoggedIn(true);
                setUser(new User(data.user.username, [], data.user.displayname));
                navigate("/app");
            }
        });
    }, []);

    return(
        <div className={"Login-page"}>
            <h2>Log in if you already have an account</h2>
            <form className="InputFields" onSubmit={handleLogin}>
                <label>Username
                    <input type="text" placeholder="Username" required onChange={e=>{setUsername(e.target.value)}}/>
                </label>
                <label>Password
                    <input type="password" placeholder="Password" ref={passwordRef} required onChange={e =>{setPassword(e.target.value)}}/>
                </label>

                <Button text="Login" />
            </form>
            <form className="InputFields ButtonDivision" onSubmit={(e)=>{e.preventDefault()}}>
                <Button text="Login as Guest" onClick={(e)=>{handleLogin(e as any, true)}}/>
                <Button text="Register" onClick={()=>{navigate("/register")}}/>
            </form>
            
        </div>
    );
}

export default LoginPage;