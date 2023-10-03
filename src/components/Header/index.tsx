import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { FaUser, FaShoppingCart, FaBars, FaBell } from 'react-icons/fa';
import { Cart } from '../Cart';
import { ActiveLink } from './ActiveLink';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import { ResponsiveMenu } from './responsiveMenu';
import { UserData } from './userData';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../../store/user/user';
import { openCart } from '../../store/cart/cart';

export function Header() {
    const dispatch = useDispatch();
    const user = useSelector((state:any) => state.userData.user);
    const cartIsOpen = useSelector((state:any) => state.cartData.openCart);
    const cart = useSelector((state:any) => state.cartData.cart);

    const [showOverlay, setShowOverlay] = useState(false);
    const [responsiveMenu, setResponsiveMenu] = useState(false);
    const [fixedHeader, setFixedHeader] = useState(false);

    const isAuthenticated = !!user;

    function handleOpenCart() {
        dispatch(openCart());
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
        dispatch(fetchUserData());
      }, []);

    return (
        <>
            <div data-testid="header" className={fixedHeader ? styles.fixedHeader : styles.header}>
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
                            {isAuthenticated ? 
                                <div className='d-flex align-items-center gap-4'>
                                    <UserData />
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
                       
                        <div className={styles.cartBox} data-testid="cart-button">
                            <div
                                className={`d-flex justify-content-center align-items-center 
                                ${styles.cartAmount}`}>
                                <span data-testid='cart-length'>{cart?.length}</span>
                            </div>
                            <FaShoppingCart
                                onClick={handleOpenCart} 
                                className={styles.icon} 
                            />
                        </div>
                        <FaBell className={styles.icon} />
                        {/* <FaHeart className={styles.icon} /> */}
                    </div>
                </div>
            </div>
            {showOverlay && <div data-testid="showOverlay" className="overlay"></div>}
            {cartIsOpen && <Cart onSetShowOverlay = {setShowOverlay} />}
            {responsiveMenu && 
            <ResponsiveMenu onSetResponsiveMenu = {setResponsiveMenu} onSetShowOverlay = {setShowOverlay} />}
            <ToastContainer />
        </>
    )
}