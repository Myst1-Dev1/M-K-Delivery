import { FaSearch } from 'react-icons/fa';
import styles from './styles.module.scss';

interface SearchProps {
    search:string;
    setSearch:any;
}

export function Search({search, setSearch}: SearchProps) {

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