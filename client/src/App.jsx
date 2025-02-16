import { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import {Route, Routes} from "react-router-dom"
import Home from "./components/home/home.jsx"
import ChatPage from "./components/chat/index.jsx"

const socket = new socketIOClient('http://localhost:5000');




function App() {
    useEffect(() => {
        
    }, []);

    return (
        <div>
            <Routes>
                <Route path='/' element={<Home socket={socket} />} />
                <Route path='/chat' element={<ChatPage socket={socket} />} />
            </Routes>
        </div>
    );
}

export default App;