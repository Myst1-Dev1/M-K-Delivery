import { FaHeart, FaPencilAlt, FaShoppingCart, FaTrashAlt } from 'react-icons/fa';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../../store/user/user';
import { deleteProducts } from '../../store/products/product';
import { ConfirmationBox } from '../confirmationBox';
import { addToCart } from '../../store/cart/cart';
import { addToFavorites, removeToFavorites } from '@/store/favorites/favorites';

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
    const favorites = useSelector((state:any) => state.favoritesData.favorites);
    const dispatch = useDispatch();

   const isProductInFavorites = favorites.find((item:any) => item._id === id);

    const isAuthenticated = !!user;

    const [confirmationBox, setConfirmationBox] = useState(false);

    function handleAddToCart() {
        dispatch(addToCart({
            id,
            name,
            image,
            price,
            amount
        }));
    }

    function handleAddToFavorites() {
        dispatch(addToFavorites({
            id,
            name,
            details,
            image,
            price,
            amount
        }))
    }

    function handleRemoveToFavorites(id:string) {
        dispatch(removeToFavorites(id));
        setConfirmationBox(false);
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
            <div key={id} data-testid="name" className={`col-md-6 ${styles.disheBox}`}>
                {isAuthenticated ?
                <div>
                {user.map((user:any) => {
                    return (
                        <div key={user.data._id} 
                            className={`d-flex align-items-center gap-3`}>
                            {user.data.isAdmin === true || 
                            router.asPath === '/profile' ?
                            <div
                                data-testid="removeProduct"
                                onClick={handleConfirmDeleteUser} 
                                className={styles.deleteProduct}>
                                <FaTrashAlt />
                            </div> : ''}
                            {router.asPath === '/profile' ? '' : user.data.isAdmin === true ?
                                <div onClick={() => handleOpenUpdateModal(id)} 
                                    className={styles.updateProduct}
                                    >
                                    <FaPencilAlt />
                                </div>
                            : ''}
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
                            onClick={handleAddToFavorites} 
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
                    children={router.asPath === '/profile' ? 
                     "Você tem certeza que deseja deletar o favorito?"
                    :"Você tem certeza que deseja deletar o produto?"}
                    handleConfirm={() => {
                        router.asPath === '/profile' ? handleRemoveToFavorites(id) :
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