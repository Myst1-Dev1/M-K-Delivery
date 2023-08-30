import { FaPaperPlane } from 'react-icons/fa';
import styles from './styles.module.scss';

export function OrderChat() {
    return (
        <div className={styles.chat}>
            <div className={styles.orderChatContainer}>
                <div className={`d-flex align-items-center gap-3 ${styles.userBox}`}>
                    <div className={styles.imgContainer}>
                        <img src="/images/userImage.png" alt="user-image" />
                    </div>
                    <h6 className='fw-bold'>John Doe</h6>
                </div>

                <div className={` ${styles.msgField}`}>
                    <div className={`mt-3 ${styles.msgBox}`}>
                        <p>Senhor tivemos um problema com seu pedido</p>
                        <time>17:40</time>
                    </div>
                </div>

                <div className={`d-flex align-items-center gap-3 ${styles.chatBox}`}>
                    <FaPaperPlane className={styles.icon} />
                    <input type="text" placeholder='Envie uma mensagem' />
                </div>
            </div>
        </div>
    )
}