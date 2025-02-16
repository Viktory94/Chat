import Body from "./components/body/body.jsx";
import MessageField from "./components/message-field/message-field.jsx";
import Sidebar from "./components/sidebar/sidebar.jsx";
import styles from './styles.module.css';
import {useState, useEffect} from "react";
import PropTypes from 'prop-types';


const ChatPage = ({socket}) => {
    const [messages, setMessages] = useState([])
    const [status, setStatus] = useState('')
    
    
    

    useEffect(() => {
        const handleResponse = (data) => {
            setMessages(prevMessages => [...prevMessages, data]);
        };

        socket.on('response', handleResponse);

        return () => {
            socket.off('response', handleResponse);
        };
    }, [socket, messages]);

    useEffect(() => {
        socket.on('responseTyping', (data) => {
        setStatus(data)
        setTimeout(() => setStatus(''), 1000)
    })
    }, [socket])

    return (
        <div className={styles.chat}>
            <Sidebar socket={socket}/>
            <main className={styles.main}>
                <Body messages={messages} status={status} />
                <MessageField socket={socket} />
            </main>
        </div>
    )
}

ChatPage.propTypes = {
    socket: PropTypes.object.isRequired,
       
};


export default ChatPage