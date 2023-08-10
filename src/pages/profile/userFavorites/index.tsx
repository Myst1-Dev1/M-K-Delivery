import { FavoritesContext } from '../../../services/hooks/useFavorites';
import { Search } from '../../../components/Search';
import styles from './styles.module.scss';
import { useState, useContext, useEffect } from 'react';
import { ProductBox } from '../../../components/ProductBox';
import { parseCookies } from 'nookies';
import { Favorites } from '@/types/Favorites';

export function UserFavorites() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<Favorites[]>([]);
    const { favorites, handleCleanFavorites, setFavorites } = useContext(FavoritesContext);

    useEffect(() => {
        const {'favorite-token': favoriteCookie} = parseCookies()
    
        if(favoriteCookie) {
            setFavorites(JSON.parse(favoriteCookie));
        }
        }, [])

    function searchProducts() {
        if(search !== '') {
            const filteredProducts = favorites.filter((e: Favorites) =>
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
        <div className={`col-md-8 ${styles.favoritesBox}`}>
            <div className='d-flex align-items-center gap-5 wrap'>
                <Search 
                    search={search} 
                    setSearch={setSearch} 
                />
                <h6 
                    onClick={handleCleanFavorites}
                    className={styles.cleanFavorites}
                >
                        Limpar Favoritos
                </h6>
            </div>
            <div className={`row ${styles.favoritesContainer}`}>
                {filter.map(favorite => {
                    return (
                        <ProductBox
                            key={favorite.favorites._id}
                            id={favorite.favorites._id}
                            name={favorite.favorites.name}
                            image={favorite.favorites.image}
                            details={favorite.favorites.details}
                            amount={favorite.favorites.amount}
                            price={favorite.favorites.price}
                        />
                    )
                })}
            </div>
        </div>
    )
}