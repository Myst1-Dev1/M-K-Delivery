import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
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
import { Search } from '../../components/Search';
import { UserContext } from '../../services/hooks/useUsers';

interface MenuProps {
    data:Products[];
}

export default function Menu({ data }:MenuProps) {
    const [itemOffset, setItemOffset] = useState(0);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<Products[]>([]);
    const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
    const [isNewUpdateModalOpen, setIsNewUpdateModalOpen] = useState(false);
    const [openResponsiveFilterBox, setOpenResponsiveFilteBox] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<'' | any>('');

    const { isAuthenticated } = useContext(AuthContext);
    const { user } = useContext(UserContext);

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

      function handleCloseUpdateModal() {
        setIsNewUpdateModalOpen(false);
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

    useEffect(() => {
      searchProducts()
      // eslint-disable-next-line
  }, [search])

    return (
        <>
            <div className={styles.menu}>
                <PageBanner>Menu</PageBanner>

                {isAuthenticated ? 
                <div className={`mt-5 mb-5 container d-flex justify-content-end ${styles.createNewProduct}`}>
                    {user.map(user => {
                      return (
                        <div key={user.data._id}>
                          {user.data.isAdmin === true ?
                          <button 
                          data-testid="create-new-product-button" 
                          onClick={handleOpenOrderModal}>Criar novo produto</button> : ''}
                        </div>
                      )
                    })}
                    
                </div> 
                : ''}

                <div className={`d-flex gap-5 m-auto container mb-5 ${styles.menuContainer}`}>
                        <FilterBox onSetFilter = {setFilter} />
                    <div className={` ${styles.dishesContainer}`}>
                        <BsFilter
                            data-testid="responseFilter-button"
                            onClick={handleOpenResponsiveFilterBox} 
                            className={styles.openResponsiveFilterBox} 
                        />
                        <Search
                            search={search}
                            setSearch={setSearch} 
                        />
                        <ResponsiveFilterBox
                            onOpenResponsiveFilterBox = {openResponsiveFilterBox}
                            onSetFilter = {setFilter} />
                        <Product
                          onSelectedProductId={selectedProductId}
                          onSetIsNewUpdateModalOpen = {setIsNewUpdateModalOpen}
                          onCurrentItems = {currentItems}
                          isNewUpdateModalOpen = {isNewUpdateModalOpen}
                          onRequestClose = {handleCloseUpdateModal}
                          onSetSelectedProductId = {setSelectedProductId}
                        />
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