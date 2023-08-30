import { PageBanner } from '../../components/pageBanner';
import styles from './styles.module.scss';

export default function OrdersInProgress() {
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
                        <tr>
                        <th scope="row">1</th>
                        <td>John Doe</td>
                        <td>21 95784-4744</td>
                        <td>Rua Lorem Porto</td>
                        <td>41478-478</td>
                        <td>R$:47,75</td>
                        <td>Pagamento na entrega <br /> Valor do troco: R$:2,25</td>
                        <td className={styles.statusBox}>
                            Em progresso
                            <div className={`ms-3 spinner-grow text-warning ${styles.status}`}></div>
                        </td>
                        </tr>
                        <tr>
                        <th scope="row">1</th>
                        <td>John Doe</td>
                        <td>21 95784-4744</td>
                        <td>Rua Lorem Porto</td>
                        <td>41478-478</td>
                        <td>R$:47,75</td>
                        <td>Pagamento na entrega <br /> Valor do troco: R$:2,25</td>
                        <td className={styles.statusBox}>
                            Entregue
                            <div className={`ms-3 spinner-grow text-success ${styles.status}`}></div>
                        </td>
                        </tr>
                        <tr>
                        <th scope="row">1</th>
                        <td>John Doe</td>
                        <td>21 95784-4744</td>
                        <td>Rua Lorem Porto</td>
                        <td>41478-478</td>
                        <td>R$:47,75</td>
                        <td>Pagamento na entrega <br /> Valor do troco: R$:2,25</td>
                        <td className={styles.statusBox}>
                            Recusado
                            <div className={`ms-3 spinner-grow text-danger ${styles.status}`}></div>
                        </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}