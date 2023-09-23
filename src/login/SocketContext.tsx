import {FC, createContext, useState, useEffect} from 'react';
import { Socket, io } from 'socket.io-client';

interface ISocketContext{
    socket: Socket;
    isConnected: boolean;
}

export const SocketContext = createContext({socket: io()} as ISocketContext);


const socket_ = io("192.168.0.10:3001");
//const socket_ = io("https://verinaappbetaserver.onrender.com");

const SocketProvider : FC<{children: React.ReactNode}> = ({children})=>{
    
    const [socket, setSocket] = useState<Socket>(socket_);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(()=>{
        socket.on("connection_established", data =>{
            setIsConnected(true);
        });
    }, []);
    
    return(
        <SocketContext.Provider value={{socket, isConnected}}>
            {children}
        </SocketContext.Provider>
    );
}

export default SocketProvider;
