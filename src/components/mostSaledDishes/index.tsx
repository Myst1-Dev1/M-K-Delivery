import { useContext } from 'react';
import styles from './styles.module.scss';
import Glider from 'react-glider';
import 'glider-js/glider.min.css';

import { FaShoppingCart, FaHeart, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { ProductContext } from '../../services/hooks/useProducts';
import { CartContext } from '../../services/hooks/useCart';

export function MostSaledDishes() {

    const { products } = useContext(ProductContext);
    const { handleAddToCart } = useContext(CartContext);

    const carouselDishes = products?.slice(0, 8);

    console.log(carouselDishes);

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
                        {carouselDishes && carouselDishes.map(item => {
                          return (
                                <div 
                                    key={item.name}
                                    className={`col-lg-4 mb-3 ${styles.disheBox}`}>
                                    <img src={item.image} alt="item" />
                                    <div className={styles.dishSubtitles}>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <h3 className='fw-bold'>{item.name}</h3>
                                            <FaHeart className={styles.favoriteIcon} />
                                        </div>
                                        <p className='mb-0 mt-2'>{item.details}</p>
                                        <h6 className='mb-4 fw-bold'>
                                                {item.amount !== 1 ? `Porção com ${item.amount} únidades`
                                                : `${item.amount} Porção`}
                                        </h6>
                                        <div className='d-flex gap-3 justify-content-between align-items-center'>
                                            <h3 className='fw-bold'>
                                                {Intl.NumberFormat('pt-BR', {
                                                    style:'currency',
                                                    currency:'BRL'
                                                }).format(item.price)}
                                            </h3>
                                            <button onClick={() => handleAddToCart(item._id)} 
                                                className='d-flex align-items-center'>
                                                <FaShoppingCart
                                                    className={styles.icon}
                                                />
                                                Adicionar ao carrinho
                                            </button>
                                        </div>
                                    </div>
                                </div>
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