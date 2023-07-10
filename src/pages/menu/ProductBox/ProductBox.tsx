import { FaHeart, FaShoppingCart, FaTrashAlt } from 'react-icons/fa';
import styles from './styles.module.scss';
import { Products } from '@/types/Product';
import { useContext } from 'react';
import { CartContext } from '@/services/hooks/useCart';
import { AuthContext } from '@/contexts/AuthContext';
import { ProductContext } from '@/services/hooks/useProducts';

interface ProductBoxProps {
    onCurrentItems:Products[];
}

export function ProductBox({ onCurrentItems }:ProductBoxProps) {
    const { handleAddToCart } = useContext(CartContext);
    const { isAuthenticated, user } = useContext(AuthContext);
    const { DeleteProduct } = useContext(ProductContext);

    return (
        <div className='row mt-2'>
            {onCurrentItems.length === 0 ? <p>Sem resultados para sua pesquisa 😢</p> : ''}
            {onCurrentItems.map(item => {
                return (
                    <div key={item._id} className={`col-md-6 ${styles.disheBox}`}>
                        {isAuthenticated ? 
                        <div>
                            {user.isAdmin === true ? 
                            <div 
                                onClick={() => DeleteProduct(item._id)} 
                                className={styles.deleteProduct}>
                                <FaTrashAlt />
                            </div>  : ''}
                        </div> 
                        : ''}
                        <img src={item.image} alt="item" />
                        <div className={styles.dishSubtitles}>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h3 className='fw-bold'>{item.name}</h3>
                                <FaHeart className={styles.favoriteIcon} />
                            </div>
                            <p className='mb-0'>{item.details}</p>
                            <h6 className='mb-4 fw-bold'>
                                {item.amount !== 1 ? `Porção com ${item.amount} únidades`
                                : `${item.amount} Porção`}
                            </h6>
                            <div className='d-flex gap-3 justify-content-between align-items-center'>
                                <h3 className='fw-bold'>
                                    {Intl.NumberFormat('pt-BR', {
                                        style:'currency',
                                        currency:'BRL'
                                    }).format(item.price)}
                                </h3>
                                <button onClick={() => handleAddToCart(item._id)} 
                                    className='d-flex align-items-center'>
                                    <FaShoppingCart className={styles.icon} />
                                    Adicionar ao carrinho
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}