import { useEffect } from 'react';
import styles from './styles.module.scss';
import Glider from 'react-glider';
import 'glider-js/glider.min.css';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsData } from '../../store/products/product';
import { ProductBox } from '../ProductBox';

export function MostSaledDishes() {

    const dispatch = useDispatch();
    const products = useSelector((state:any) => state.productsData.products);

    const carouselDishes = products?.slice(0, 8);

    console.log(carouselDishes);

    useEffect(() => {
      dispatch(fetchProductsData());
    }, [])

    return (
        <div className={styles.mostSaledDishesContainer}>
            <h2 className='fw-bold text-center mb-5'>Pratos Mais Vendidos</h2>
                <div className={`row container justify-content-center align-items-center m-auto 
                    ${styles.flexDishes}`}>
                    <Glider 
                    draggable
                    hasDots
                    hasArrows
                    slidesToShow={1}
                    slidesToScroll={1}
                    arrows={{
                        prev: '#buttonPrev',
                        next: '#buttonNext',
                      }}
                    responsive={[
                        {
                          breakpoint: 1280,
                          settings: {
                            slidesToShow: 3,
                          },
                        },
                        {
                            breakpoint: 820,
                            settings: {
                              slidesToShow: 2,
                            },
                          },
                          {
                            breakpoint: 768,
                            settings: {
                              slidesToShow: 2,
                            },
                          },
                        {
                            breakpoint: 430,
                            settings: {
                              slidesToShow: 1,
                            },
                          },
                      ]}
                    >
                        {carouselDishes && carouselDishes.map((item:any) => {
                          return (
                              <ProductBox
                                key={item._id}
                                id={item._id}
                                image={item.image}
                                name={item.name}
                                details={item.details}
                                amount={item.amount}
                                price={item.price}
                              />
                            )
                        })}
                    </Glider>
            </div>
            <div className={`d-flex justify-content-center gap-3 mt-5 ${styles.pagination}`}>
                <button id='buttonPrev'><FaArrowLeft /></button>
                <button id='buttonNext'><FaArrowRight /></button>
            </div>
        </div>
    )
}