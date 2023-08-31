import { FaRocketchat } from 'react-icons/fa';
import { PageBanner } from '../../components/pageBanner';
import styles from './styles.module.scss';
import { OrderChat } from '../orders/orderChat';
import { useContext, useState, useEffect } from 'react';
import { ChatContext } from '../../services/hooks/useChat';
import { OrdersContext } from '../../services/hooks/useOrders';
import { CartContext } from '../../services/hooks/useCart';

export default function OrderStatus() {
    const { chat ,setChat } = useContext(ChatContext)
    const { orders , handleChangeOrderStatus, orderStatus } = useContext(OrdersContext);
    const { cart, totalCart } = useContext(CartContext);

    const [timeForDelivery , setTimeForDelivery ] = useState('')

    const time = new Date();
    const messageTime = time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    function handleOpenChat() {
        setChat(true);
    }

    useEffect(() => {
        const time = new Date();
        const newTime = new Date(time);
        newTime.setMinutes(newTime.getMinutes() + 40);
    
        const newMessageTime = newTime.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        });
    
        setTimeForDelivery(newMessageTime);
      }, []);

    return (
        <>
            <PageBanner>Status do Pedido</PageBanner>

            <div className={`row container m-auto py-5 ${styles.statusContainer}`}>
                <div className={`col-md-6 mb-3 ${styles.imgContainer}`}>
                    <img className='img-fluid' src="/images/statusImage.png" alt="status-image" />
                </div>
                <div className={`col-md-6 ${styles.statusInfo}`}>
                    <h5 className='fw-bold'>
                        Tempo de Entrega: {messageTime} - {timeForDelivery}
                    </h5>
                    <div className='d-flex gap-3 mt-4'>
                        {orderStatus === 'Em progresso' ?
                        <div className='d-flex align-items-center gap-2'>
                            <h6>
                                Pedido confirmado, será entregue em breve
                            </h6>
                            <div className={`spinner-grow text-success ${styles.status}`}></div>
                        </div> 
                        :
                        <div className='d-flex align-items-center gap-2'>
                            <h6>
                                Aguardando a confirmação do pedido
                            </h6>
                            <div className={`spinner-grow text-warning ${styles.status}`}></div>
                        </div>  
                        }
                    </div>
                    <h5 className='fw-bold mt-3'>Pedido</h5>
                    <div className='d-flex flex-column gap-3 mt-4'>
                        {cart.map(cart => (
                            <div key={cart.product._id}>
                                <h6>{cart.quantity} {cart.product.name} 
                                    <span className='ms-2'>
                                        {Intl.NumberFormat('pt-br', {
                                        style:'currency',
                                        currency:'BRL'
                                    }   ).format(cart.product.price)}
                                    </span>
                                </h6>
                            </div>
                        ))}
                    </div>
                    {orders.map((order:any) => (
                        <div key={order.id} className='d-flex flex-column gap-3 mt-4'>
                            <h6 className='fw-bold'>Valor do Pedido: 
                                <span className='ms-2'>{Intl.NumberFormat('pt-br', {
                                    style:'currency',
                                    currency:'BRL'
                                }).format(totalCart + 5)}</span>
                            </h6>
                            <h6 className='fw-bold'>
                                Pagamento: {order.paymentMethod !== 0 ? 'Pagamento na Entrega' 
                                : 'Pagamento Online'}
                                <br /> Valor do troco:
                                <span className='ms-2'>
                                    {Intl.NumberFormat('pt-br', {
                                        style:'currency',
                                        currency:'BRL'
                                    }).format(order.changeValue - (totalCart + 5))}
                                </span>
                            </h6>
                        </div>
                    ))}
                    <div className='d-flex justify-content-between align-items-center mt-4'>
                        <div className='d-flex gap-3'>
                            <FaRocketchat onClick={handleOpenChat} className={styles.icon} />
                            <h6 className='fw-bold'>Chat</h6>
                        </div>
                        <button onClick={() => handleChangeOrderStatus('Concluido')}>
                            Recebi meu pedido
                        </button>
                    </div>
                </div>
            </div>
            {chat && <OrderChat />}
        </>
    )
}