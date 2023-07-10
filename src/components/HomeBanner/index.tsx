import styles from './styles.module.scss';
import Glider from 'react-glider';
import 'glider-js/glider.min.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export function HomeBanner() {
    return (
        <div className={styles.bannerContainer}>
                    <Glider
                        hasDots
                        hasArrows
                        dots={'#dots'}
                        scrollToSlide={1}
                        slidesToShow={1}
                        slidesToScroll={1}
                        arrows={{
                            prev: '#Prev',
                            next: '#Next',
                        }}
                    >
                        <div className={`d-flex justify-content-start align-items-center ${styles.banner}`}>
                            <div className={`${styles.bannerSubtitles}`}>
                                <h1>Desfrute de uma <br /> Deliciosa Comida <br /> Japonesa</h1>
                                <p className="mt-2">
                                    lorem ipsum is simply dummy text of the decade <br /> 
                                    about 1589
                                </p>
                                <button>Peça Agora</button>
                            </div>
                        </div>
                        <div className={`d-flex justify-content-center align-items-center ${styles.bannerTwo}`}>
                            <div className={`${styles.bannerSubtitles}`}>
                                <div><img src="/images/Logo.png" alt="logo" /></div>
                                <h1>O Mais Vendido <br /> Da Região</h1>
                                <p className="mt-2">
                                    Produtos de Extrema Qualidade 
                                </p>
                                <button>Peça Agora</button>
                            </div>
                        </div>
                        <div className={`d-flex justify-content-center px-5 align-items-center ${styles.bannerThree}`}>
                            <div className={`d-flex wrap align-items-center gap-5 ${styles.bannerSubtitles}`}>
                                <div className={styles.imgContainer}>
                                    <img src="/images/homeBannerImg.png" alt="food" />
                                </div>
                                <div>
                                    <h1 className="mb-4">A Mais Autêntica <br /> Culinária Japonesa</h1>
                                    <button>Peça Agora</button>
                                </div>
                            </div>
                        </div>
                    </Glider>
                    <div className={styles.bannerArrows}>
                        <div id='Prev' className={`d-flex justify-content-center align-items-center ${styles.arrowLeftBox}`}>
                            <FaArrowLeft />
                        </div>
                        <div id='Next' className={`d-flex justify-content-center align-items-center ${styles.arrowRightBox}`}>
                            <FaArrowRight />
                        </div>
                    </div>
                    <div className={styles.dots} id="dots"></div>
                </div>
    )
}