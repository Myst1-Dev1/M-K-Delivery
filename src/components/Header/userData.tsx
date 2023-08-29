import { UserContext } from '../../services/hooks/useUsers';
import styles from './styles.module.scss';
import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../../contexts/AuthContext';
import Link from 'next/link';
import { FaTimes } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { UserProfile } from '../../types/UserProfile';
import { api, userProfileData } from '@/services/api';
import { parseCookies } from 'nookies';

interface UserDataProps {
    userData?: UserProfile[];
}

export function UserData({userData}:UserDataProps) {
    const { user, isFetching } = useContext(UserContext);
    const { handleLogout } = useContext(AuthContext);
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
        handleLogout()
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
            {user?.map(user => {
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
                                        <Link href="">
                                            {user.data.isAdmin === true ? 'Pedidos'
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

// export const getServerSideProps: GetServerSideProps = async () => {
//     const {'mk-delivery.token': token} = parseCookies();

//     try {
//         const response = await api.get('user/profile', {
//             headers: {
//                 'auth-token': token
//             }
//         })
//         const userData = response.data;

//         return {
//             props: {
//                 userData
//             }
//         }
//     } catch (error) {
//         console.log('tivemos um erro no ssr', error);

//         return {
//             redirect: {
//                 destination: '/login', 
//                 permanent: false,
//             }
//         }
//     }
// }

// export const getStaticProps: GetStaticProps = async () => {
//     const response = await userProfileData.get();
//     const data = response.data;

//     const userData = [{
//         _id:data.data._id,
//         firstname:data.data.firstname,
//         lastname:data.data.lastname,
//         image:data.data.image,
//         isAdmin:data.data.isAdmin
//     }]


//     return {
//         props: {
//             userData
//         }
//     }
// }
