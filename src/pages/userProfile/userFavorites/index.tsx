import { FavoritesContext } from '../../../services/hooks/useFavorites';
import { Search } from '../../../components/Search';
import styles from './styles.module.scss';
import { useState, useContext, useEffect } from 'react';
import { ProductBox } from '../../../components/ProductBox';
import { parseCookies } from 'nookies';
import { useSelector } from 'react-redux';

export function UserFavorites() {
    const favorites = useSelector((state:any) => state.favoritesData.favorites);

    console.log(favorites);

    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<any>([]);
    const { handleCleanFavorites, setFavorites } = useContext(FavoritesContext);

    // useEffect(() => {
    //     const {'favorite-token': favoriteCookie} = parseCookies()
    
    //     if(favoriteCookie) {
    //         setFavorites(JSON.parse(favoriteCookie));
    //     }
    //     }, [])

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
                {filter.map((favorite:any) => {
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