import { useContext, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { FaUser, FaShoppingCart, FaHeart, FaBars } from 'react-icons/fa';
import { AuthContext } from '@/contexts/AuthContext';
import { MdLogout } from 'react-icons/md';
import { Cart } from '../Cart';
import { CartContext } from '@/services/hooks/useCart';
import { useRouter } from 'next/router';
import { ActiveLink } from './ActiveLink';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import { ResponsiveMenu } from './responsiveMenu';

export function Header() {
    const {isAuthenticated, user, handleLogout} = useContext(AuthContext);
    const {cart ,openCart , setOpenCart } = useContext(CartContext);

    const [showOverlay, setShowOverlay] = useState(false);
    const [responsiveMenu, setResponsiveMenu] = useState(false);
    const [fixedHeader, setFixedHeader] = useState(false);

    const router = useRouter()

    function handleOpenCart() {
        setOpenCart(true);
        setShowOverlay(true);
    }

    function handleOpenResponsiveMenu() {
        setResponsiveMenu(true);
        setShowOverlay(true);
    }

    useEffect(() => {
        const scrollListener = () => {
          if (window.scrollY > 10) {
            setFixedHeader(true);
          } else {
            setFixedHeader(false);
          }
        };
    
        if (typeof window !== 'undefined') {
          // Verifica se estamos no lado do cliente antes de adicionar o evento de rolagem.
          window.addEventListener('scroll', scrollListener);
        }
    
        return () => {
          if (typeof window !== 'undefined') {
            // Verifica novamente antes de remover o evento de rolagem.
            window.removeEventListener('scroll', scrollListener);
          }
        };
      }, []);

    useEffect(() => {
        setOpenCart(false);
      }, [router.pathname, setOpenCart]);

    return (
        <>
            <div className={fixedHeader ? styles.fixedHeader : styles.header}>
                <div className={`d-flex align-items-center justify-content-between ${styles.headerContent}`}>
                    <div className={styles.responsiveIconBox}>
                        <FaBars onClick={handleOpenResponsiveMenu} className={styles.openResponsiveMenu} />
                        <img src="/images/Logo.png" alt="logo" />
                    </div>
                    <nav className='d-flex gap-5 mt-3'>
                    <ActiveLink activeClassName={styles.active} href="/" passHref legacyBehavior>
                        Início
                    </ActiveLink>
                    <ActiveLink activeClassName={styles.active} href="/menu" passHref legacyBehavior>
                        Menu
                    </ActiveLink>
                    <ActiveLink activeClassName={styles.active} href="/about" passHref legacyBehavior>
                        Sobre
                    </ActiveLink>
                    <ActiveLink activeClassName={styles.active} href="/contact" passHref legacyBehavior>
                        Contato
                    </ActiveLink>
                </nav>
                    <div className={`d-flex align-items-center gap-4 ${styles.iconsContainer}`}>
                        <div className={`d-flex gap-3 align-items-center ${styles.userBox}`}>   
                            <div>
                                {isAuthenticated ? 
                                <div className='d-flex align-items-center gap-4'>
                                    <div className='d-flex gap-3 align-items-center'>
                                        <div className={styles.imgContainer}>
                                            <img src="/images/UserImage.png" alt="user" />
                                        </div>
                                        <div>
                                            <h5 className='text-dark'>{user.firstname}</h5>
                                            <h5 className='text-dark'>{user.lastname}</h5>
                                        </div>
                                    </div>
                                    <MdLogout onClick={handleLogout} className={styles.icon} />
                                </div> 
                                :  
                                <div className='d-flex gap-3 align-items-center'>
                                    <FaUser className={styles.icon} />
                                    <div>
                                        <h5>Conta</h5>
                                        <div className='d-flex gap-2'>
                                            <Link href='/login'>
                                                <h6 className='mb-2 pr-2'>Login</h6>
                                            </Link>
                                            <Link href='/signUp'><h6>Registro</h6></Link></div>  
                                        </div>  
                                </div>
                                }
                            </div>
                        </div>

                        <div className={`d-flex justify-content-center align-items-center ${styles.cartAmount}`}>
                            <span>{cart.length}</span>
                        </div>
                       
                        <FaShoppingCart onClick={handleOpenCart} className={styles.icon} />
                        <FaHeart className={styles.icon} />
                    </div>
                </div>
            </div>
            {showOverlay && <div className="overlay"></div>}
            {openCart && <Cart onSetShowOverlay = {setShowOverlay} />}
            {responsiveMenu && 
            <ResponsiveMenu onSetResponsiveMenu = {setResponsiveMenu} onSetShowOverlay = {setShowOverlay} />}
            <ToastContainer />
        </>
    )
}