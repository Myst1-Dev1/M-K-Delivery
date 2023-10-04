import { FaRocketchat } from 'react-icons/fa';
import { PageBanner } from '../../components/pageBanner';
import styles from './styles.module.scss';
import { OrderChat } from '../../components/orderChat';
import { useContext, useState, useEffect } from 'react';
import { ChatContext } from '../../services/hooks/useChat';
import { OrdersContext } from '../../services/hooks/useOrders';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function OrderStatus() {
    const { chat ,setChat, handleOpenChat } = useContext(ChatContext)
    const { orders , handleChangeOrderStatus, orderStatus } = useContext(OrdersContext);

    const router = useRouter();

    const [timeForDelivery , setTimeForDelivery ] = useState('')

    const time = new Date();
    const messageTime = time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

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

      useEffect(() => {
        if(orderStatus === 'Recusado'){
            router.push('/')
            toast.error('Pedido recusado', {
                position:toast.POSITION.TOP_RIGHT,
                theme:'colored'
            })
        }

      }, [])

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
                        || orderStatus === 'Recusado' ?  
                        <div className='d-flex align-items-center gap-2'>
                            <h6>
                                Pedido recusado, não será possível realizar a entrega
                            </h6>
                            <div className={`spinner-grow text-danger ${styles.status}`}></div>
                        </div> 
                        : ''}
                    </div>
                    <h5 className='fw-bold mt-3'>Pedido</h5>
                    <div className='d-flex flex-column gap-3 mt-4'>
                        {orders.map((order:any) => (
                            <div className='d-flex mt-4 flex-column'>
                                {order.cartValue.map((name: any, index: number) => (
                                <div key={index} className='d-flex mb-2 gap-3'>
                                    <h6>{name}</h6>
                                    <span>{Intl.NumberFormat('pt-br', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(order.cartPrice[index])}</span>
                                </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    {orders.map((order:any) => (
                        <div>
                            <div key={order.id} className='d-flex flex-column gap-3 mt-4'>
                                <h6 className='fw-bold'>Valor do Pedido: 
                                    <span className='ms-2'>{Intl.NumberFormat('pt-br', {
                                            style: 'currency',
                                            currency: 'BRL'
                                        }).format(order.cartPrice.reduce((total:any, price:any) => 
                                        total + parseFloat(price), 0) + 5)}
                                    </span>
                                </h6>
                                <h6 className='fw-bold'>
                                    Pagamento: {order.paymentMethod !== 0 ? 'Pagamento na Entrega' 
                                    : 'Pagamento Online'}
                                    <br /> {order.changeValue === '' ? '' :
                                    <div>
                                        Valor do troco:
                                        <span className='ms-2'>
                                            {Intl.NumberFormat('pt-br', {
                                                style:'currency',
                                                currency:'BRL'
                                            }).format(order.changeValue - (order.cartPrice.reduce
                                                ((total:any, price:any) => 
                                                total + parseFloat(price), 0) + 5))}
                                        </span>
                                    </div>
                                    }
                                </h6>
                            </div>
                            <div className='d-flex justify-content-between align-items-center mt-4'>
                                <div className='d-flex gap-3'>
                                    <FaRocketchat onClick={() => handleOpenChat(order.name)} 
                                    className={styles.icon} />
                                    <h6 className='fw-bold'>Chat</h6>
                                </div>
                                {/* <button onClick={() => handleChangeOrderStatus('Concluido')}>
                                    Recebi meu pedido
                                </button> */}
                            </div>
                        </div>
                    ))}     
                </div>
            </div>
            {chat && <OrderChat />}
        </>
    )
}