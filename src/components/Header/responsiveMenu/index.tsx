import { FaBell, FaHeart, FaShoppingCart, FaTimes } from 'react-icons/fa';
import styles from './styles.module.scss';
import { ActiveLink } from '../ActiveLink';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../../services/hooks/useCart';
import { useRouter } from 'next/router';

interface ResponsiveMenuProps {
    onSetResponsiveMenu:any;
    onSetShowOverlay:any;
}

export function ResponsiveMenu({ onSetResponsiveMenu, onSetShowOverlay }:ResponsiveMenuProps) {
    const { setOpenCart, cart } = useContext(CartContext);

    const router = useRouter();
    const [previousPathname, setPreviousPathname] = useState(router.pathname);

    function handleCloseResponsiveMenu() {
        onSetResponsiveMenu(false);
        onSetShowOverlay(false);
    }

    function handleOpenCart() {
        setOpenCart(true)
        onSetResponsiveMenu(false);
    }

    if (router.pathname !== previousPathname) {
        handleCloseResponsiveMenu();
        setPreviousPathname(router.pathname);
      }

    useEffect(() => {
        setPreviousPathname(router.pathname);
      }, [router.pathname]);

    return (
        <div className={styles.responsiveMenu}>
            <div className={`d-flex justify-content-between ${styles.responsiveMenuIcons}`}>
                <div className='d-flex gap-3'>
                    <div data-testid="cart-button">
                        <FaShoppingCart
                            onClick={handleOpenCart} 
                            className={styles.icon} 
                        />
                    </div>
                    <FaBell className={styles.icon} />
                </div>
                <div className={`d-flex justify-content-center align-items-center ${styles.cartAmount}`}>
                    <span>{cart?.length}</span>
                </div>
                <FaTimes onClick={handleCloseResponsiveMenu} className={styles.icon} />
            </div>
            <nav className='d-flex flex-column gap-3 mt-5'>
                <ActiveLink activeClassName={styles.active} href='/' legacyBehavior passHref>
                    Início
                </ActiveLink>
                <ActiveLink activeClassName={styles.active} href='/menu' legacyBehavior passHref>
                    Menu
                </ActiveLink>
                <ActiveLink activeClassName={styles.active} href='/about' legacyBehavior passHref>
                    Sobre
                </ActiveLink>
                <ActiveLink activeClassName={styles.active} href='/contact' legacyBehavior passHref>
                    Contato
                </ActiveLink>
            </nav>
        </div>
    )
}