import Link from 'next/link';
import { PageBanner } from '../../components/pageBanner';
import styles from './styles.module.scss';
import { FaRocketchat } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { UserContext } from '../../services/hooks/useUsers';
import { useRouter } from 'next/router';
import { OrderChat } from './orderChat';
import { ChatContext } from '../../services/hooks/useChat';
import { OrdersContext } from '../../services/hooks/useOrders';
import { CartContext } from '../../services/hooks/useCart';
import { toast } from 'react-toastify';

export default function Orders() {

    // const { isAuthenticated } = useContext(AuthContext);
    // const { allUser } = useContext(UserContext);
    const { chat, setChat } = useContext(ChatContext)
    const { orders, handleChangeOrderStatus } = useContext(OrdersContext);
    const { cart, totalCart } = useContext(CartContext);

    console.log(orders);

    const router = useRouter();

    function handleOpenChat() {
        setChat(true);
    }

    // useEffect(() => {
    //     if(!isAuthenticated && allUser.map(user => user.isAdmin === false)) {
    //         router.push('/page404');
    //     }
    // }, [])

    return (
        <>
            <PageBanner>Pedidos</PageBanner>

            <div className={`container ${styles.ordersPage}`}>
                <Link href="/ordersInProgress">
                    <button>Ver pedidos em andamento</button>
                </Link>

                <div className={`row py-5 ${styles.orderContainer}`}>
                    {orders.map((order:any) => (
                        <div key={order.id} className={`m-auto col-md-4 mb-3 ${styles.orderBox}`}>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <h5 className='fw-bold'>{order.name}</h5>
                                </div>
                                <div className='d-flex align-items-center gap-3'>
                                    <FaRocketchat onClick={handleOpenChat} className={styles.icon} />
                                    <h5 className='fw-bold'>Chat</h5>
                                </div>
                            </div>
                            <div className='d-flex flex-column gap-3 mt-4'>
                                <h6>Telefone: {order.tel}</h6>
                                <h6>Endereço: {order.adress}</h6>
                                <h6>Cep: {order.zipCode}</h6>
                                <h6>Informações adicionais: {order.additionalInformation}</h6>
                            </div>
                            <div className='mt-4'>
                                <h5 className='fw-bold'>Pedido</h5>
                                {cart.map(cart => (
                                    <div key={cart.product._id} 
                                        className='d-flex flex-column gap-3 mt-4'>
                                        <h6>{cart.product.name}
                                            <span className='ms-2'>
                                            {Intl.NumberFormat('pt-br', {
                                                style:'currency',
                                                currency:'BRL'
                                            }).format(cart.product.price)}
                                            </span>
                                        </h6>
                                    </div>
                                ))}
                                 <h6 className='mt-3'>
                                    Total do pedido
                                    <span className='ms-2'>
                                        {Intl.NumberFormat('pt-br', {
                                        style:'currency',
                                        currency:'BRL'
                                        }).format(totalCart + 5)}
                                    </span>
                                 </h6>
                            </div>
                            <div className='mt-4'>
                                <h5 className='fw-bold'>Método de Pagamento</h5>
                                <div className='d-flex flex-column gap-3 mt-4'>
                                    <h6>{order.paymentMethod !== 0 ? 'Pagamento na Entrega' 
                                        : 'Pagamento Online'}
                                    </h6>
                                    <h6>{order.paymentMethod} Valor do troco: 
                                        <span className='ms-2'>
                                            {Intl.NumberFormat('pt-br', {
                                                style:'currency',
                                                currency:'BRL'
                                            }).format(order.changeValue - (totalCart + 5))}
                                        </span>
                                    </h6>
                                </div>
                            </div>
                        <div className='d-flex justify-content-between mt-4'>
                            <button 
                                className={styles.acceptOrder}
                                onClick={() => handleChangeOrderStatus('Em progresso')}
                            >
                                Aceitar Pedido
                            </button>
                            <button 
                                className={styles.refuseOrder}
                                onClick={() => handleChangeOrderStatus('Recusado')}
                            >   Recusar Pedido
                            </button>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            {chat && <OrderChat />}
        </>
    )
}