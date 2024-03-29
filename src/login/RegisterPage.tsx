import {FC, useContext, useState, useRef, useEffect} from 'react';
import Button from '../components/shared/Button';
import User from '../util/User';
import { SocketContext } from './SocketContext';
import Modal from '../components/shared/modals/Modal';
import { UserRegisteredModal, UserExistModal, FillOutFieldsModal } from '../components/shared/modals/ModalTypes';
import { DefaultSettings } from '../util/Settings';
import { DEFAULT_CATEGORIES } from '../util/Category';

import { useNavigate } from 'react-router-dom';

const RegisterPage : FC = () =>{
    
    const {socket} = useContext(SocketContext);

    const navigate = useNavigate();

    const [userRegisteredModalVisible, setUserRegisteredModalVisible] = useState<boolean>(false);
    const userRegisteredModalRef = useRef(document.createElement("div"));
    const [userExistModalVisible, setUserExistModalVisible] = useState<boolean>(false);
    const userExistModalRef = useRef(document.createElement("div"));
    const [invalidInputsModalVisible, setInvalidInputsModalVisible] = useState<boolean>(false);
    const invalidInputsModalRef = useRef(document.createElement("div"));

    useEffect(()=>{
        const handleClick = (e: any) : void =>{

            if(userRegisteredModalVisible && userRegisteredModalRef.current && !e.target.contains(userRegisteredModalRef.current)){
                setUserRegisteredModalVisible(false);
            }

            if(userExistModalVisible && userExistModalRef.current && !e.target.contains(userExistModalRef.current)){
                setUserExistModalVisible(false);
            }

            if(invalidInputsModalVisible && invalidInputsModalRef.current && !e.target.contains(invalidInputsModalRef.current)){
                setInvalidInputsModalVisible(false);
            }
        };

        window.addEventListener("mousedown", handleClick);

        return () =>{
            window.removeEventListener("mousedown", handleClick);
        };

    }, [userRegisteredModalVisible, userExistModalVisible, invalidInputsModalVisible]);



    const [userName, setUserName] = useState<string>("");
    const [displayName, setDisplayName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const passwordRef = useRef(document.createElement("input"));


    const handleRegister = (e : React.FormEvent<HTMLFormElement>) : void =>{
        e.preventDefault();
        console.log("Register button clicked!");
        if(isStringEmpty(userName) || isStringEmpty(displayName) || isStringEmpty(password) || password.trim().length < 8){
            setInvalidInputsModalVisible(true);
            return;
        }


        const user = new User(userName, [], displayName, DefaultSettings, DEFAULT_CATEGORIES);
        socket.emit("request_username_check", {user: user});
        

    };

    useEffect(()=>{

        const passRef = passwordRef.current;

        socket.on("username_check_response", data =>{
            if(data.isUserExist){
                setUserExistModalVisible(true);
                return;
            }
        socket.emit("register_user", {user: data.user, password: passRef.value});
        }); 

        socket.on("user_registered", data =>{
            if(data.isUserRegistered){
                setUserRegisteredModalVisible(true);
                return;
            }
        });
    }, []);


    return(
        <div className="Gate-panel">
            <h2>Create an account with us</h2>
            <form className="InputFields" onSubmit={e => handleRegister(e)}>
                <label>Username:<span className="Required-field">*</span>
                    <input type="text" placeholder="Username..." onChange={e => setUserName(e.target.value)}/>
                </label>
                <label>Display name:<span className="Required-field">*</span>
                    <input type="text" placeholder="Display name..." onChange={e => setDisplayName(e.target.value)}/>
                </label>
                <label>Password: <span className="Required-field">*</span>
                    <input type="password" placeholder="Password..."  onChange={e => setPassword(e.target.value)} ref={passwordRef}/>
                    <span style={{color: "red", fontSize: ".9em"}}>Password must be at least 8 characters long!</span>
                </label>
                <Button text="Register Now" />
            </form>
            <h3>Already have an account?</h3>
            <Button text="Login now" onClick={()=>{navigate("/")}}/>
            
            <Modal title="User registered" modalContent={<UserRegisteredModal/>} visible={userRegisteredModalVisible} setVisible={setUserRegisteredModalVisible} innerRef={userRegisteredModalRef}/>
            <Modal title="User already registered" modalContent={<UserExistModal/>} visible={userExistModalVisible} setVisible={setUserExistModalVisible} innerRef={userExistModalRef}/>
            <Modal title="Invalid inputs" modalContent={<FillOutFieldsModal/>} visible={invalidInputsModalVisible} setVisible={setInvalidInputsModalVisible} innerRef={invalidInputsModalRef}/>
        </div>
    );
};

export default RegisterPage;

function isStringEmpty(value: string){
    return value.trim().length === 0;
}