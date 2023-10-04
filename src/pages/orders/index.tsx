import Link from 'next/link';
import { PageBanner } from '../../components/pageBanner';
import styles from './styles.module.scss';
import { FaRocketchat } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { OrderChat } from '../../components/orderChat';
import { ChatContext } from '../../services/hooks/useChat';
import { OrdersContext } from '../../services/hooks/useOrders';

export default function Orders() {

    // const { isAuthenticated } = useContext(AuthContext);
    // const { allUser } = useContext(UserContext);
    const { chat, setChat, handleOpenChat } = useContext(ChatContext)
    const { orders ,handleChangeOrderStatus } = useContext(OrdersContext);

    console.log('cliquei no chat',chat);
    //console.log(orders);

    // const tst = orders.find(order => order.name);
    
    // console.log(tst);

    const router = useRouter();

    // function handleOpenChat() {
    //     setChat(true);
    // }

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

                <div className={`row gap-5 container py-5 ${styles.orderContainer}`}>
                    {orders?.map((order:any, index:number) => (
                        <div key={index} className={`col-md-4 mb-3 ${styles.orderBox}`}>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <h5 className='fw-bold'>{order.name}</h5>
                                </div>
                                <div className='d-flex align-items-center gap-3'>
                                    <FaRocketchat onClick={() => handleOpenChat(order.name)} 
                                    className={styles.icon} />
                                    <h5 className='fw-bold'>Chat</h5>
                                </div>
                            </div>
                            <div className='d-flex flex-column gap-3 mt-4'>
                                <h6>Telefone: {order.tel}</h6>
                                <h6>Endereço: {order.adress}</h6>
                                <h6>Cep: {order.zipCode}</h6>
                                <h6>{order.additionalInformation === '' ? '' :
                                `Informações Adicionais: ${order.additionalInformation}`}</h6>
                            </div>
                            <div className='mt-4'>
                                <h5 className='fw-bold'>Pedido</h5>  
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
                                 <h6 className='mt-3'>
                                    Total do pedido
                                    <span className='ms-2'>
                                        {Intl.NumberFormat('pt-br', {
                                            style: 'currency',
                                            currency: 'BRL'
                                        }).format(order.cartPrice.reduce((total:any, price:any) => 
                                        total + parseFloat(price), 0) + 5)}
                                    </span>
                                 </h6>
                            </div>
                            <div className='mt-4'>
                                <h5 className='fw-bold'>Método de Pagamento</h5>
                                <div className='d-flex flex-column gap-3 mt-4'>
                                    <h6>{order.paymentMethod !== 0 ? 'Pagamento na Entrega' 
                                        : 'Pagamento Online'}
                                    </h6>
                                    <h6>{order.paymentMethod}
                                        {order.changeValue !== '' ?
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
                                        : ''}
                                    </h6>
                                </div>
                            </div>
                        <div className='d-flex justify-content-between mt-4'>
                            <button 
                                className={styles.acceptOrder}
                                onClick={() => handleChangeOrderStatus('Em progresso', order.name)}
                            >
                                Aceitar Pedido
                            </button>
                            <button 
                                className={styles.refuseOrder}
                                onClick={() => handleChangeOrderStatus('Recusado', order.name)}
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