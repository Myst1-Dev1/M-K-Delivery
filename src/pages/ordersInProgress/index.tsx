import { OrdersContext } from '../../services/hooks/useOrders';
import { PageBanner } from '../../components/pageBanner';
import styles from './styles.module.scss';
import { useContext } from 'react';
import { CartContext } from '../../services/hooks/useCart';

export default function OrdersInProgress() {
    const {orders , orderStatus } = useContext(OrdersContext);
    const { totalCart } = useContext(CartContext);

    console.log(orderStatus);

    return (
        <>
            <PageBanner>Pedidos em Progresso</PageBanner>

            <div className='table-responsive py-5'>
                <table className={`table table-bordered container ${styles.tableContainer}`}>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Telefone</th>
                            <th scope="col">Endereço</th>
                            <th scope="col">Cep</th>
                            <th scope="col">Valor do pedido</th>
                            <th scope="col">Método de pagamento</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order:any, index:number) => (
                            <tr key={order.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{order.name}</td>
                            <td>{order.tel}</td>
                            <td>{order.adress}</td>
                            <td>{order.zipCode}</td>
                            <td>
                                {Intl.NumberFormat('pt-br', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(order.cartPrice.reduce((total:any, price:any) => 
                                total + parseFloat(price), 0) + 5)}
                            </td>
                            <td>{order.paymentMethod !== 0 ? 'Pagamento na Entrega' 
                                : 'Pagamento Online'} <br />
                                {order.changeValue === '' ? 'Sem troco' : 
                                    <div>
                                        Valor do troco: 
                                        <span>
                                        {Intl.NumberFormat('pt-br', {
                                            style:'currency',
                                            currency:'BRL'
                                        }).format(order.changeValue - (totalCart + 5))}
                                        </span>
                                    </div>
                                }
                            </td>
                            <td className={styles.statusBox}>
                                {orderStatus === 'Em progresso' ?
                                    <div>
                                        {orderStatus}
                                        <div 
                                            className={`ms-3 spinner-grow text-warning 
                                            ${styles.status}`}>
                                        </div>
                                    </div>
                                 : ''}
                                 {orderStatus === 'Concluido' ?
                                    <div>
                                        {orderStatus}
                                        <div 
                                            className={`ms-3 spinner-grow text-success 
                                            ${styles.status}`}>
                                        </div>
                                    </div>
                                 : ''}
                                 {orderStatus === 'Recusado' ?
                                    <div>
                                        {orderStatus}
                                        <div 
                                            className={`ms-3 spinner-grow text-danger 
                                            ${styles.status}`}>
                                        </div>
                                    </div>
                                 : ''}
                                
                            </td>
                        </tr>
                        ))}
                        
                    </tbody>
                </table>
            </div>
        </>
    )
}