import {FC, useContext} from 'react';
import Button from '../components/shared/Button';
import { LoginContext } from './LoginContext';



const LoginPage : FC = () =>{

    const {userLoggedIn, setUserLoggedIn} = useContext(LoginContext);

    const handleLogin = () : void => {
        setUserLoggedIn(true);
    }

    return(
        <div className="Login-page">
            <form className="InputFields" onSubmit={handleLogin}>
                <label>Username
                    <input type="text" placeholder="Username" required/>
                </label>

                <Button text="Login" />
            </form>
            
            
        </div>
    );
}

export default LoginPage;