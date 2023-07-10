import styles from './styles.module.scss';

import { useContext, useEffect } from 'react';
import { PageBanner } from '@/components/pageBanner';
import { CartContext } from '@/services/hooks/useCart';
import { useRouter } from 'next/router';
import { AuthContext } from '@/contexts/AuthContext';


export default function paymentPage() {
    const { cart, totalCart } = useContext(CartContext);
    const { isAuthenticated } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if(isAuthenticated === false) {
            alert('Você precisa estar logado para fazer compras.')
            router.push('/');
        }
    }, []);

    return (
        <>
            <PageBanner>Pagamento</PageBanner>

            <div className={`mt-5 row justify-content-center align-items-center m-auto container 
                ${styles.paymentContainer}`}>
                <div className={`col-md-6 ${styles.deliveryBox}`}>
                    <h3>Informações de entrega</h3>
                    <div className={`mt-4 ${styles.formContainer}`}>
                        <div className='d-flex gap-5'>
                            <div className={`d-flex flex-column gap-2 ${styles.inputBox}`}>
                                <label className='fw-bold' htmlFor="name">Nome</label>
                                <input type="text" placeholder='John Doe' id='name' />
                            </div>
                            <div className={`d-flex flex-column gap-2 ${styles.inputBox}`}>
                                <label className='fw-bold' htmlFor="phone">Telefone</label>
                                <input type="tel" placeholder='55 (21) 4002 8922' id='phone' />
                            </div>
                        </div>
                        <div className='d-flex gap-5 mt-4'>
                            <div className={`d-flex flex-column gap-2 ${styles.inputBox}`}>
                                <label className='fw-bold' htmlFor="adress">Endereço</label>
                                <input type="text" placeholder='Rua Lorem Porto' id='adress' />
                            </div>
                            <div className={`d-flex flex-column gap-2 ${styles.inputBox}`}>
                                <label className='fw-bold' htmlFor="zipCode">Cep</label>
                                <input type="number" placeholder='45896-147' id='zipCode' />
                            </div>
                        </div>
                        <div className='d-flex flex-column gap-2 mt-4'>
                            <label className='fw-bold' htmlFor="info">Informações adicionais</label>
                            <textarea placeholder='Lorem ipsum is simply dummy' id='info'/>
                        </div>
                    </div>
                    <h3 className='mt-4'>Método de pagamento</h3>
                    <div className={`d-flex justify-content-between align-items-center mt-4 
                        ${styles.paymentMethodBox}`}>
                        <div className='d-flex gap-2'>
                            <input type="radio" id='onlinePayment' />
                            <label htmlFor="onlinePayment">Pagamento online</label>
                        </div>
                        <div className='d-flex gap-2'>
                            <input type="radio" id='cashOnDelivery' />
                            <label htmlFor="cashOnDelivery">Pagamento na entrega</label>
                        </div>
                    </div>
                </div>
                <div className={`col-md-6 ${styles.orderContainer}`}>
                    <h3>Resumo do pedido</h3>
                    <div className={`d-flex flex-column justify-content-between mt-4 ${styles.orderBox}`}>
                       <div className={styles.orderProducts}>
                            {cart.map(item => {
                                return (
                                    <div key={item.product._id} 
                                        className={`d-flex gap-3 mb-4 ${styles.orderProductBox}`}>
                                        <div className={styles.imgContainer}>
                                            <img src={item.product.image} alt="order" />
                                        </div>
                                        <div>
                                            <h5>{item.product.name} x {item.quantity}</h5>
                                            <p>{item.product.amount !== 1 ?
                                                 `Porção com ${item.product.amount} únidades`
                                                : `${item.product.amount} Porção`}
                                            </p>
                                            <h4>{Intl.NumberFormat('pt-br', {
                                                style:'currency',
                                                currency:'BRL'
                                            }).format(item.product.price * item.quantity)}</h4>
                                        </div>
                                    </div>
                                )
                            })}
                       </div>
                       <div>
                            <div className='d-flex justify-content-between align-items-center mt-4'>
                                <h5>Total</h5>
                                <h5>
                                    {Intl.NumberFormat('pt-br', {
                                    style:'currency',
                                    currency:'BRL'
                                    }).format(totalCart + 5)}
                                    <span> (+R$:5,00)</span> 
                                </h5>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <button className='mt-4'>Confirmar pedido</button>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        </>
    )
}