import styles from './styles.module.scss';

import { useState, useEffect, FormEvent } from 'react';
import { CiMenuKebab } from 'react-icons/ci';
import { FaPaperPlane } from 'react-icons/fa';

interface UserChatProps {
    onUserData:any;
}

export function UserChat({onUserData}: UserChatProps) {

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
                <div className='d-flex gap-4'>
                    <div className={styles.ImgContainer}>
                        <img src="/images/AdminImage.png" alt="admin-message" />
                    </div>
                    <div className={`d-flex justify-content-between align-items-center ${styles.msgBox}`}>
                        <p>Lorem ipsum é isso tudo lore lore lore</p>
                        <time>19:30</time>
                    </div>
                </div>
            </div>

            <div className={styles.chatBox}>
                <div className={`d-flex align-items-center gap-4 ${styles.chatBoxInput}`}>
                    <FaPaperPlane className={styles.icon} />
                    <input type="text" placeholder='Envie uma mensagem' />
                </div>
            </div>
        </div>
    )
}