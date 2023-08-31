import styles from './styles.module.scss';

import { useContext, useEffect, useState } from 'react';
import { PageBanner } from '../../components/pageBanner';
import { CartContext } from '../../services/hooks/useCart';
import { useRouter } from 'next/router';
import { AuthContext } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { OrdersContext } from '../../services/hooks/useOrders';

export default function paymentPage() {
    const [cashOnDelivery, setCashOnDelivery] = useState(false);
    const [onlinePayment, setOnlinePayment] = useState(false);

    const { cart, totalCart } = useContext(CartContext);
    const { handleCreateOrder } = useContext(OrdersContext);
    const { isAuthenticated } = useContext(AuthContext);

    const { register, handleSubmit } = useForm();

    const router = useRouter();

    // useEffect(() => {
    //     if(isAuthenticated === false) {
    //         alert('Você precisa estar logado para fazer compras.');
    //         router.push('/');
    //     }
    // }, []);

    async function createOrder(data:any) {
        await handleCreateOrder(data);
    }

    function handleOpenCashOnDeliveryPaymentOption() {
        setCashOnDelivery(!cashOnDelivery);
    }

    function handleOpenOpenOnlinePayment() {
        setOnlinePayment(!onlinePayment);
    }

    return (
        <>
            <PageBanner>Pagamento</PageBanner>

            <form
                onSubmit={handleSubmit(createOrder)}
                className={`mt-5 row justify-content-center m-auto container 
                ${styles.paymentContainer}`}>
                <div className={`col-md-6 ${styles.deliveryBox}`}>
                    <h3>Informações de entrega</h3>
                    <div className={`mt-4 ${styles.formContainer}`}>
                        <div className='row'>
                            <div className={`col-md-6 d-flex flex-column gap-2 ${styles.inputBox}`}>
                                <label className='fw-bold' htmlFor="name">Nome</label>
                                <input 
                                    type="text" 
                                    placeholder='John Doe' 
                                    id='name'
                                    {...register('name', {required:true})} 
                                />
                            </div>
                            <div className={`col-md-6 d-flex flex-column gap-2 ${styles.inputBox}`}>
                                <label className='fw-bold' htmlFor="phone">Telefone</label>
                                <input 
                                    type="tel" 
                                    placeholder='55 (21) 4002 8922' 
                                    id='phone'
                                    {...register('tel', {required:true})}  
                                />
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className={`col-md-6 d-flex flex-column gap-2 ${styles.inputBox}`}>
                                <label className='fw-bold' htmlFor="adress">Endereço</label>
                                <input 
                                    type="text" 
                                    placeholder='Rua Lorem Porto' 
                                    id='adress'
                                    {...register('adress', {required:true})}  
                                />
                            </div>
                            <div className={`col-md-6 d-flex flex-column gap-2 ${styles.inputBox}`}>
                                <label className='fw-bold' htmlFor="zipCode">Cep</label>
                                <input 
                                    type="number" 
                                    placeholder='45896-147' 
                                    id='zipCode'
                                    {...register('zipCode', {required:true})}  
                                />
                            </div>
                        </div>
                        <div className='d-flex flex-column gap-2 mt-4'>
                            <label className='fw-bold' htmlFor="info">Informações adicionais</label>
                            <textarea 
                                placeholder='Lorem ipsum is simply dummy' 
                                id='info'
                                {...register('additionalInformation', {required:true})} 
                            />
                        </div>
                    </div>
                    <h3 className='mt-4'>Método de pagamento</h3>
                    <div className={`mt-3 ${styles.paymentMethodBox}`}>
                        <div className='d-flex justify-content-between m-auto gap-5 align-items-center'>
                            <h6 onClick={handleOpenOpenOnlinePayment}>
                                Pagamento online
                            </h6>
                            <h6 onClick={handleOpenCashOnDeliveryPaymentOption}>
                                Pagamento na entrega
                            </h6>
                        </div>
                        {cashOnDelivery && (
                            <div className={`mt-5 ${styles.cashOnDelivery}`}>
                                <div className='mb-3'>
                                    <div className={`d-flex flex-column gap-2 ${styles.inputBox}`}>
                                        <label className='fw-bold' htmlFor="paymentMethod">
                                            Dinheiro ou cartão?
                                        </label>
                                        <select 
                                            id="paymentMethod"
                                            {...register('paymentMethod', {required:false})}
                                        >
                                            <option value="Dinheiro">Dinheiro</option>
                                            <option value="cartão">Cartão</option>
                                        </select>
                                    </div>
                                    <div className={`d-flex flex-column gap-2 mt-3 ${styles.inputBox}`}>
                                        <label className='fw-bold' htmlFor="changeValue">
                                            Informe um valor caso o pagamento seja em dinheiro(Opcional)
                                        </label>
                                        <input 
                                            type="number" 
                                            placeholder='R$:XXX' 
                                            id='changeValue'
                                            {...register('changeValue', {required:false})} 
                                        />
                                    </div> 
                                </div>
                            </div>
                        )}
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
            </form>
        </>
    )
}