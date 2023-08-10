import styles from './styles.module.scss';
import {FaBell, FaCartPlus, FaHeart, FaRocketchat, FaUser} from 'react-icons/fa';

import { UserContext } from "../../services/hooks/useUsers";
import { AuthContext } from "../../contexts/AuthContext";
import { useState, useContext } from "react"
import { UserInfo } from './userInfo';
import { UserFavorites } from './userFavorites';
import { UserOrders } from './userOrders';
import { UserNotifications } from './userNotifications';

export default function Profile() {
    const [profile, setProfile] = useState(true);
    const [favoritesProfile, setFavoritesProfile] = useState(false);
    const [orders, setOrders] = useState(false);
    const [notification, setNotification] = useState(false);

    const { isAuthenticated } = useContext(AuthContext);
    const { user } = useContext(UserContext);

    console.log(user);

    function handleOpenProfile() {
        setProfile(true);
        setFavoritesProfile(false);
        setOrders(false);
        setNotification(false);
    }

    function handleOpenFavorites() {
        setProfile(false);
        setFavoritesProfile(true);
        setOrders(false);
        setNotification(false);
    }

    function handleOpenOrders() {
        setProfile(false);
        setFavoritesProfile(false);
        setOrders(true);
        setNotification(false);
    }

    function handleOpenNotifications() {
        setProfile(false);
        setFavoritesProfile(false);
        setOrders(false);
        setNotification(true);
    }

return (
    <div className={`container row gap-5 m-auto py-5 ${styles.userContainer}`}>
        <div className={`col-md-4 ${styles.userProfileBox}`}>
            {isAuthenticated ?
                <div>
                    {user.map(user => {
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
                                    <button>
                                        <FaRocketchat className={styles.icon} /> 
                                        Enviar Mensagem
                                    </button>
                                </div>
                                : ''}
                            </div>
                        )
                    })}
                </div>
                : 'Sem dados'
            }
        </div>
        {profile && <UserInfo />}
        {favoritesProfile && <UserFavorites />}
        {orders && <UserOrders />}
        {notification && <UserNotifications />}
    </div>
)
}