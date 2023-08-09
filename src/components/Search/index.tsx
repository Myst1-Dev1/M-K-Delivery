import { FaSearch } from 'react-icons/fa';
import styles from './styles.module.scss';
import { useContext, useEffect } from 'react';
import { ProductContext } from '../../services/hooks/useProducts';
import { Products } from '../../types/Product';

interface SearchProps {
    setFilter:any;
    search:string;
    setSearch:any;
}

export function Search({setFilter, search, setSearch}: SearchProps) {
    const { products } = useContext(ProductContext);

    function searchProducts() {
        if(search !== '') {
            const filteredProducts = products.filter((e: Products) =>
                e.name.toLowerCase().includes(search.toLowerCase())
            );
            setFilter(filteredProducts);

        } else {
            setFilter(products);
        }
    }

    useEffect(() => {
        searchProducts()
        // eslint-disable-next-line
    }, [search])


    return (
        <div className={styles.searchBox}>
            <input
                data-testid="searchInput"
                type="text" 
                placeholder='Pesquisar...'
                value={search}
                onChange={e => setSearch(e.target.value)} 
            />
            <FaSearch className={`ms-2 ${styles.icon}`} />
        </div>
    )
}