import styles from './styles.module.scss';
import { useState, useEffect } from 'react';

export function LimitedTimeOffer() {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
    const target = new Date('07/07/27')

    const interval = setInterval(() => {
        const now = new Date();
        const difference = target.getTime() - now.getTime();

        const day = Math.floor(difference / (20000 * 60 * 60 * 24));
        setDays(day);

        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        setHours(hours);

        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        setMinutes(minutes);

        const seconds = Math.floor((difference % (1000 * 60 )) / 1000);
        setSeconds(seconds);
    }, 1000);

    return () => clearInterval(interval);
    }, [])

    return (
        <div className={`d-flex wrap px-5 justify-content-between align-items-center 
            ${styles.limitedTimeOffer}`}
        >
            <div className={styles.limitedTimeOfferSubtitles}>
                <h2 className='mb-2'>Oferta por Tempo limitado</h2>
                <h2>Rodizio de Japa <br /> com 35% de Desconto</h2>
                <div className={`d-flex gap-3 align-items-center mt-5 ${styles.limitedTimeOfferBoxContainer}`}>
                    <div className={`d-flex gap-3 flex-column justify-content-center align-items-center 
                        ${styles.limitedTimeOfferBox}`}
                    >
                        <h5 data-testid="days">{days}</h5>
                        <h5>Dias</h5>
                    </div>
                    <div className={`d-flex gap-3 flex-column justify-content-center align-items-center 
                        ${styles.limitedTimeOfferBox}`}
                    >
                        <h5 data-testid="hours">{hours}</h5>
                        <h5>Horas</h5>
                    </div>
                    <div className={`d-flex gap-3 flex-column justify-content-center align-items-center 
                        ${styles.limitedTimeOfferBox}`}
                    >
                        <h5 data-testid="minutes">{minutes}</h5>
                        <h5>Minutos</h5>
                    </div>
                    <div className={`d-flex gap-3 flex-column justify-content-center align-items-center 
                        ${styles.limitedTimeOfferBox}`}
                    >
                        <h5 data-testid="seconds">{seconds}</h5>
                        <h5>Segundos</h5>
                    </div>
                </div>
                <button className='mt-4'>Peça Agora</button>
            </div>
            {/* <img src="/images/limitedTimeOfferImage.png" alt="offerImage" /> */}
        </div>
    )
}