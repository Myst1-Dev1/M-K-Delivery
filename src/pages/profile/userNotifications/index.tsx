import { FaEnvelope, FaRocketchat } from 'react-icons/fa';
import styles from './styles.module.scss';

interface UserNotificationprops {
    onHandleOpenUserChat:() => void;
}

export function UserNotifications({onHandleOpenUserChat}:UserNotificationprops) {
    return (
        <div className={`col-md-8 ${styles.notificationContainer}`}>
            <div className='row gap-4'>
            <div className={`col-md-6 ${styles.notificationBox}`}>
                <div className={`d-flex justify-content-between ${styles.notificationSubtitles}`}>
                    <div className='d-flex flex-column gap-3'>
                        <div className='d-flex align-items-center gap-3'>
                            <FaEnvelope className={styles.icon} />
                            <h6 className='fw-bold'>Mensagem</h6>
                        </div>
                        <h6 className='fw-bold'>Ashley Johnsom(Admin)</h6>
                        <p>
                            Tivemos um problema com seu pedido, senhor lorem ipsum
                            não foi informado o endereço correto.
                        </p>
                        
                    </div>
                    <div>
                        <img src="/images/AdminImage.png" alt="admin-image" />
                    </div>
                </div>
                <div className={`${styles.chatBox}`}>
                    <div className={`d-flex align-items-center gap-3 ${styles.chatBoxSubtitles}`}>
                        <FaRocketchat
                            onClick={onHandleOpenUserChat} 
                            className={styles.icon} />
                        <h6 className='fw-bold'>Chat</h6>
                    </div>
                </div>
            </div>
            <div className={`col-md-6 ${styles.notificationBox}`}>
                <div className={`d-flex justify-content-between ${styles.notificationSubtitles}`}>
                    <div className='d-flex flex-column gap-3'>
                        <div className='d-flex align-items-center gap-3'>
                            <FaEnvelope className={styles.icon} />
                            <h6 className='fw-bold'>Mensagem</h6>
                        </div>
                        <h6 className='fw-bold'>Ashley Johnsom(Admin)</h6>
                        <p>
                            Tivemos um problema com seu pedido, senhor lorem ipsum
                            não foi informado o endereço correto.
                        </p>
                        
                    </div>
                    <div>
                        <img src="/images/AdminImage.png" alt="admin-image" />
                    </div>
                </div>
                <div className={`${styles.chatBox}`}>
                    <div className={`d-flex align-items-center gap-3 ${styles.chatBoxSubtitles}`}>
                        <FaRocketchat className={styles.icon} />
                        <h6 className='fw-bold'>Chat</h6>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}