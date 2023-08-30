import {FC, useContext, useEffect, useState, useRef} from 'react';
import Button from '../components/shared/Button';
import { LoginContext } from './LoginContext';
import User, {GUEST_USER} from '../util/User';
import { SocketContext } from './SocketContext';
import Modal from '../components/shared/modals/Modal';
import { InvalidCredentials } from '../components/shared/modals/ModalTypes';
import { useNavigate } from 'react-router-dom';

const LoginPage : FC = () =>{

    const {setUserLoggedIn, setUser, setIsAuthorized} = useContext(LoginContext);
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

            setUser(GUEST_USER);
            setUserLoggedIn(true);
            setIsAuthorized(true);
            socket.emit("user_is_guest", {isGuest: true});
            navigate("/app");
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
                setIsAuthorized(data.isUserAuthorised);
                setUserLoggedIn(true);
                setUser(new User(data.user.username, data.user.userTodoItems, data.user.displayname));
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
                <form className="InputFields ButtonDivision" onSubmit={(e)=>{e.preventDefault()}}>
                    <Button text="Login as Guest" onClick={(e)=>{handleLogin(e as any, true)}}/>
                    <Button text="Register" onClick={()=>{navigate("/register")}}/>
                </form>
                
                <Modal title="Failed to login" modalContent={<InvalidCredentials />} visible={invalidLoginModalVisible} setVisible={setInvalidLoginModalVisible} innerRef={invalidLoginModalRef}/>
            </div>
            <h3>Remember to save your items (Save to server) <br />after every changes you make!</h3>
        </div>
    );
}

export default LoginPage;