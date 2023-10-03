import { Search } from '../../../components/Search';
import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import { ProductBox } from '../../../components/ProductBox';
import { useSelector, useDispatch } from 'react-redux';
import { cleanFavorites } from '../../../store/favorites/favorites';

export function UserFavorites() {
    const dispatch = useDispatch();
    const favorites = useSelector((state:any) => state.favoritesData.favorites);

    console.log(favorites);

    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<any>([]);

    function searchProducts() {
        if(search !== '') {
            const filteredProducts = favorites.filter((e: any) =>
                e.favorites.name.toLowerCase().includes(search.toLowerCase())
            );
            setFilter(filteredProducts);
  
        } else {
            setFilter(favorites);
        }
    }

    useEffect(() => {
        searchProducts()
        // eslint-disable-next-line
    }, [search])

    return (
        <div className={`${styles.favoritesBox}`}>
            <div className='d-flex align-items-center gap-5 wrap'>
                <Search 
                    search={search} 
                    setSearch={setSearch} 
                />
                <h6 
                    onClick={() => dispatch(cleanFavorites())}
                    className={styles.cleanFavorites}
                >
                        Limpar Favoritos
                </h6>
            </div>
            <div className={`row ${styles.favoritesContainer}`}>
                {filter?.map((favorite:any) => {
                    return (
                        <ProductBox
                            key={favorite._id}
                            id={favorite._id}
                            name={favorite.name}
                            image={favorite.image}
                            details={favorite.details}
                            amount={favorite.amount}
                            price={favorite.price}
                        />
                    )
                })}
            </div>
        </div>
    )
}