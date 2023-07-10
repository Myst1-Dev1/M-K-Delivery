import { FaHeart, FaShoppingCart, FaTimes } from 'react-icons/fa';
import styles from './styles.module.scss';
import { ActiveLink } from '../ActiveLink';
import { useContext } from 'react';
import { CartContext } from '@/services/hooks/useCart';

interface ResponsiveMenuProps {
    onSetResponsiveMenu:any;
    onSetShowOverlay:any;
}

export function ResponsiveMenu({ onSetResponsiveMenu, onSetShowOverlay }:ResponsiveMenuProps) {
    const { setOpenCart } = useContext(CartContext);

    function handleCloseResponsiveMenu() {
        onSetResponsiveMenu(false);
        onSetShowOverlay(false);
    }

    function handleOpenCart() {
        setOpenCart(true)
        onSetResponsiveMenu(false);
    }

    return (
        <div className={styles.responsiveMenu}>
            <div className={`d-flex justify-content-between ${styles.responsiveMenuIcons}`}>
                <div className='d-flex gap-3'>
                    <FaShoppingCart onClick={handleOpenCart} className={styles.icon} />
                    <FaHeart className={styles.icon} />
                </div>
                <FaTimes onClick={handleCloseResponsiveMenu} className={styles.icon} />
            </div>
            <nav className='d-flex flex-column gap-3 mt-5'>
                <ActiveLink activeClassName={styles.active} href='/' legacyBehavior passHref>
                    Inicio
                </ActiveLink>
                <ActiveLink activeClassName={styles.active} href='/menu' legacyBehavior passHref>
                    Menu
                </ActiveLink>
                <ActiveLink activeClassName={styles.active} href='/sobre' legacyBehavior passHref>
                    Sobre
                </ActiveLink>
                <ActiveLink activeClassName={styles.active} href='/avaliacoes' legacyBehavior passHref>
                    Avaliações
                </ActiveLink>
                <ActiveLink activeClassName={styles.active} href='/contato' legacyBehavior passHref>
                    Contato
                </ActiveLink>
            </nav>
        </div>
    )
}