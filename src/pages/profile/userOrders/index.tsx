import { FaRocketchat, FaStar } from 'react-icons/fa';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { parseCookies, setCookie } from 'nookies';

export function UserOrders() {
    const cookies = parseCookies();
    const initialRating = parseInt(cookies.rating) || 0;
    const [rating, setRating] = useState(initialRating);
    const [isRated, setIsRated] = useState(initialRating > 0);

    useEffect(() => {
        setCookie(undefined, 'rating', rating.toString(), {
            maxAge:365 * 24 * 60 * 60, // 1 ano em segundos,
            path:'/'
        })
    }, [rating])

    function handleStarClick(clickedIndex:any) {
        if (!isRated) {
            setRating(clickedIndex + 1);
            setIsRated(true);
          }
    }

    return (
        <div className={`col-md-8 ${styles.orderContainer}`}>
            <h3 className='fw-bold'>Histórico</h3>
            <div className='row'>
                <div className={`col-md-6 mt-5`}>
                    <h6>Seg, 02 Abril 2023</h6>
                    <div className={`mt-3 ${styles.orderBox}`}>
                        <div className={`d-flex align-items-center gap-2 ${styles.orderDetails}`}>
                            <div>
                                <img src="/images/successImage.png" alt="success-image" />
                            </div>
                            <h6 className='fw-bold'>Pedido concluido</h6>
                            <span className='h1'>.</span>
                            <h6>Nº 150</h6>
                        </div>
                        <div className={`d-flex flex-column gap-2 ${styles.orderList}`}>
                            <h6>1 Temaki Hot Salmão</h6>
                            <h6>1 porção de onigiri</h6>
                            <h6 className={`fw-bold ${styles.moreItems}`}>Mais 2 items</h6>
                        </div>
                        <div className={`mt-2 ${styles.avaliateOrder}`}>
                            <div className={`d-flex justify-content-between ${styles.avaliateOrderSubtitles}`}>
                                <h6 className='fw-bold'>Avalie seu pedido</h6>
                                <div className={`d-flex gap-2 ${styles.starContainer}`}>
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar
                                        key={index}
                                        className={`${styles.icon} ${index < rating ? styles.selected : ''}`}
                                        onClick={() => handleStarClick(index)}
                                        style={{ cursor: isRated ? 'default' : 'pointer' }}
                                        aria-disabled={isRated}
                                        role="button"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`col-md-6 mt-5`}>
                    <h6>Sab, 07 Maio 2023</h6>
                    <div className={`mt-3 ${styles.orderBox}`}>
                        <div className={`d-flex align-items-center gap-2 ${styles.orderDetails}`}>
                            <div>
                                <img src="/images/recusedImage.png" alt="success-image" />
                            </div>
                            <h6 className='fw-bold'>Pedido Recusado</h6>
                            <span className='h1'>.</span>
                            <h6>Nº 170</h6>
                        </div>
                        <div className={`d-flex flex-column gap-2 ${styles.orderList}`}>
                            <h6>1 Lámen</h6>
                            <h6>1 porção de Hot Roll</h6>
                            <h6 className={`fw-bold ${styles.moreItems}`}>Mais 3 items</h6>
                        </div>
                        <div className={`mt-2 ${styles.avaliateOrder}`}>
                            <div className={`d-flex justify-content-between ${styles.avaliateOrderSubtitles}`}>
                                <h6 className='fw-bold'>Fazer Reclamação</h6>
                                <FaRocketchat className={styles.icon} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}