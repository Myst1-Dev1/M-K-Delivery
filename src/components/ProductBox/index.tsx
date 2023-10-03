import { FaHeart, FaPencilAlt, FaShoppingCart, FaTrashAlt } from 'react-icons/fa';
import styles from './styles.module.scss';
import { useContext, useEffect, useState } from 'react';
import { FavoritesContext } from '../../services/hooks/useFavorites';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../../store/user/user';
import { deleteProducts } from '../../store/products/product';
import { ConfirmationBox } from '../confirmationBox';
import { addToCart } from '../../store/cart/cart';

interface ProductBoxProps {
    id:string;
    image:string;
    name:string;
    details:string;
    amount:number;
    price:number;
    onSetIsNewUpdateModalOpen?:any;
    onSetSelectedProductId?:any;
}

export function ProductBox({
    id,
    image,
    name,
    details,
    amount,
    price,
    onSetIsNewUpdateModalOpen,
    onSetSelectedProductId
}:ProductBoxProps) {
    const user = useSelector((state:any) => state.userData.user);
    const dispatch = useDispatch();

    const isAuthenticated = !!user;
    const { handleAddToFavorites, favorites, handleRemoveToFavorites } = useContext(FavoritesContext);

    const [confirmationBox, setConfirmationBox] = useState(false);

    //const isProductInFavorites = favorites.some(item => item.favorites._id === id);

    function handleAddToCart() {
        dispatch(addToCart({
            id,
            name,
            image,
            price,
            amount
        }));
    }

    const router = useRouter();

    function handleOpenUpdateModal(id:string) {
        onSetIsNewUpdateModalOpen(true);

        onSetSelectedProductId(id);
    }

    function handleConfirmDeleteUser() {
        setConfirmationBox(true);
       }

    function handleDeleteProduct(id:string) {
        dispatch(deleteProducts(id));
        setConfirmationBox(false);
    }

    useEffect(() => {
        dispatch(fetchUserData());
      }, [])

    return (
        <>
            <div key={id} data-testid="name" className={`col-md-4 ${styles.disheBox}`}>
                {isAuthenticated ?
                <div>
                {user.map((user:any) => {
                    return (
                        <div key={user.data._id} className='d-flex align-items-center gap-3'>
                            {user.data.isAdmin === true || 
                            router.asPath === '/profile' ?
                            <div
                                data-testid="removeProduct"
                                onClick={router.asPath === '/profile' ? () => handleRemoveToFavorites(id) :
                                 handleConfirmDeleteUser} 
                                className={styles.deleteProduct}>
                                <FaTrashAlt />
                            </div> : ''}
                            {user.data.isAdmin === true  ?
                                <div onClick={() => handleOpenUpdateModal(id)} 
                                    className={styles.updateProduct}
                                    >
                                    <FaPencilAlt />
                                </div>
                            :''}
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
                            // className={isProductInFavorites ? styles.favoriteIconChecked : styles.favoriteIcon} 
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
                            onClick={handleAddToCart} 
                            className='d-flex align-items-center'>
                            <FaShoppingCart className={styles.icon} />
                            Adicionar ao carrinho
                        </button>
                    </div>
                </div>
            </div>
            {confirmationBox && (
                <ConfirmationBox
                    children="Você tem certeza que deseja deletar o produto?"
                    handleConfirm={() => {
                        handleDeleteProduct(id)
                    }}
                    handleCancel={() => {
                        // Lógica para cancelar a exclusão
                        setConfirmationBox(false);
                    }}
                />
            )}
        </>
    )
}