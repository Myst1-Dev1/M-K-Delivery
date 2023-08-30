import Link from 'next/link';
import { PageBanner } from '../../components/pageBanner';
import styles from './styles.module.scss';
import { FaRocketchat } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { UserContext } from '../../services/hooks/useUsers';
import { useRouter } from 'next/router';
import { OrderChat } from './orderChat';
import { ChatContext } from '@/services/hooks/useChat';

export default function Orders() {

    const { isAuthenticated } = useContext(AuthContext);
    const {allUser } = useContext(UserContext);
    const {chat, setChat } = useContext(ChatContext)

    const router = useRouter();

    function handleOpenChat() {
        setChat(true);
    }

    useEffect(() => {
        if(!isAuthenticated && allUser.map(user => user.isAdmin === false)) {
            router.push('/page404');
        }
    }, [])

    return (
        <>
            <PageBanner>Pedidos</PageBanner>

            <div className={`container ${styles.ordersPage}`}>
                <Link href="/ordersInProgress">
                    <button>Ver pedidos em andamento</button>
                </Link>

                <div className={`row py-5 ${styles.orderContainer}`}>
                    <div className={`m-auto col-md-4 mb-3 ${styles.orderBox}`}>
                        <div className='d-flex justify-content-between'>
                            <div className='d-flex align-items-center gap-3'>
                                <div className={styles.imgContainer}>
                                    <img src="/images/adminImage.png" alt="user-order" />
                                </div>
                                <h5 className='fw-bold'>John Doe</h5>
                            </div>
                            <div className='d-flex align-items-center gap-3'>
                                <FaRocketchat onClick={handleOpenChat} className={styles.icon} />
                                <h5 className='fw-bold'>Chat</h5>
                            </div>
                        </div>
                        <div className='d-flex flex-column gap-3 mt-4'>
                            <h6>Telefone: 21 4002-8922</h6>
                            <h6>Endereço: Rua Lorem Porto</h6>
                            <h6>Cep: 400547-547</h6>
                            <h6>Informações adicionais: bastante molho por favor</h6>
                        </div>
                        <div className='mt-4'>
                            <h5 className='fw-bold'>Pedido</h5>
                            <div className='d-flex flex-column gap-3 mt-4'>
                                <h6>1 Porçao de Onigiri R$: 17,50</h6>
                                <h6>1 Salada Massao R$: 13,25</h6>
                                <h6>1 Porção de Hot Roll R$: 17,00</h6>
                                <h6>Total R$: 47,75</h6>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <h5 className='fw-bold'>Método de Pagamento</h5>
                            <div className='d-flex flex-column gap-3 mt-4'>
                                <h6>Pagamento Online</h6>
                                <h6>Cartão de credito | Pix</h6>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between mt-4'>
                            <button className={styles.acceptOrder}>Aceitar Pedido</button>
                            <button className={styles.refuseOrder}>Recusar Pedido</button>
                        </div>
                    </div>
                    <div className={`m-auto col-md-4 mb-3 ${styles.orderBox}`}>
                        <div className='d-flex justify-content-between'>
                            <div className='d-flex align-items-center gap-3'>
                                <div className={styles.imgContainer}>
                                    <img src="/images/adminImage.png" alt="user-order" />
                                </div>
                                <h5 className='fw-bold'>John Doe</h5>
                            </div>
                            <div className='d-flex align-items-center gap-3'>
                                <FaRocketchat className={styles.icon} />
                                <h5 className='fw-bold'>Chat</h5>
                            </div>
                        </div>
                        <div className='d-flex flex-column gap-3 mt-4'>
                            <h6>Telefone: 21 4002-8922</h6>
                            <h6>Endereço: Rua Lorem Porto</h6>
                            <h6>Cep: 400547-547</h6>
                            <h6>Informações adicionais: bastante molho por favor</h6>
                        </div>
                        <div className='mt-4'>
                            <h5 className='fw-bold'>Pedido</h5>
                            <div className='d-flex flex-column gap-3 mt-4'>
                                <h6>1 Porçao de Onigiri R$: 17,50</h6>
                                <h6>1 Salada Massao R$: 13,25</h6>
                                <h6>1 Porção de Hot Roll R$: 17,00</h6>
                                <h6>Total R$: 47,75</h6>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <h5 className='fw-bold'>Método de Pagamento</h5>
                            <div className='d-flex flex-column gap-3 mt-4'>
                                <h6>Pagamento Online</h6>
                                <h6>Cartão de credito | Pix</h6>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between mt-4'>
                            <button className={styles.acceptOrder}>Aceitar Pedido</button>
                            <button className={styles.refuseOrder}>Recusar Pedido</button>
                        </div>
                    </div>
                    <div className={`m-auto col-md-4 mb-3 ${styles.orderBox}`}>
                        <div className='d-flex justify-content-between'>
                            <div className='d-flex align-items-center gap-3'>
                                <div className={styles.imgContainer}>
                                    <img src="/images/adminImage.png" alt="user-order" />
                                </div>
                                <h5 className='fw-bold'>John Doe</h5>
                            </div>
                            <div className='d-flex align-items-center gap-3'>
                                <FaRocketchat className={styles.icon} />
                                <h5 className='fw-bold'>Chat</h5>
                            </div>
                        </div>
                        <div className='d-flex flex-column gap-3 mt-4'>
                            <h6>Telefone: 21 4002-8922</h6>
                            <h6>Endereço: Rua Lorem Porto</h6>
                            <h6>Cep: 400547-547</h6>
                            <h6>Informações adicionais: bastante molho por favor</h6>
                        </div>
                        <div className='mt-4'>
                            <h5 className='fw-bold'>Pedido</h5>
                            <div className='d-flex flex-column gap-3 mt-4'>
                                <h6>1 Porçao de Onigiri R$: 17,50</h6>
                                <h6>1 Salada Massao R$: 13,25</h6>
                                <h6>1 Porção de Hot Roll R$: 17,00</h6>
                                <h6>Total R$: 47,75</h6>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <h5 className='fw-bold'>Método de Pagamento</h5>
                            <div className='d-flex flex-column gap-3 mt-4'>
                                <h6>Pagamento Online</h6>
                                <h6>Cartão de credito | Pix</h6>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between mt-4'>
                            <button className={styles.acceptOrder}>Aceitar Pedido</button>
                            <button className={styles.refuseOrder}>Recusar Pedido</button>
                        </div>
                    </div>
                </div>
            </div>

            {chat && <OrderChat />}
        </>
    )
}