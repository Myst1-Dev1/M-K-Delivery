import { FaArrowLeft, FaArrowRight, FaSearch } from 'react-icons/fa';
import { useState, useEffect, useContext } from 'react';

import styles from './styles.module.scss';
import ReactPaginate from 'react-paginate';

import { FilterBox } from './FilterBox/FilterBox';
import { Products } from '@/types/Product';
import { ProductBox } from './ProductBox/ProductBox';
import { PageBanner } from '@/components/pageBanner';
import { AuthContext } from '@/contexts/AuthContext';
import { ProductModal } from '@/components/ProductModal';
import { GetServerSideProps } from 'next';
import { ProductsApi } from '@/services/api';

interface MenuProps {
    data:Products[];
}

export default function Menu({ data }:MenuProps) {
    const [itemOffset, setItemOffset] = useState(0);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<Products[]>([]);
    const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);

    const { user, isAuthenticated } = useContext(AuthContext);

    console.log(data);

    function searchProducts() {
        if(search !== '') {
            const filteredProducts = data.filter((e: Products) =>
                e.name.toLowerCase().includes(search.toLowerCase())
            );
            setFilter(filteredProducts);

        } else {
            setFilter(data);
        }
    }

    function handleOpenOrderModal() {
        setIsNewOrderModalOpen(true);
      }

    function handleCloseOrderModal() {
        setIsNewOrderModalOpen(false);
      }

    useEffect(() => {
        searchProducts()
        // eslint-disable-next-line
    }, [search, data])


    const itemsPerPage = 4;

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = filter.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filter.length / itemsPerPage);

    function handlePageClick (event:any) {
        const newOffset = (event.selected * itemsPerPage) % data.length;

        setItemOffset(newOffset);
      };


    return (
        <>
            <div className={styles.menu}>
                <PageBanner>Menu</PageBanner>

                {isAuthenticated ? 
                <div className={`mt-5 container d-flex justify-content-end ${styles.createNewProduct}`}>
                    {user.isAdmin === true ? 
                    <button onClick={handleOpenOrderModal}>Criar novo produto</button> : ''}
                </div> 
                : ''}

                <div className={`d-flex gap-5 container mb-5 ${styles.menuContainer}`}>
                        <FilterBox onSetFilter = {setFilter} />
                    <div className={`${styles.dishesContainer}`}>
                        <div className={styles.searchBox}>
                            <input 
                                type="text" 
                                placeholder='Pesquisar...'
                                value={search}
                                onChange={e => setSearch(e.target.value)} 
                            />
                            <FaSearch className={`ms-2 ${styles.icon}`} />
                        </div>
                        <ProductBox onCurrentItems = {currentItems} />
                    </div>
                </div>
                <div className={styles.pagination}>
                    <ReactPaginate
                        className={styles.pagination}
                        breakLabel="..."
                        nextLabel={<FaArrowRight />}
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel={<FaArrowLeft />}
                        renderOnZeroPageCount={null}
                    />
                </div>
            </div>

            <ProductModal
                isOpen = {isNewOrderModalOpen}
                onRequestClose = {handleCloseOrderModal}
            />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    try {
      const response = await ProductsApi.get();
      const data = response.data;
      return {
        props: {
          data
        }
      };
    } catch (error) {
      console.log(error);
      return {
        props: {
          data: []
        }
      };
    }
  };