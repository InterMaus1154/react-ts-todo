import {FC, useContext, useEffect, useState, useRef} from 'react';
import Button from '../components/shared/Button';
import { LoginContext } from './LoginContext';
import User, {GUEST_USER} from '../util/User';
import { SocketContext } from './SocketContext';
import Modal from '../components/shared/modals/Modal';
import { InvalidCredentials } from '../components/shared/modals/ModalTypes';
import { useNavigate } from 'react-router-dom';
import { flushSync } from 'react-dom';

const LoginPage : FC = () =>{

    const {user, setUserLoggedIn, setUser, setIsAuthorized} = useContext(LoginContext);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const {socket} = useContext(SocketContext);

    const [invalidLoginModalVisible, setInvalidLoginModalVisible] = useState<boolean>(false);
    const invalidLoginModalRef = useRef(document.createElement("div"));

    const passwordRef = useRef(document.createElement("input"));

    const navigate = useNavigate();

    const handleLogin = (event: React.FormEvent<HTMLFormElement>, isGuest: boolean = false) : void => {
        event.preventDefault();
        /**
         * if the user is guest, the todo items will be saved and loaded on the local storage
         * guest = not logged in with an account
         * */
        if(isGuest){
            flushSync(()=>{
                setUser(GUEST_USER);
                setIsAuthorized(true);
                setUserLoggedIn(true);
                navigate("/app");
            });
            return;
        }
        if(username.trim().length === 0 || password.trim().length === 0){
            setInvalidLoginModalVisible(true);
            return;
        }
        socket.emit("request_user_auth", {username: username, password: password});

    }

    useEffect(()=>{

        const handleClick = (e : any)=>{
            if(invalidLoginModalVisible && invalidLoginModalRef.current && !e.target.contains(invalidLoginModalRef.current)){
                setInvalidLoginModalVisible(false);
            }
        };

        window.addEventListener("mousedown", handleClick);

        return () =>{
            window.removeEventListener("mousedown", handleClick);
        };

    }, [invalidLoginModalVisible]);

    useEffect(()=>{

        socket.on("user_auth_response", data =>{
            if(data.isUserExist && data.isUserAuthorised){
                
                flushSync(()=>{
                    setUser(new User(data.user.username, data.user.userTodoItems, data.user.displayname, data.user.userSettings, data.user.userCategories));
                    setIsAuthorized(data.isUserAuthorised);
                    setUserLoggedIn(true);
                });

                navigate("/app");
            }else{
                setIsAuthorized(false);
                setUserLoggedIn(false);
                setInvalidLoginModalVisible(true);
            }
        });
    }, []);

    return(
        <div className="Gate-panel">
            <h1>Welcome to <br></br> Verina Todo App {new Date().getFullYear()}</h1>
        
            <div className={"Login-page"}>
                <form className="InputFields" onSubmit={handleLogin}>
                    <label>Username
                        <input type="text" placeholder="Username" onChange={e=>{setUsername(e.target.value)}}/>
                    </label>
                    <label>Password
                        <input type="password" placeholder="Password" ref={passwordRef} onChange={e =>{setPassword(e.target.value)}}/>
                    </label>
                    <h2>Log in if you already have an account</h2>
                    <Button text="Login" />
                </form>
                <form style={{marginTop: "1rem"}} className="InputFields" onSubmit={(e)=>{e.preventDefault()}}>
                    <Button text="Register" onClick={()=>{navigate("/register")}}/>
                </form>
                
                <Modal title="Failed to login" modalContent={<InvalidCredentials />} visible={invalidLoginModalVisible} setVisible={setInvalidLoginModalVisible} innerRef={invalidLoginModalRef}/>
            </div>
            <h3 className="Warning-colored">Note: This app is still under development,<br /> you may encounter unknown bugs and issues!</h3>
            <h3 className="Warning-colored">Do not store sensitive or important information as it may be lost</h3>
        </div>
    );
}

export default LoginPage;