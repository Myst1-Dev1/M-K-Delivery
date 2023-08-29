import styles from './styles.module.scss';

import { useEffect, useContext } from 'react';
import { CiMenuKebab } from 'react-icons/ci';
import { FaPaperPlane } from 'react-icons/fa';

import { UserContext } from '../../../services/hooks/useUsers';
import { parseCookies } from 'nookies';
import { ChatContext } from '../../../services/hooks/useChat';

interface UserChatProps {
    onUserData:any;
}

export function UserChat({onUserData}: UserChatProps) {

    const { user } = useContext(UserContext);
    const { message, setNewMessage, newMessage, setMessage, sendMessage } = useContext(ChatContext);

    const time = new Date();
    const messageTime = `${time.getHours()}:${time.getMinutes()}`

      useEffect(() => {
        const {'message-token': messageCookie} = parseCookies()
    
        if(Array.isArray(messageCookie)) {
            setMessage(JSON.parse(messageCookie));
        }
        }, [])

    return (
        <div className={styles.chatContainer}>
            <div className={`d-flex justify-content-between align-items-center ${styles.adminBox}`}>
                <div className='d-flex align-items-center gap-3'>
                    <div className={styles.ImgContainer}>
                        <img src={onUserData?.image} alt="admin-image" />
                    </div>
                        <h6 className='fw-bold'>{onUserData?.firstname} {onUserData?.lastname}</h6>
                </div>
                <CiMenuKebab className={styles.icon} />
            </div>

            <div className={`d-flex flex-column gap-5 ${styles.msgField}`}>
                    {message.length !== 0 ? message.map((message:any, index:number) => (
                        <div key={index} className='d-flex gap-4'>
                            {user.map(user => (
                                <div key={user.data._id} className={styles.ImgContainer}>
                                    <img src={user.data.image} alt="admin-message" />
                                </div>
                            ))}
                            <div className={`d-flex justify-content-between align-items-center 
                                ${styles.msgBox}`}>
                                <p>{message}</p>
                                <time>{messageTime}</time>
                            </div>
                        </div>
                    ) ) : ''}
            </div>

            <form onSubmit={sendMessage} className={styles.chatBox}>
                <div className={`d-flex align-items-center gap-4 ${styles.chatBoxInput}`}>
                    <button type='submit'>
                        <FaPaperPlane className={styles.icon} />
                    </button>
                    <input value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)} 
                            type="text" 
                            placeholder='Envie uma mensagem' 
                    />
                </div>
            </form>
        </div>
    )
}