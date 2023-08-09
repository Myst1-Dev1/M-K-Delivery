import { FaArrowLeft, FaArrowRight, FaSearch } from 'react-icons/fa';
import { BsFilter } from 'react-icons/bs';
import { useState, useEffect, useContext } from 'react';

import styles from './styles.module.scss';
import ReactPaginate from 'react-paginate';

import { FilterBox } from './FilterBox/FilterBox';
import { Products } from '../../types/Product';
import { Product } from './Product';
import { PageBanner } from '../../components/pageBanner';
import { AuthContext } from '../../contexts/AuthContext';
import { ProductModal } from '../../components/ProductModal';
import { GetStaticProps } from 'next';
import { ProductsApi } from '../../services/api';
import { ResponsiveFilterBox } from './ResponsiveFilterBox';
import { Search } from '@/components/Search';

interface MenuProps {
    data:Products[];
}

export default function Menu({ data }:MenuProps) {
    const [itemOffset, setItemOffset] = useState(0);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<Products[]>([]);
    const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
    const [openResponsiveFilterBox, setOpenResponsiveFilteBox] = useState(false);

    const { user, isAuthenticated } = useContext(AuthContext);

    function handleOpenOrderModal() {
        setIsNewOrderModalOpen(true);
      }

    function handleCloseOrderModal() {
        setIsNewOrderModalOpen(false);
      }

    const itemsPerPage = 4;

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = filter.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filter.length / itemsPerPage);

    function handlePageClick (event:any) {
        const newOffset = (event.selected * itemsPerPage) % data.length;

        setItemOffset(newOffset);
      };

    function handleOpenResponsiveFilterBox() {
        setOpenResponsiveFilteBox(!openResponsiveFilterBox);
    }


    return (
        <>
            <div className={styles.menu}>
                <PageBanner>Menu</PageBanner>

                {isAuthenticated ? 
                <div className={`mt-5 container d-flex justify-content-end ${styles.createNewProduct}`}>
                    {user.isAdmin === true ? 
                    <button 
                    data-testid="create-new-product-button" 
                    onClick={handleOpenOrderModal}>Criar novo produto</button> : ''}
                </div> 
                : ''}

                <div className={`d-flex gap-5 container mb-5 ${styles.menuContainer}`}>
                        <FilterBox onSetFilter = {setFilter} />
                    <div className={`${styles.dishesContainer}`}>
                        <BsFilter
                            data-testid="responseFilter-button"
                            onClick={handleOpenResponsiveFilterBox} 
                            className={styles.openResponsiveFilterBox} 
                        />
                        {/* <div className={styles.searchBox}>
                            <input
                                data-testid="searchInput"
                                type="text" 
                                placeholder='Pesquisar...'
                                value={search}
                                onChange={e => setSearch(e.target.value)} 
                            />
                            <FaSearch className={`ms-2 ${styles.icon}`} />
                        </div> */}
                        <Search
                            search={search}
                            setSearch={setSearch} 
                            setFilter={setFilter} 
                        />
                        <ResponsiveFilterBox
                            onOpenResponsiveFilterBox = {openResponsiveFilterBox}
                            onSetFilter = {setFilter} />
                        <Product onCurrentItems = {currentItems} />
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

export const getStaticProps: GetStaticProps = async () => {
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