import {FC, createContext, useState} from 'react';
import { Socket, io } from 'socket.io-client';

interface ISocketContext{
    socket: Socket;
}

export const SocketContext = createContext({socket: io()} as ISocketContext);


//const socket_ = io("192.168.0.10:3001");
const socket_ = io("https://verinaappbetaserver.onrender.com:3001");

const SocketProvider : FC<{children: React.ReactNode}> = ({children})=>{
    
    const [socket, setSocket] = useState<Socket>(socket_);
    
    return(
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    );
}

export default SocketProvider;