import styles from './styles.module.scss';
import {FaBell, FaCartPlus, FaHeart, FaRocketchat, FaUser} from 'react-icons/fa';

import { AuthContext } from "../../contexts/AuthContext";
import { useState, useContext, useEffect } from "react"
import { UserInfo } from './userInfo';
import { UserFavorites } from './userFavorites';
import { UserOrders } from './userOrders';
import { UserNotifications } from './userNotifications';
import { UserChat } from './userChat';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../../store/user/user';

export default function Profile() {
    const user = useSelector((state:any) => state.userData.user);
    const dispatch = useDispatch();

    const [profile, setProfile] = useState(true);
    const [favoritesProfile, setFavoritesProfile] = useState(false);
    const [orders, setOrders] = useState(false);
    const [notification, setNotification] = useState(false);
    const [userChat, setUserChat] = useState(false);

    function handleOpenProfile() {
        setProfile(true);
        setFavoritesProfile(false);
        setOrders(false);
        setNotification(false);
        setUserChat(false);
    }

    function handleOpenFavorites() {
        setProfile(false);
        setFavoritesProfile(true);
        setOrders(false);
        setNotification(false);
        setUserChat(false);
    }

    function handleOpenOrders() {
        setProfile(false);
        setFavoritesProfile(false);
        setOrders(true);
        setNotification(false);
        setUserChat(false);
    }

    function handleOpenNotifications() {
        setProfile(false);
        setFavoritesProfile(false);
        setOrders(false);
        setNotification(true);
        setUserChat(false);
    }

    function handleOpenUserChat() {
        setProfile(false);
        setFavoritesProfile(false);
        setOrders(false);
        setNotification(false);
        setUserChat(true);
    }

    useEffect(() => {
        dispatch(fetchUserData());
      }, []);

return (
    <div className={`container d-flex gap-5 m-auto py-5 ${styles.userContainer}`}>
        <div className={`${styles.userProfileBox}`}>
                <div>
                    {user.map((user:any) => {
                        return (
                            <div key={user.data._id}>
                                <div
                                    className={`d-flex align-items-center gap-3 ${styles.userBox}`}>
                                    <div className={styles.imgContainer}>
                                        <img src={user.data.image}
                                        alt="user-image" />
                                    </div>
                                    <div>
                                        <h4>{user.data.firstname} {user.data.lastname}</h4>
                                        <h6>{user.data.email}</h6>
                                    </div>
                                </div>
                                <div className={`${styles.userProfileMenu}`}>
                                    <div 
                                        className={`d-flex align-items-center gap-3 
                                        ${styles.userProfileMenuItem}`}>
                                        <FaUser className={styles.icon} />
                                        <h5 
                                            onClick={handleOpenProfile}
                                            className={profile ? `fw-bold ${styles.active}` : 'fw-bold'}>
                                            Meu perfil
                                        </h5>
                                    </div>
                                    <div className={`d-flex align-items-center gap-3 
                                        ${styles.userProfileMenuItem}`}>
                                        <FaHeart className={styles.icon} />
                                        <h5 
                                            onClick={handleOpenFavorites}
                                            className={favoritesProfile ? `fw-bold ${styles.active}` : 
                                            'fw-bold'}>
                                            Favoritos
                                        </h5>
                                    </div>
                                    <div className={`d-flex align-items-center gap-3 
                                        ${styles.userProfileMenuItem}`}>
                                        <FaCartPlus className={styles.icon} />
                                        <h5
                                            onClick={handleOpenOrders}
                                            className={orders ? `fw-bold ${styles.active}` : 'fw-bold'}>
                                                Pedidos
                                        </h5>
                                    </div>
                                    <div className={`d-flex align-items-center gap-3 
                                        ${styles.userProfileMenuItem}`}>
                                        <FaBell className={styles.icon} />
                                        <h5
                                            onClick={handleOpenNotifications} 
                                            className={notification ? `fw-bold ${styles.active}` : 'fw-bold'}>
                                            Notificação
                                        </h5>
                                    </div>
                                </div>
                                {user.data.isAdmin === true ?
                                    <div className={styles.sendMessageBox}>
                                    <button onClick={handleOpenUserChat}>
                                        <FaRocketchat className={styles.icon} /> 
                                        Enviar Mensagem
                                    </button>
                                </div>
                                : ''}
                            </div>
                        )
                    })}
                </div>
        </div>
        {profile && <UserInfo />}
        {favoritesProfile && <UserFavorites />}
        {orders && <UserOrders />}
        {notification && <UserNotifications onHandleOpenUserChat={handleOpenUserChat} />}
        {userChat && <UserChat />}
    </div>
)
}