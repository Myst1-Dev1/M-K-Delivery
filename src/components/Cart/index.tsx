import { FaTimes, FaTrashAlt } from 'react-icons/fa';
import { useContext, useEffect } from 'react';
import styles from './styles.module.scss';
import { CartContext } from '../../services/hooks/useCart';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { ProductContext } from '@/services/hooks/useProducts';

interface CartProps {
    onSetShowOverlay:any;
}

export function Cart({ onSetShowOverlay }:CartProps) {
    const router = useRouter();

    const { 
        cart,
        setOpenCart,
        totalCart, 
        handleRemoveToCart,
        handleReduceItems, 
        handleAddToCart,
        handleCleanCart }
        = useContext(CartContext);

        function handleCloseCart() {
            setOpenCart(false);
            onSetShowOverlay(false);
        }

    useEffect(() => {
        const handleRouteChange = () => {
          // Feche o carrinho quando a rota for alterada
          handleCloseCart();
        };

        //Adicione o listener para a mudança de rota
        router.events.on('routeChangeStart', handleRouteChange);
    
        //Remova o listener ao desmontar o componente
        return () => {
          router.events.off('routeChangeStart', handleRouteChange);
        };
      }, [router.pathname]);

    return (
        <div className={`d-flex flex-column justify-content-between ${styles.cart}`}>
            <div>
                <div>
                    <div className='d-flex justify-content-between w-100'>
                        <h4 className='text-center mb-1'>
                            {cart && cart.length === 0 ? 'Seu carrinho está vazio' : 'Carrinho de Compras'}
                        </h4>
                        <div data-testid="close-cart">
                        <FaTimes onClick={handleCloseCart} className={styles.icon} />
                        </div>
                    </div>
                    <hr />
                </div>

                <div className={`d-flex flex-column gap-4 ${styles.cartContainer}`}>
                    {cart && cart.map(item => {
                        return (
                            <div key={item.product.name} className={`d-flex gap-3 ${styles.cartProductBox}`}>
                                <div className={styles.imgContainer}>
                                    <img src={item.product.image} alt="cartImage" />
                                </div>
                                <div className='d-flex justify-content-between w-100'>
                                        <div className={styles.cartProductBoxSubtitles}>
                                            <h5>{item.product.name}</h5>
                                            <h6 className='mt-3'>
                                                {item.product.amount !== 1 ? 
                                                `Porção com ${item.product.amount} únidades` 
                                                : `${item.product.amount} Porção`}
                                            </h6>
                                            <h4 className='mt-3'>
                                                {Intl.NumberFormat('pt-br', {
                                                    style:'currency',
                                                    currency:'BRL'
                                                }).format(item.product.price * item.quantity)}
                                            </h4>
                                        </div>
                                        <div>
                                            <div className={`d-flex ${styles.amountContainer}`}>
                                                <div
                                                    onClick={() => handleReduceItems(item.product._id)}  
                                                    className={styles.amountBox}>
                                                    <h3>-</h3>
                                                </div>
                                                <div className={styles.amountBox}><h6>{item.quantity}</h6></div>
                                                <div
                                                    onClick={() => handleAddToCart(item.product._id)} 
                                                    className={styles.amountBox}>
                                                    <h3>+</h3>
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-end mt-5'>
                                                <FaTrashAlt 
                                                onClick={() => handleRemoveToCart(item.product._id)} 
                                                className={styles.icon} 
                                            />
                                            </div>
                                        </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>   
            <div className={`${styles.totalContainer}`}>
                <h6 onClick={handleCleanCart} className='text-end'>Limpar carrinho</h6>
                <hr />
                <div className='d-flex justify-content-between align-items-center w-100'>
                    <h5>Subtotal</h5>
                    <h5>
                        {Intl.NumberFormat('pt-br', {
                                style:'currency',
                                currency:'BRL'
                        }).format(totalCart)} 
                    </h5>
                </div>
                <hr />
                <div className='d-flex justify-content-between align-items-center w-100'>
                    <h5>Total(BRL)</h5>
                    <h5>
                        {Intl.NumberFormat('pt-br', {
                            style:'currency',
                            currency:'BRL'
                        }).format(totalCart + 5)} 
                        <span> (+ R$:5,00)</span>
                    </h5>
                </div>
                <Link href='/paymentPage' passHref>
                    <button className='mt-3'>Seguir para o pagamento</button>
                </Link>
            </div>
        </div>
    )
}