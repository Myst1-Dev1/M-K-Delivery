import styles from './styles.module.scss';
import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaTimes } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import { UserProfile } from '../../types/UserProfile';
import { OrdersContext } from '@/services/hooks/useOrders';
import { useSelector, useDispatch } from 'react-redux';
import { destroyCookie } from 'nookies';
import { logout } from '../../store/auth/auth';

interface UserDataProps {
    userData?: UserProfile[];
}

export function UserData({userData}:UserDataProps) {
    const user = useSelector((state:any) => state.userData.user);
    console.log(user);
    const isLoading = useSelector((state:any) => state.userData.isLoading);

    const dispatch = useDispatch();

    const { orders } = useContext(OrdersContext);

    const [profileMenu, setProfileMenu] = useState(false);

    console.log(userData);

    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    function handleOpenProfileMenu() {
        setProfileMenu(true);
    }

    function handleCloseProfileMenu() {
        setProfileMenu(false);
    }

    function handleLogoutUser() {
        destroyCookie(null,'mk-delivery.token');
        dispatch(logout());
        router.push('/login');
        router.reload();
        setProfileMenu(false);
    }

    useEffect(() => {
        const handleRouteChange = () => {
          setProfileMenu(false);
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
          router.events.off('routeChangeComplete', handleRouteChange);
        };
      }, [router]);

    return (
        <div>
            {isLoading ? 'carregando...' : user?.map((user:any) => {
                return (
                    <div key={user.data._id} 
                        className='d-flex gap-3 align-items-center'>
                        <div className={styles.imgContainer}>
                            <img   
                                onClick={handleOpenProfileMenu} 
                                src={user.data.image} 
                                alt="user" 
                            />
                        </div>
                        <div>
                            <h5>{user.data.firstname}</h5>
                            <h5>{user.data.lastname}</h5>
                        </div>
                        {profileMenu && (
                            <div className={styles.profileBox}>
                                <div className='d-flex justify-content-between'>
                                    <div className='d-flex flex-column gap-3'>
                                        <Link href='/profile'>
                                            {user.data.isAdmin === true ? '' :
                                            "Meu Perfil"}
                                        </Link>
                                        {user.data.isAdmin === true ?
                                        <Link href="/usersList">Usuários</Link>
                                            :''}
                                        <Link href="/orders">
                                            {user.data.isAdmin === true ? `Pedidos(${orders?.length})`
                                            : ''}
                                        </Link>
                                        <div data-testid={'logoutIcon'}>
                                            <MdLogout 
                                                onClick={handleLogoutUser} 
                                                className={styles.icon} 
                                            />
                                        </div>
                                    </div>
                                    <FaTimes
                                        onClick={handleCloseProfileMenu} 
                                        className={styles.icon} 
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    )
                })}
        </div>
    )
}
