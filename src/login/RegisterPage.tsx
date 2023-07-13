import {FC} from 'react';
import Button from '../components/shared/Button';


const RegisterPage : FC<{isRegisterVisible : boolean, setIsRegisterVisible : React.Dispatch<React.SetStateAction<boolean>>}> = ({isRegisterVisible, setIsRegisterVisible}) =>{
    return(
        <div className={isRegisterVisible ? "Register-page" : "Visibility-hidden"}>
            <h3>Already have an account?</h3>
            <Button text="Login now" onClick={()=>{setIsRegisterVisible(false)}}/>
        </div>
    );
};

export default RegisterPage;