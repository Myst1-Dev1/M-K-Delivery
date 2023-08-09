import styles from './styles.module.scss';
import {FaBell, FaCartPlus, FaHeart, FaRocketchat, FaUser} from 'react-icons/fa';

import { UserContext } from "../../services/hooks/useUsers";
import { AuthContext } from "../../contexts/AuthContext";
import { useState, useContext } from "react"
import { UserInfo } from './userInfo';
import { UserFavorites } from './userFavorites';

export default function Profile() {
    const [profile, setProfile] = useState(true);
    const [favorites, setFavorites] = useState(false);

    const { isAuthenticated } = useContext(AuthContext);
    const { user } = useContext(UserContext);

    console.log(user);

    function handleOpenProfile() {
        setProfile(true);
        setFavorites(false);
    }

    function handleOpenFavorites() {
        setProfile(false);
        setFavorites(true);
    }

return (
    <div className={`container d-flex gap-5 py-5 ${styles.userContainer}`}>
        <div className={styles.userProfileBox}>
            {isAuthenticated ?
                <div>
                    {user.map(user => {
                        return (
                            <div>
                                <div key={user.data._id}
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
                                            className={favorites ? `fw-bold ${styles.active}` : 'fw-bold'}>
                                            Favoritos
                                        </h5>
                                    </div>
                                    <div className={`d-flex align-items-center gap-3 
                                        ${styles.userProfileMenuItem}`}>
                                        <FaCartPlus className={styles.icon} />
                                        <h5 className='fw-bold'>Pedidos</h5>
                                    </div>
                                    <div className={`d-flex align-items-center gap-3 
                                        ${styles.userProfileMenuItem}`}>
                                        <FaBell className={styles.icon} />
                                        <h5 className='fw-bold'>Notificação</h5>
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
        {favorites && <UserFavorites />}
    </div>
)
}