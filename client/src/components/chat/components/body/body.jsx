//import React from 'react';
import styles from './styles.module.css'
import {useNavigate} from "react-router-dom";
//import {messages} from "./components/index.jsx";
import PropTypes from 'prop-types';

const Body = ({messages, status}) => {

    const navigate = useNavigate()

    const handleLeave = () => {
        localStorage.removeItem('user')
        navigate('/')
    }

    return (
        <>
            <header className={styles.header}>
                <button className={styles.btn} onClick={handleLeave}>Покинуть чат</button>
            </header>

            <div className={styles.container}>
                {
                    messages.map(element =>
                        element.name === localStorage.getItem('user') ? (
                            <div key={element.id} className={styles.chats}>
                            <p className={styles.senderName}>Вы</p>
                            <div className={styles.messageSender}>
                                <p>{element.text}</p>
                            </div>
                        </div>
                        ) : (
                            <div key={element.id} className={styles.chats}>
                    <p>{element.name}</p>
                    <div className={styles.messageRecipient}>
                        <p>{element.text}</p>
                    </div>
                </div>
                        )
                    )
                }
                

                <div className={styles.status}>
                    <p>{status}</p>
                </div>

            </div>
        </>
    )
}

Body.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            
        })
    ).isRequired,
    status: PropTypes.object.isRequired,
};



export default Body