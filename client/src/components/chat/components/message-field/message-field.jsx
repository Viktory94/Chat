import styles from './styles.module.css';
import {useState} from "react";
import PropTypes from 'prop-types';

const MessageField = ({socket}) => {

    const [message, setMessage] = useState('')


    const isTyping = () => socket.emit('typing', `${localStorage.getItem('user')} is typing`)

    const handleSend = (e) => {
        e.preventDefault()
      if (message.trim() && localStorage.getItem('user')) {
        socket.emit('message', {
            text: message,
            name: localStorage.getItem('user'),
            id: `${socket.id}-${Math.random}`,
            socketID: socket.id
        })
      }
      setMessage('')
    }

    return (
        <div className={styles.messageField}>
            <form className={styles.form} onSubmit={handleSend}>
                <input type="text" className={styles.userMessage} 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onInput={isTyping}
                />
                <button className={styles.btn} type="submit">Сказать</button>
            </form>
        </div>
    )
}

MessageField.propTypes = {
    socket: PropTypes.object.isRequired,
};

export default MessageField