import { FaHeart, FaShoppingCart, FaTrashAlt } from 'react-icons/fa';
import styles from './styles.module.scss';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { ProductContext } from '@/services/hooks/useProducts';
import { CartContext } from '@/services/hooks/useCart';

interface ProductBoxProps {
    id:string | any;
    image:string;
    name:string;
    details:string;
    amount:number;
    price:number;
}

export function ProductBox({
    id,
    image,
    name,
    details,
    amount,
    price
}:ProductBoxProps) {
    const { isAuthenticated, user } = useContext(AuthContext);
    const { DeleteProduct } = useContext(ProductContext);
    const { handleAddToCart } = useContext(CartContext);

    return (
        <div data-testid="name" className={`col-md-6 ${styles.disheBox}`}>
            {isAuthenticated ?
            <div>
                {user.isAdmin === true ? 
                <div
                    data-testid="removeProduct"
                    onClick={() => DeleteProduct(id)} 
                    className={styles.deleteProduct}>
                    <FaTrashAlt />
                </div>  : ''}
            </div> 
            : ''}
            <img src={image} alt="item" />
            <div className={styles.dishSubtitles}>
                <div className='d-flex justify-content-between align-items-center'>
                    <h3 className='fw-bold'>{name}</h3>
                    <FaHeart className={styles.favoriteIcon} />
                </div>
                <p className='mb-0'>{details}</p>
                <h6 className='mb-4 fw-bold'>
                    {amount !== 1 ? `Porção com ${amount} únidades`
                    : `${amount} Porção`}
                </h6>
                <div className='d-flex gap-3 justify-content-between align-items-center'>
                    <h3 className='fw-bold'>
                        {Intl.NumberFormat('pt-BR', {
                            style:'currency',
                            currency:'BRL'
                        }).format(price)}
                    </h3>
                    <button
                        data-testid="addCartButton" 
                        onClick={() => handleAddToCart(id)} 
                        className='d-flex align-items-center'>
                        <FaShoppingCart className={styles.icon} />
                        Adicionar ao carrinho
                    </button>
                </div>
            </div>
        </div>
    )
}