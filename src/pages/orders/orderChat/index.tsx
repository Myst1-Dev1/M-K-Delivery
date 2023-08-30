import { FaPaperPlane, FaTimes } from 'react-icons/fa';
import styles from './styles.module.scss';

import { useContext, useEffect, useRef } from 'react';
import { ChatContext } from '../../../services/hooks/useChat';
import { parseCookies } from 'nookies';


export function OrderChat() {
    const { 
        message, 
        setNewMessage, 
        newMessage, 
        setMessage, 
        sendMessage,
        setChat
    } = useContext(ChatContext);

    const messageEndRef = useRef<HTMLInputElement>(null);

    const time = new Date();
    const messageTime = time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    function scrollToBottom() {
        messageEndRef.current?.scrollIntoView({behavior:"smooth"});
    }

    function handleCloseChat() {
        setChat(false);
    }

    useEffect(() => {
        const {'message-token': messageCookie} = parseCookies()
    
        if(Array.isArray(messageCookie)) {
            setMessage(JSON.parse(messageCookie));
        }
        }, [])

    useEffect(() => {
        scrollToBottom();
    }, [message])

    return (
        <div className={styles.chat}>
            <div className={styles.orderChatContainer}>
                <div className={`d-flex align-items-center justify-content-between ${styles.userBox}`}>
                    <div className='d-flex align-items-center gap-3'>
                        <div className={styles.imgContainer}>
                            <img src="/images/userImage.png" alt="user-image" />
                        </div>
                        <h6 className='fw-bold'>John Doe</h6>
                    </div>
                    <FaTimes onClick={handleCloseChat} className={styles.icon} />
                </div>

                <div className={` ${styles.msgField}`}>
                    {message.length !== 0 ? message.map((message:any, index:number) => (
                        <div ref={messageEndRef} key={index} className={`mb-3 ${styles.msgBox}`}>
                            <p>{message}</p>
                            <time>{messageTime}</time>
                        </div>
                    )) : ''}
                </div>

                <form onSubmit={sendMessage} 
                    className={`d-flex align-items-center gap-3 ${styles.chatBox}`}>
                    <FaPaperPlane className={styles.icon} />
                    <input 
                        type="text" 
                        placeholder='Envie uma mensagem'
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                    />
                </form>
            </div>
        </div>
    )
}