import { FaHeart, FaShoppingCart, FaTrashAlt } from 'react-icons/fa';
import styles from './styles.module.scss';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { ProductContext } from '../../services/hooks/useProducts';
import { CartContext } from '../../services/hooks/useCart';
import { FavoritesContext } from '../../services/hooks/useFavorites';
import { UserContext } from '@/services/hooks/useUsers';
import { useRouter } from 'next/router';

interface ProductBoxProps {
    id:string;
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
    const { isAuthenticated } = useContext(AuthContext);
    const { user } = useContext(UserContext);
    const { DeleteProduct } = useContext(ProductContext);
    const { handleAddToCart } = useContext(CartContext);
    const { handleAddToFavorites, favorites, handleRemoveToFavorites } = useContext(FavoritesContext);

    const isProductInFavorites = favorites.some(item => item.favorites._id === id);

    const router = useRouter();

    return (
        <div key={id} data-testid="name" className={`col-md-6 ${styles.disheBox}`}>
            {isAuthenticated ?
            <div>
               {user.map(user => {
                return (
                    <div>
                        {user.data.isAdmin === true || 
                        router.asPath === '/profile' ?
                        <div
                            data-testid="removeProduct"
                            onClick={router.asPath === '/profile' ? () => handleRemoveToFavorites(id) :
                            () => DeleteProduct(id)} 
                            className={styles.deleteProduct}>
                            <FaTrashAlt />
                        </div> : ''}
                    </div>
                )
               })}
            </div> 
            : ''}
            <img src={image} alt="item" />
            <div className={styles.dishSubtitles}>
                <div className='d-flex justify-content-between align-items-center'>
                    <h3 className='fw-bold'>{name}</h3>
                    <FaHeart
                        onClick={() => handleAddToFavorites(id)} 
                        className={isProductInFavorites ? styles.favoriteIconChecked : styles.favoriteIcon} 
                    />
                </div>
                <p className='mb-0'>{details}</p>
                <h6 className='mb-4 fw-bold'>
                    {amount !== 1 ? `Porção com ${amount} unidades`
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