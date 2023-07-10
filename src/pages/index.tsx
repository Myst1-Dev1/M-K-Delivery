import Head from "next/head"
import styles from './styles.module.scss';

import { MostSaledDishes } from "../components/mostSaledDishes";
import { LimitedTimeOffer } from "@/components/limitedTimeOffer";
import { FaEnvelopeOpen, FaMap, FaPhoneAlt } from "react-icons/fa";
import { Footer } from "@/components/Footer";
import { HomeBanner } from "@/components/HomeBanner";

export default function Home() {

    return (
        <>
            <Head><title>M&K Delivery</title></Head>

            <div className={styles.homeContent}>
                <HomeBanner />

                <div className={styles.traditionalMenuContainer}>
                    <h2 className="text-center fw-bold">Explore Nosso Menu Tradicional</h2>

                    <div className="d-flex wrap align-items-center justify-content-evenly mt-5">
                        <div className={styles.sushiBox}>
                            <div className={`d-flex flex-column justify-content-between ${styles.foodBoxSubtitles}`}>
                                <h3 className="fw-bold">Sushi</h3>
                                <p className="fw-bold">
                                    Originário do Japão, composto por arroz cozido
                                    com vinagre combinado com outros ingredientes, como frutos do mar 
                                    crus e vegetais.
                                </p>
                                <button>Ver Menu</button>
                            </div>
                        </div>
                        <div className={styles.saladBox}>
                            <div className={`d-flex flex-column justify-content-between ${styles.foodBoxSubtitles}`}>
                                <h3 className="fw-bold">Aperitivos e Saladas</h3>
                                <p className="fw-bold">
                                    Temos uma vasta gama de aperitivos e saladas tradicionais japonesas,
                                    que inclui toda a comida tradicional do japão,
                                    desde os mais variádos tipos de vegetais.
                                </p>
                                <button>Ver Menu</button>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex wrap align-items-center justify-content-evenly mt-5">
                        <div className={styles.noodleBox}>
                            <div className={`d-flex flex-column justify-content-between ${styles.foodBoxSubtitles}`}>
                                <h3 className="fw-bold">Pratos com macarrão</h3>
                                <p className="fw-bold">
                                    O macarrão japonês é apreciado em todo o país, com variedade
                                    regional e uma experiência culinária única.Os pratos
                                    mais comúns são: soba, udon e ramen.
                                </p>
                                <button>Ver Menu</button>
                            </div>
                        </div>
                        <div className={styles.drinkBox}>
                            <div className={`d-flex flex-column justify-content-between ${styles.foodBoxSubtitles}`}>
                                <h3 className="fw-bold">Sobremesas e Bebidas</h3>
                                <p className="fw-bold">
                                    Temos uma extensa variedade de sobremesas e bebidas tradicionais
                                    japonesas, que inclui todos os alimentos tradicionais deste país.
                                </p>
                                <button>Ver Menu</button>
                            </div>
                        </div>
                    </div>
                </div>
                <MostSaledDishes />
                <LimitedTimeOffer />
                <div className={`d-flex wrap justify-content-between align-items-center ${styles.contactRestaurant}`}>
                    <div className="m-auto">
                        <h2 className="fw-bold">Visite Nosso <br /> Restaurante Hoje</h2>
                        <h4 className="fw-bold mt-3">Aberto 7 Dias <br /> por Semana</h4>
                        <div className={`d-flex m-auto gap-3 mt-5 ${styles.contactRestaurantBox}`}>
                            <FaMap className={styles.icon} />
                            <div className="d-flex flex-column gap-2">
                                <h5 className="fw-bold">Endereço</h5>
                                <h6>Rua Lorem Ipsum <br /> Porto 505</h6>
                            </div>
                        </div>
                        <div className={`d-flex m-auto gap-3 mt-4 ${styles.contactRestaurantBox}`}>
                            <FaPhoneAlt className={styles.icon} />
                            <div className="d-flex flex-column gap-2">
                                <h5 className="fw-bold">Telefones</h5>
                                <h6>Telefone: +55 (21) 4002 8922 <br /> Celular: +55 (21) 4589 1458</h6>
                            </div>
                        </div>
                        <div className={`d-flex m-auto gap-3 mt-4 ${styles.contactRestaurantBox}`}>
                            <FaEnvelopeOpen className={styles.icon} />
                            <div className="d-flex flex-column gap-2">
                                <h5 className="fw-bold">Emails</h5>
                                <h6>m&kdelivery@business.com <br /> mystodev@gmail.com</h6>
                            </div>
                        </div>
                        <button className="mt-5 mb-5">Faça sua Reserva</button>
                    </div>
                    <img src="/images/restaurant.jpg" alt="place" />
                </div>
            </div>
            <Footer />
        </>
    )
}