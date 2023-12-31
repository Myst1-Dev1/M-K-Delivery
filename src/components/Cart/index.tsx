import { FaTimes, FaTrashAlt } from 'react-icons/fa';
import { useEffect } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, cleanCart, closeCart, reduceItemsInCart, removeToCart, totalCart } from '../../store/cart/cart';

interface CartProps {
    onSetShowOverlay:any;
}

export function Cart({ onSetShowOverlay }:CartProps) {
    const router = useRouter();
    const dispatch = useDispatch();

    const cart = useSelector((state:any) => state.cartData.cart);
    const totalPrice = useSelector((state:any) => state.cartData.totalPrice);

    function handleCloseCart() {
        dispatch(closeCart());
        onSetShowOverlay(false);
    };

    function handleRemoveToCart(id:string) {
        dispatch(removeToCart(id));
    };

    function handleAddToCart(id:string,name:string,image:string,price:number, amount:number) {
        dispatch(addToCart({
            id,
            name,
            image,
            price,
            amount
        }));
    };

    function handleReduceItems(id:string) {
        dispatch(reduceItemsInCart(id));
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

    useEffect(() => {
    dispatch(totalCart());
    }, [cart]);

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
                    {cart && cart.map((item:any) => {
                        return (
                            <div key={item.name} className={`d-flex gap-3 ${styles.cartProductBox}`}>
                                <div className={styles.imgContainer}>
                                    <img src={item.image} alt="cartImage" />
                                </div>
                                <div className='d-flex justify-content-between w-100'>
                                        <div className={styles.cartProductBoxSubtitles}>
                                            <h5>{item.name}</h5>
                                            <h6 className='mt-3'>
                                                {item.amount !== 1 ? 
                                                `Porção com ${item.amount} únidades` 
                                                : `${item.amount} Porção`}
                                            </h6>
                                            <h4 className='mt-3'>
                                                {Intl.NumberFormat('pt-br', {
                                                    style:'currency',
                                                    currency:'BRL'
                                                }).format(item.price * item.quantity)}
                                            </h4>
                                        </div>
                                        <div>
                                            <div className={`d-flex ${styles.amountContainer}`}>
                                                <div
                                                    onClick={() => handleReduceItems(item._id)}  
                                                    className={styles.amountBox}>
                                                    <h3>-</h3>
                                                </div>
                                                <div className={styles.amountBox}><h6>{item.quantity}</h6></div>
                                                <div
                                                    onClick={() => 
                                                        handleAddToCart(
                                                            item._id,
                                                            item.name,
                                                            item.image,
                                                            item.price,
                                                            item.amount
                                                            )} 
                                                    className={styles.amountBox}>
                                                    <h3>+</h3>
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-end mt-5'>
                                                <FaTrashAlt 
                                                onClick={() => handleRemoveToCart(item._id)} 
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
                <h6 onClick={() => dispatch(cleanCart())} className='text-end'>Limpar carrinho</h6>
                <hr />
                <div className='d-flex justify-content-between align-items-center w-100'>
                    <h5>Subtotal</h5>
                    <h5>
                        {Intl.NumberFormat('pt-br', {
                                style:'currency',
                                currency:'BRL'
                        }).format(totalPrice)} 
                    </h5>
                </div>
                <hr />
                <div className='d-flex justify-content-between align-items-center w-100'>
                    <h5>Total(BRL)</h5>
                    <h5>
                        {Intl.NumberFormat('pt-br', {
                            style:'currency',
                            currency:'BRL'
                        }).format(totalPrice + 5)} 
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