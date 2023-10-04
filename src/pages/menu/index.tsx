import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { BsFilter } from 'react-icons/bs';
import { useState, useEffect } from 'react';

import styles from './styles.module.scss';
import ReactPaginate from 'react-paginate';

import { Products } from '../../types/Product';
import { Product } from '../../components/Product';
import { PageBanner } from '../../components/pageBanner';
import { ProductModal } from '../../components/ProductModal';
import { GetStaticProps } from 'next';
import { ProductsApi } from '../../services/api';

import { Search } from '../../components/Search';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsData } from '../../store/products/product';
import { fetchUserData } from '@/store/user/user';
import { useRouter } from 'next/router';
import { FilterBox } from '../../components/FilterBox';
import { ResponsiveFilterBox } from '../../components/ResponsiveFilterBox';

interface MenuProps {
    data:Products[];
}

export default function Menu({ data }:MenuProps) {
    const dispatch = useDispatch();
    const products = useSelector((state:any) => state.productsData.products);
    const user = useSelector((state:any) => state.userData.user);

    const isAuthenticated = !!user

    const [itemOffset, setItemOffset] = useState(0);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<Products[]>([]);
    const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
    const [isNewUpdateModalOpen, setIsNewUpdateModalOpen] = useState(false);
    const [openResponsiveFilterBox, setOpenResponsiveFilteBox] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<'' | any>('');

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

    useEffect(() => {
      dispatch(fetchProductsData());
      dispatch(fetchUserData());
    }, [])

    return (
        <>
            <div className={styles.menu}>
                <PageBanner>Menu</PageBanner>

                {isAuthenticated ? 
                <div className={`mt-5 mb-5 container d-flex justify-content-end ${styles.createNewProduct}`}>
                    {user.map((user:any) => {
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