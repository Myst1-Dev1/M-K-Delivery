import { FaRocketchat } from 'react-icons/fa';
import { PageBanner } from '../../components/pageBanner';
import styles from './styles.module.scss';

export default function OrderStatus() {
    return (
        <>
            <PageBanner>Status do Pedido</PageBanner>

            <div className={`row container m-auto py-5 ${styles.statusContainer}`}>
                <div className={`col-md-6 mb-3 ${styles.imgContainer}`}>
                    <img className='img-fluid' src="/images/statusImage.png" alt="status-image" />
                </div>
                <div className={`col-md-6 ${styles.statusInfo}`}>
                    <h5 className='fw-bold'>
                        Tempo de Entrega: 18:00 - 18:45
                    </h5>
                    <div className='d-flex gap-3 mt-4'>
                        <h6>
                            O seu pedido está sendo preparado
                            para ser entregue
                        </h6>
                        <div className={`spinner-grow text-warning ${styles.status}`}></div>
                    </div>
                    <h5 className='fw-bold mt-3'>Pedido</h5>
                    <div className='d-flex flex-column gap-3 mt-4'>
                        <h6>1 Temaki Hot Salmão R$:18,40</h6>
                        <h6>1 Porção de Onigiri R$:17,50</h6>
                        <h6>1 Porção de Pão de Queijo R$:12,90</h6>
                    </div>
                    <div className='d-flex flex-column gap-3 mt-4'>
                        <h6 className='fw-bold'>Valor do Pedido: R$:48,80</h6>
                        <h6 className='fw-bold'>Pagamento: Dinheiro na entrega</h6>
                    </div>
                    <div className='d-flex justify-content-between align-items-center mt-4'>
                        <div className='d-flex gap-3'>
                            <FaRocketchat className={styles.icon} />
                            <h6 className='fw-bold'>Chat</h6>
                        </div>
                        <button>Recebi meu pedido</button>
                    </div>
                </div>
            </div>
        </>
    )
}